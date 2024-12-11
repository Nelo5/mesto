const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);
    if (errorMessage === "Заполните это поле."){
        errorMessage = "Вы пропустили это поле."
    }
    if (errorMessage === "Введите URL."){
        errorMessage = "Введите адрес сайта."
    }
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
  };
  
const hideInputError = (formElement, inputElement, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = '';
  };
  
const checkInputValidity = (formElement, inputElement, validationSettings) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
    } else {
      hideInputError(formElement, inputElement, validationSettings);
    }
  };
  
const setEventListeners = (formElement, validationSettings) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
    toggleButtonState(inputList,buttonElement, validationSettings);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, validationSettings);
        toggleButtonState(inputList,buttonElement, validationSettings);
      });
    });
  };
  


export const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement, validationSettings);
    });
  };
  
function hasInvalidInput(inputList){
    return inputList.some((inputElement)=>{
      return !inputElement.validity.valid});
}
  
function toggleButtonState(inputList,buttonElement, validationSettings){
    if (hasInvalidInput(inputList)){
      buttonElement.classList.add(validationSettings.inactiveButtonClass);
    }
    else{
      buttonElement.classList.remove(validationSettings.inactiveButtonClass);
    }
}
  
export function clearValidation(form, validationConfig) {
    const formInputs = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    const formBtn = form.querySelector(validationConfig.submitButtonSelector);
    formInputs.forEach((input) => hideInputError(form, input, validationConfig));
    toggleButtonState(formInputs, formBtn, validationConfig)
  }