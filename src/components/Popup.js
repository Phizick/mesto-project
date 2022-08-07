/**
 * конструктор для создания дефолтного попапа
 * @constructor 
 * @param {string} popupSelector - селектор класса разметки нужного попапа в DOM-дереве
 */

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeBtn = this._popup.querySelector(".popup__close-button");
        this._escKeyCode = 27;
    }

    open() {
        this._popup.classList.add("popup_opened");
        this._setDefaultEvtListeners();
    }

    close() {
        this._popup.classList.remove("popup_opened");
        this._removeDefaultEvtListeners();       
    }

    _handleEscClose = (evt) => {
        evt.keyCode == this._escKeyCode && this.close();
    }

    _handleOverlayClose = (evt) => {
        evt.target.classList.contains("popup") && this.close();
    }

    setEventListeners() {
        this._closeBtn.addEventListener("click", () => {
            this.close();
        });
    }

    _setDefaultEvtListeners() {
        this._popup.addEventListener("mousedown", this._handleOverlayClose);
        document.addEventListener("keydown", this._handleEscClose);
    }

    _removeDefaultEvtListeners() {
        this._popup.removeEventListener("mousedown", this._handleOverlayClose);
        document.removeEventListener("keydown", this._handleEscClose);
    }
}
