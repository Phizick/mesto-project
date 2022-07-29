import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._figcaption = this._popup.querySelector('.image__opened-title');
        this._imageOpened = this._popup.querySelector('.image__opened');
    }

    open(name, link) {
        super.open();
        this._name = name;
        this._link = link;
        this._figcaption.textContent = this._name;
        this._imageOpened.src = this._link;
        this._imageOpened.alt = this._name;
    }
}