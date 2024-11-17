const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
profilePopup.classList.add("popup_is-animated")
cardPopup.classList.add("popup_is-animated")
imagePopup.classList.add("popup_is-animated")
const places__list = document.querySelector('.places__list');
const profileOpenButton = document.querySelector('.profile__edit-button')
const cardOpenButton = document.querySelector('.profile__add-button')
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileCloseButton = profilePopup.querySelector('.popup__close');
const cardCloseButton = cardPopup.querySelector('.popup__close');
const imageCloseButton = imagePopup.querySelector('.popup__close');
const cardTemplate = document.querySelector('#card-template').content;
const cardName = cardPopup.querySelector('.popup__input_type_card-name');// Воспользуйтесь инструментом .querySelector()
const cardUrl = cardPopup.querySelector('.popup__input_type_url');
const profileFormElement = profilePopup.querySelector(".popup__form");// Воспользуйтесь методом querySelector()
const nameInput = profilePopup.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const image = imagePopup.querySelector(".popup__image");
const caption = imagePopup.querySelector(".popup__caption");
// @todo: Темплейт карточки

function createCard(name, imagelink, imagealt){
    const card = cardTemplate.cloneNode(true);
    const cardImage = card.querySelector(".card__image");
    const cardTitle = card.querySelector(".card__title");
    const likeButton = card.querySelector(".card__like-button");
    const deleteButton = card.querySelector(".card__delete-button");
    cardTitle.textContent = name;
    cardImage.setAttribute('src',imagelink);
    cardImage.setAttribute('alt',imagealt);
    likeButton.addEventListener('click', function() {
        likeButton.classList.toggle('card__like-button_is-active');
    });
    deleteButton.addEventListener('click', function(evt){
        const removingCard = deleteButton.closest('.card');
        removingCard.remove();
    })
    cardImage.addEventListener('click', function(evt){
        image.setAttribute("src",cardImage.src);
        image.setAttribute("alt",cardImage.alt);
        caption.textContent = cardTitle.textContent;
        openModal(imagePopup);
    })
    return card;
}

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
} 

function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
} 

initialCards.forEach(function(elem){
    places__list.append(createCard(elem.name,elem.link,""))
})


function editProfile(){

    openModal(profilePopup)
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;// Воспользуйтесь инструментом .querySelector()
    profileFormElement.addEventListener('submit', handleProfileFormSubmit);

}


function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(profilePopup);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard = createCard(cardName.value,cardUrl.value,"");
    places__list.prepend(newCard);
    closeModal(cardPopup);
}

function addCard(){
    openModal(cardPopup)
    const cardFormElement = cardPopup.querySelector(".popup__form");// Воспользуйтесь методом querySelector()
    cardUrl.value = "";
    cardName.value = "";
    cardFormElement.addEventListener('submit', handleCardFormSubmit);
}




profileOpenButton.addEventListener('click', editProfile);
cardOpenButton.addEventListener('click', addCard);
profileCloseButton.addEventListener('click', () => closeModal(profilePopup));
cardCloseButton.addEventListener('click', () => closeModal(cardPopup));
imageCloseButton.addEventListener('click', () => closeModal(imagePopup));
// @todo: DOM узлы




// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
