export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeBtn = this._popup.querySelector(".popup__close-button");
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
        evt.keyCode == 27 && this.close();
    };

    _handleOverlayClose = (evt) => {
        evt.target.classList.contains("popup") && this.close();
    };

    setEventListeners() {
        this._closeBtn.addEventListener("click", () => {
            this.close();
        });
    }

    _setDefaultEvtListeners() {
        this._popup.addEventListener("click", this._handleOverlayClose);
        document.addEventListener("keydown", this._handleEscClose);
    }

    _removeDefaultEvtListeners() {
        this._popup.removeEventListener("click", this._handleOverlayClose);
        document.removeEventListener("keydown", this._handleEscClose);
    }
}
