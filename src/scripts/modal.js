export function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown',closeByEsc)
}

export function openModal(popup) {      
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown',closeByEsc)
} 

function closeByEsc(evt) {     
    const openedPopup = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape') {           
        closeModal(openedPopup); 
    } 
};

export function closeByOverlayClick(evt, popup){ 
    if (evt.target === popup){
        closeModal(popup)
    }
}