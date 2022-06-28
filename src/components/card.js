
import { openPopup } from "./modal.js";

const galleryList = document.querySelector(".gallery__grid");
const galleryTemplate = document.querySelector(".gallery__template").content;
const popupOpenedImg = document.querySelector(".popup__img-opened");
const imageContainer = document.querySelector(".image__container");
const imageOpened = imageContainer.querySelector(".image__opened");

const gallerySpec = {
    galleryItemClass: ".gallery__grid-item",
    galleryImgClass: ".gallery__grid-image",
    galleryCardNameClass: ".gallery__grid-name",
    galleryLikeClass: ".gallery__grid-like",
    galleryLikeStatus: "gallery__grid-like_active",
    galleryDelButton: ".gallery__delete-img-button"
};

const cardData = {
    name: '',
    link: '',
    likes: '',
    owner: '',
    _Id: '',
    createdAt: ''
};    
    


const openImgPreview = (evt) => {    
    if (evt.target.closest('.gallery__grid-image')) {    
        imageOpened.src = evt.target.src;
        imageOpened.alt = evt.target.alt;
        imageContainer.querySelector(".image__opened-title").textContent = evt.target.alt;
        openPopup(popupOpenedImg);
    } else {
        return
    }
};

const createNewCard = (cardData) => {    
    const { name, link} = cardData;
    const { galleryItemClass, galleryImgClass, galleryCardNameClass, galleryLikeClass, galleryLikeStatus, galleryDelButton, ...anySpec} = gallerySpec;
    const card = galleryTemplate.querySelector(galleryItemClass).cloneNode(true);
    const image = card.querySelector(galleryImgClass);
    image.src = link;
    image.alt = name;
    card.querySelector(galleryCardNameClass).textContent = name;
    const delItem = card.querySelector(galleryDelButton);    
    const likebtn = card.querySelector(galleryLikeClass);
    delItem.addEventListener("click", () => card.remove());
    likebtn.addEventListener("click", () => {
        likebtn.classList.toggle(galleryLikeStatus);
    });    
    return card;
};

const renderData = (name, link) => {
    cardData.name = `${name}`;
    cardData.link = `${link}`;       
    renderCard(cardData);
    
};

// function renderPull(name, link) {
//     cardData.name = `${name}`;
//     cardData.link = `${link}`; 
//     pullCard(cardData);
// }

const renderCard = (cardData) => {
    galleryList.append(createNewCard(cardData));    
};


const apiConfig = {
    serverUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
    headers: {
        authorization: 'c1b9d872-823e-43ab-9724-10a589fee2c1',
        'Content-Type': 'application/json'
    },
    userID: '7a744b5fd03159f0028e76c6'
}

const pullCard = (cardData) => {
    return fetch(`${apiConfig.serverUrl}/cards`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify(cardData),        
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        } return Promise.reject(`error: ${res.status}`)
    })

}

const deleteCard = (cardData) => {
    return fetch(`${apiConfig.serverUrl}/cards/${cardData._Id}`, {
        method: 'DELETE',
        headers: apiConfig.headers,
        body: JSON.stringify(cardData),        
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        } return Promise.reject(`error: ${res.status}`)
    })

}

export { pullCard, cardData}

    
const renderCardArray = async () => {
    const cardsArray = new Promise((res, rej) => {
        fetch(`${apiConfig.serverUrl}/cards`, {
        headers: apiConfig.headers
    });
    .then


    })
}


fetch('https://mesto.nomoreparties.co/v1/plus-cohort-12/cards', {
    headers: {
        authorization: 'c1b9d872-823e-43ab-9724-10a589fee2c1'
    }
})
.then(res => res.json())
.then(res => {
    res.forEach(item => {renderData(item.name, item.link)});
})

fetch('https://mesto.nomoreparties.co/v1/plus-cohort-12/cards', {
    headers: {
        authorization: 'c1b9d872-823e-43ab-9724-10a589fee2c1'
    }
})
.then(res => res.json())
.then(res => console.log(res))




export {renderCard, renderData, openImgPreview, galleryList};
