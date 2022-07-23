
import { closePopup, openPopup } from "./modal";
import { deleteCard, likeCardAddApi, likeCardRemoveApi, apiConfig } from "./api";

const openImgPreview = (evt) => {
    if (evt.target.closest(".gallery__grid-image")) {
        imageOpened.src = evt.target.src;
        imageOpened.alt = evt.target.alt;
        imageOpenedTitel.textContent = evt.target.alt;
        openPopup(popupOpenedImg);
    } else {
        return;

export default class Card {
    constructor(cardData, userId, templateSelector) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._id = cardData._id;
        this._likes = cardData.likes;
        this._owner = cardData.owner;
        this._userId = userId;
        this._templateSelector = templateSelector;

    }

    _getElement() {
        return document
            .querySelector(".gallery__template")
            .content
            .querySelector(".gallery__grid-item")
            .cloneNode(true);
    }


function confirmDeleteCard(evt) {
    evt.preventDefault();
    const deleteId = popupConfirmDel.dataset.Id;
    deletingCard(deleteId);
};

    createNewCard() {
        this._card = this._getElement();
        this._cardImage = this._card.querySelector('.gallery__grid-image');
        this._cardTitle = this._card.querySelector('.gallery__grid-name');
        this._cardLikeCount = this._card.querySelector('.gallery__grid-like-count');
        this._cardLikeBtn = this._card.querySelector('.gallery__grid-like');
        this._cardRemoveBtn = this._card.querySelector('.gallery__delete-img-button');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;
        this._card.dataset.id = this._id;
        this._cardLikeCount.textContent = this._likes.length;
        this._likeStatus();
        this._userId !== this._owner._id && delItem.remove();
        return this._card;
    }


    setEvtListeners() {
        this._cardLikeBtn.addEventListener('click', () => {
            //сделать метод клик-лайк
        })

        this._cardRemoveBtn.addEventListener('click', () => {
            //сделать метод удаления
        })

        this._cardImage.addEventListener('click', () => {
            //сделать открытие зум картинки по клику
        })        
    }

    _likeStatus() {
        //можно сделать через some и условие, но так мне нравится больше )
        this._likes.find((elem) => elem._id === this._userId) === undefined ? false : true;
    }

}