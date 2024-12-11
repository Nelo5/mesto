const avatarLink = 'https://i.pinimg.com/originals/d3/7a/00/d37a0076e42d9e612f190d7ce49ca141.png'
const config = {
    baseUrl: 'https://nomoreparties.co/v1/frontend-st-cohort-201',
    headers: {
      authorization: '23e1dd0a-624b-42d1-8e17-c57ac99e2f91',
      'Content-Type': 'application/json'
    }
}


export function getUserInfo(){
    return fetch(`${config.baseUrl}/users/me `, {
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
        return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function getInitialCards(){
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
        return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function changeUserInfo(newName,newDescription){
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
        name: newName,
        about: newDescription
        })
    })
    .then(res => {
        if (res.ok) {
        return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function addNewCard(imageName, imageLink){
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers:config.headers,
        body: JSON.stringify({
            name: imageName,
            link: imageLink
        })
    })
    .then(res => {
        if (res.ok) {
        return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function deleteCard(cardId){
    return fetch(`${config.baseUrl}/cards/${cardId}`,{
        method:'DELETE',
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
        return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function addLike(cardId){
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
        return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function deleteLike(cardId){
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
        return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function changeAvatar(avatarLink){
    return fetch(`${config.baseUrl}/users/me/avatar `, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarLink
        })
    })
    .then(res => {
        if (res.ok) {
        return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}