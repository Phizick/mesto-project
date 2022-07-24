export default class PopupWithForm extends Popup {
    constructor(popupSelector, {formSubmit}, {clearValidity}) {
        super(popupSelector);
        this._submit = formSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._subminBtn = this._popup.querySelector('.popup__save-button');
        this._popupInputList = this._popup.querySelectorAll('.popup__input');
        this._clearValidity = clearValidity;
    }

    _getInputValues() {
        this._formInfo = {};
        this._popupInputList.forEach(item => {
            this._formInfo[item.name] = item.value;
        });

        return this._formInfo;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._subminBtn(this._getInputValues());
        });
    }

    setBtnContent(content) {
        this._submitBtn.textContent = content;
    }

    close() {
        super.close();
        this._form.reset();
        this._popupInputList.forEach(item => {
            this._clearValidity(item);
        });
    }
}