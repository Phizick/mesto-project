import Popup from "./Popup";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, submit) {
        super(popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector(".popup__form");
        this._submitBtn = this._popup.querySelector(".popup__save-button");
        this._popupInputList = this._popup.querySelectorAll(".popup__input");
        this._formSubmitState = this._formSubmitState.bind(this);
        this._setButtonState = this._setButtonState.bind(this);
        this._formSubmitDefaultTextContent = this._submitBtn.textContent;
    }

    _setButtonState(btnState) {
        this._submitBtn.enabled = btnState;
        this._submitBtn.textContent = btnState ? "Сохранение..." : this._formSubmitDefaultTextContent;
    }

    _formSubmitState(evt) {
        evt.preventDefault();
        this._setButtonState(false);
        this._submit(this._getFormInputValues())
            .then(() => this.close())
            .finally(() => {
                this._setButtonState(true);
            });
    }

    _getFormInputValues() {
        this._formValues = {};
        this._popupInputList.forEach((item) => {
            this._formValues[item.name] = item.value;
        });
        return this._formValues;
    }

    setPopupEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", this._formSubmitState);
    }

    close() {
        super.close();
        this._form.reset();
    }

    setFormInputValues(data) {
        this._popupInputList.forEach((inputListItem) => {
            if (inputListItem.name === "name") {
                inputListItem.value = data.name;
            } else {
                inputListItem.value = data.about;
            }
        });
    }
}
