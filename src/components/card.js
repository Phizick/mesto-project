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

    createNewCard() {
        this._card = this._getElement();
        this._cardImage = this._card.querySelector('.gallery__grid-image');
        this._cardTitle = this._card.querySelector('.gallery__grid-name');
        this._cardLikeCount = this._card.querySelector('.gallery__grid-like-count');
        this._cardLikeBtn = this._card.querySelector('.gallery__grid-like');
        this._cardRemoveBtn = this._card.querySelector('.gallery__delete-img-button');
        this._likeStatus();
        this._userId !== this._owner._id && delItem.remove();
        


    }

}