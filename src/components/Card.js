/**
 * конструктор новой карточки с функционалом
 * @constructor
 * @param {object} cardData - обьект с собственными параметрами карточки. содержит имя(name),ссылку на изображение(link), _id(id)
 * likes(массив с кол-вом лайков), owner(данные об авторе карточки(пользователе, который ее добавил))
 * @param {function} handleCardZoomClick - коллбэк функции, открывающей изображение в полном размере по клику
 * @param {function} handleCardLikeClick - коллбэк функции, обрабатывающей лайки к карточкам
 * @param {function} openCardDeletingPopup - коллбэк функции, запрашивающей подтверждение удаления карточки с изображением
 * @param {string} userId - уникальный id пользователя, добавившего карточку
 * @param {string} cardTemplateSelector - селектор темплейта для отрисовки карточек в DOM-дереве
 */

export default class Card {
    constructor(cardData, { handleCardZoomClick }, { handleCardLikeClick }, { openCardDeletingPopup }, userId, cardTemplateSelector) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._id = cardData._id;
        this._likes = cardData.likes;
        this._owner = cardData.owner;
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

    addedCardLike(res) {
        this._cardLikeBtn.classList.add("card__like-btn_active");
        this._cardLikeCount.textContent = res.likes.length;
        this._card.dataset.like = "liked";
    }

    removeCardLike(res) {
        this._cardLikeBtn.classList.remove("card__like-btn_active");
        this._cardLikeCount.textContent = res.likes.length;
        this._card.dataset.like = "disliked";
    }

    setCardEvtListeners() {
        this._cardLikeBtn.addEventListener("click", () => {this._handleCardLikeClick(this._card, this._id)});
        this._cardRemoveBtn.addEventListener("click", () => {this._cardDeletingPopup(this._id)});
        this._cardImage.addEventListener("click", () => {this._handleCardClick(this._name, this._link)});
    }

    _isLiked() {
        this._likes.some((like) => like._id === this._userId) && this._cardLikeBtn.classList.add("card__like-btn_active");
    }

    deleteCard() {
        this._card.remove();
        this._card = null
    }
}
