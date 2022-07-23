export default class PopupWithForm extends Popup {
    constructor(popupSelector, {formSubmit} ) {
        super(popupSelector);
        this._submit = formSubmit;
        this._form = this._popup.querySelector('.popup__form')
        this._subminBtn = this._popup.querySelector('.popup__save-button');
        this._popupInputList = this._popup.querySelectorAll('.popup__input');
    }

    



}