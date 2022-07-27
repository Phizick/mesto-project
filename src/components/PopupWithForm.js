import Popup from "./Popup";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, {submit}, {clearFormValidity}) {
        super(popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__form');
        this._submitBtn = this._popup.querySelector('.popup__save-button');
        this._popupInputList = this._popup.querySelectorAll('.popup__input');
        this._clearFormValidity = clearFormValidity;
    }

    _getFormInputValues() {
        this._formValues = {};
        this._popupInputList.forEach(item => {
            this._formValues[item.name] = item.value;
        });       
        return this._formValues
    }

    setPopupEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit(this._getFormInputValues());
        });
    }

    setFormSubmitBtnContent(content) {
        this._submitBtn.textContent = content;
    }

    close() {
        super
        .close();
        this._form.reset();        
        this._popupInputList.forEach(item => {
            this._clearFormValidity(item);
        });
    }

    setFormInputValues(data) {        
        this._popupInputList.forEach((item) => {
           if (item.name === 'name') {
            item.value = data.name
           } else {
            item.value = data.about
           }
        })
    }

  
}