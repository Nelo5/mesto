import { openModal } from "./modal.js";
import { addLike, deleteCard, deleteLike } from "./api.js";

const imagePopup = document.querySelector('.popup_type_image');
const image = imagePopup.querySelector(".popup__image");
const caption = imagePopup.querySelector(".popup__caption");
const cardTemplate = document.querySelector('#card-template').content;

export function createCard(user_card, user){
    const card = cardTemplate.cloneNode(true);
    const cardImage = card.querySelector(".card__image");
    const cardTitle = card.querySelector(".card__title");
    const likeButton = card.querySelector(".card__like-button");
    const deleteButton = card.querySelector(".card__delete-button");
    const likeCounter = card.querySelector('.card__like-counter');
    likeCounter.textContent = user_card.likes.length
    cardTitle.textContent = user_card.name;
    cardImage.setAttribute('src',user_card.link);
    cardImage.setAttribute('alt',user_card.name);

    if (user_card.likes.some((like) => like._id === user._id)){
        likeButton.classList.add('card__like-button_is-active')
    }
    
    likeButton.addEventListener('click', function() {
        if (likeButton.classList.contains('card__like-button_is-active')){
            deleteLike(user_card._id)
            .then((res) => {
                likeCounter.textContent = res.likes.length
                likeButton.classList.remove('card__like-button_is-active')
            })
            .catch((err) => {console.log(err)})
        }
        else{
            addLike(user_card._id)
            .then((res) => {
                likeCounter.textContent = res.likes.length
                likeButton.classList.add('card__like-button_is-active')
            })
            .catch((err) => {console.log(err)})
        }
    });
    
    if (user_card.owner._id === user._id){
        deleteButton.addEventListener('click', function(evt){
            deleteCard(user_card._id)
            .then((res) => {
                const removingCard = deleteButton.closest('.card');
                removingCard.remove();
            })
            .catch((err) => {console.log(err)})
        })
    }
    else{
        deleteButton.remove()
    }

    cardImage.addEventListener('click', function(evt){
        image.setAttribute("src",cardImage.src);
        image.setAttribute("alt",cardImage.alt);
        caption.textContent = cardTitle.textContent;
        openModal(imagePopup);
    })
    return card;
}