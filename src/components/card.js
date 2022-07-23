

export default class Card {
    constructor(cardData, {handleCardClick}, {handleLikeClick}, {openDelPopup}, userId, templateSelector) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._id = cardData._id;
        this._likes = cardData.likes;
        this._owner = cardData.owner;
        this._userId = userId;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._openDelPopup = openDelPopup;
    }

    _getElement() {
        return document
            .querySelector(".gallery__template")
            .content
            .querySelector(".card")
            .cloneNode(true);
    }


    createNewCard() {
        this._card = this._getElement();
        this._cardImage = this._card.querySelector('.card__image');
        this._cardTitle = this._card.querySelector('.card__name');
        this._cardLikeCount = this._card.querySelector('.card__like-count');
        this._cardLikeBtn = this._card.querySelector('.card__like-btn');
        this._cardRemoveBtn = this._card.querySelector('.card__delete-btn');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;
        this._card.dataset.id = this._id;
        this._cardLikeCount.textContent = this._likes.length;
        this._likeStatus();
        this._userId !== this._owner._id && delItem.remove();
        this.setEvtListeners();
        return this._card;
    }


    setEvtListeners() {
        this._cardLikeBtn.addEventListener('click', () => {
            this._handleLikeClick(this._card, this._id);
        })

        this._cardRemoveBtn.addEventListener('click', () => {
            this._openDelPopup(this._id);
        })

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })        
    }

    _likeStatus() {        
        this._likes.find((elem) => elem._id === this._userId) === undefined ? false : true;
    }

    

} 