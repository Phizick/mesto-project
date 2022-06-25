import { initialCards } from "./cards.js";
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
    cardName: '',
    cardLink: ''
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
    const { cardName, cardLink} = cardData;
    const { galleryItemClass, galleryImgClass, galleryCardNameClass, galleryLikeClass, galleryLikeStatus, galleryDelButton, ...anySpec} = gallerySpec;
    const card = galleryTemplate.querySelector(galleryItemClass).cloneNode(true);
    const image = card.querySelector(galleryImgClass);
    image.src = cardLink;
    image.alt = cardName;
    card.querySelector(galleryCardNameClass).textContent = cardName;
    const delItem = card.querySelector(galleryDelButton);    
    const likebtn = card.querySelector(galleryLikeClass);
    delItem.addEventListener("click", () => card.remove());
    likebtn.addEventListener("click", () => {
        likebtn.classList.toggle(galleryLikeStatus);
    });    
    return card;
};

const renderData = (cardName, cardLink) => {
    cardData.cardName = `${cardName}`;
    cardData.cardLink = `${cardLink}`;       
    renderCard(cardData);
};

const renderCard = (cardData) => {
    galleryList.prepend(createNewCard(cardData));
};

initialCards.forEach(item => {renderData(item.name, item.link)});

export {renderCard, renderData, openImgPreview, galleryList};
