import Popup from "./popup";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, {submit}, {clearValidity}) {
        super(popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__form');
        this._submitBtn = this._popup.querySelector('.popup__save-button');
        this._popupInputList = this._popup.querySelectorAll('.popup__input');
        this._clearValidity = clearValidity;
    }

    _getInputValues() {
        this._formValues = {};
        this._popupInputList.forEach(item => {
            this._formValues[item.name] = item.value;
        });       
        return this._formValues
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit(this._getInputValues());
        });
    }

    setBtnContent(content) {
        this._submitBtn.textContent = content;
    }

    close() {
        super
        .close();
        this._form.reset();
        this._popupInputList.forEach(item => {
            this._clearValidity(item);
        });
    }

    setInputValues() {
        this._popupInputList.forEach((item) => {
            console.log(item.value)

        })
    }
}