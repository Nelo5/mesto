import './pages/index.css';
import { enableValidation, clearValidation } from './scripts/validate.js';
import { createCard } from './scripts/card.js';
import { initialCards } from './scripts/cards.js';
import { openModal, closeModal, closeByOverlayClick } from './scripts/modal.js';
import { getUserInfo, getInitialCards, changeUserInfo, changeAvatar, addNewCard } from './scripts/api.js';

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const avatarPopup = document.querySelector('.popup_type_avatar')

profilePopup.classList.add("popup_is-animated")
cardPopup.classList.add("popup_is-animated")
imagePopup.classList.add("popup_is-animated")
avatarPopup.classList.add("popup_is-animated")

const profileOpenButton = document.querySelector('.profile__edit-button')
const cardOpenButton = document.querySelector('.profile__add-button')                                                  
const avatarOpenButton = document.querySelector('.profile__avatar-button')

const profileCloseButton = profilePopup.querySelector('.popup__close');
const cardCloseButton = cardPopup.querySelector('.popup__close');
const imageCloseButton = imagePopup.querySelector('.popup__close');
const avatarCloseButton = avatarPopup.querySelector('.popup__close');

const profileSubmitButton = profilePopup.querySelector('.popup__button');
const cardSubmitButton = cardPopup.querySelector('.popup__button');
const avatarSubmitButton = avatarPopup.querySelector('.popup__button')

const places__list = document.querySelector('.places__list');

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const profileFormElement = profilePopup.querySelector(".popup__form");
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');

const cardFormElement = cardPopup.querySelector(".popup__form");
const cardName = cardPopup.querySelector('.popup__input_type_card-name');
const cardUrl = cardPopup.querySelector('.popup__input_type_url');

const avatarFormElement = avatarPopup.querySelector(".popup__form");
const avatarUrl = avatarPopup.querySelector('.popup__input_type_url');

function editProfile(){
    openModal(profilePopup)
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    profileFormElement.addEventListener('submit', handleProfileFormSubmit);
    clearValidation(profileFormElement, validationSettings);
}

function addCard(){
    openModal(cardPopup)
    cardUrl.value = "";
    cardName.value = "";
    cardFormElement.addEventListener('submit', handleCardFormSubmit);
    clearValidation(cardFormElement, validationSettings);
}

function editAvatar(){
    openModal(avatarPopup)
    avatarUrl.value = "";
    avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);
    clearValidation(avatarFormElement, validationSettings);
}

function handleProfileFormSubmit(evt) {
    profileSubmitButton.textContent = "Сохранение..."
    evt.preventDefault();
    changeUserInfo(nameInput.value,jobInput.value)
    .then((res) => {
        profileTitle.textContent = nameInput.value;
        profileDescription.textContent = jobInput.value;
        closeModal(profilePopup);
    })
    .catch((err) => {console.log(err)})
    .finally((res) => {
        profileSubmitButton.textContent = "Сохранить"
    })
}

function handleCardFormSubmit(evt) {
    cardSubmitButton.textContent = "Сохранение..."
    evt.preventDefault();
    addNewCard(cardName.value,cardUrl.value)
    .then((res) => {
        const newCard = createCard(res, res.owner);
        places__list.prepend(newCard);
        closeModal(cardPopup);
    })
    .catch((err) => {console.log(err)})
    .finally((res) => {
        cardSubmitButton.textContent = "Сохранить"
    })
}

function handleAvatarFormSubmit(evt){
    avatarSubmitButton.textContent = "Сохранение..."
    evt.preventDefault();
    changeAvatar(avatarUrl.value)
    .then((res) => {
        profileImage.style.backgroundImage = `url("${res.avatar}")`;
        closeModal(avatarPopup);
    })
    .catch((err) => {console.log(err)})
    .finally((res) => {
        avatarSubmitButton.textContent = "Сохранить"
    })
}

profileOpenButton.addEventListener('click', editProfile);
cardOpenButton.addEventListener('click', addCard);
avatarOpenButton.addEventListener('click', editAvatar);

profileCloseButton.addEventListener('click', () => closeModal(profilePopup));
cardCloseButton.addEventListener('click', () => closeModal(cardPopup));
imageCloseButton.addEventListener('click', () => closeModal(imagePopup));
avatarCloseButton.addEventListener('click', () => closeModal(avatarPopup));

profilePopup.addEventListener('click', (evt) => closeByOverlayClick(evt,profilePopup));
imagePopup.addEventListener('click', (evt) => closeByOverlayClick(evt,imagePopup));
cardPopup.addEventListener('click', (evt) => closeByOverlayClick(evt,cardPopup));
avatarPopup.addEventListener('click', (evt) => closeByOverlayClick(evt,avatarPopup));

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(validationSettings);
Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url("${user.avatar}")`;

    cards.forEach((card) => {
        places__list.append(
        createCard(card, user)
      );
    });
  })
  .catch((err) => {
    console.error("Ошибка получения данных пользователя и карточек:", err);
  });