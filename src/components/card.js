export default class Card {
    constructor({ name, link, _id, likes, owner }, { handleCardZoomClick }, { handleCardLikeClick }, { openCardDeletingPopup }, userId, cardTemplateSelector) {
        this._name = name;
        this._link = link;
        this._id = _id;
        this._likes = likes;
        this._owner = owner;
        this._userId = userId;
        this._templateSelector = cardTemplateSelector;
        this._handleCardClick = handleCardZoomClick;
        this._handleCardLikeClick = handleCardLikeClick;
        this._cardDeletingPopup = openCardDeletingPopup;
    }

    _getElement() {
        return document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(true);
    }

    createNewCard() {
        this._card = this._getElement();
        this._cardImage = this._card.querySelector(".card__image");
        this._cardTitle = this._card.querySelector(".card__name");
        this._cardLikeCount = this._card.querySelector(".card__like-count");
        this._cardLikeBtn = this._card.querySelector(".card__like-btn");
        this._cardRemoveBtn = this._card.querySelector(".card__delete-btn");
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;
        this._card.dataset.id = this._id;
        this._cardLikeCount.textContent = this._likes.length;
        this._isLiked();
        this._userId !== this._owner._id && this._cardRemoveBtn.remove();
        this.setCardEvtListeners();
        return this._card;
    }

    _addedCardLike(res) {
        this._cardLikeBtn.classList.add("card__like-btn_active");
        this._cardLikeCount.textContent = res.likes.length;
        this._card.dataset.like = "liked";
    }

    _removeCardLike(res) {
        this._cardLikeBtn.classList.remove("card__like-btn_active");
        this._cardLikeCount.textContent = res.likes.length;
        this._card.dataset.like = "disliked";
    }

    setCardEvtListeners() {
        this._cardLikeBtn.addEventListener("click", () => {
            this._handleCardLikeClick(this._card, this._id);
        });

        this._cardRemoveBtn.addEventListener("click", () => {
            this._cardDeletingPopup(this._id);
        });

        this._cardImage.addEventListener("click", () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    _isLiked() {
        this._likes.some((like) => like._id === this._userId) && this._cardLikeBtn.classList.add("card__like-btn_active");
    }
}
