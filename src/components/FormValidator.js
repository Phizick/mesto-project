export default class FormValidator {
    constructor(validationConfig, form) {
        this._config = validationConfig;
        this._form = form;
        this._inputList =  Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._submitBTn = this._form.querySelector(this._config.btnSelector);
    }

    _hideInputErrorElement (errorElement) {
        errorElement.classList.remove(this._config.errClass);
        errorElement.textContent = "";
    }

    _hideInputElement (inputElement) {
        inputElement.classList.remove(this._config.errClass);
    }

    _showInputError (inputElement, errorMsg, errorElement) {
        inputElement.classList.add(this._config.inputErrClass);
        errorMsg.classList.add(this._config.errClass);
        errorElement.textContent = errorMsg //??
    }

    _hideInputError (inputElement, errorElement) {
        this._hideInputErrorElement(errorElement);
        this._hideInputElement(inputElement); //??
    }

    _checkInputValidity(inputElement) { //не уверен на счет строки V
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement, errorElement)
        } else {
            this.__showInputError(inputElement, inputElement.validationMsg, errorElement); // inputElement.validationMsg - определить, если нет
        }
    }

    enableBtns() {
        this._submitBTn.classList.remove(this._config.inactiveButtonClass);
        this._submitBTn.disabled = false;
    }

    disablebtns() {
        this._submitBTn.classList.add(this._config.inactiveButtonClass);
        this._submitBTn.disabled = true;
    }

    _invalidInput() {
        return this._inputList.some(inputElement => !inputElement.validity.valid);
    }

    _buttonCondition() {
        if (!this._invalidInput) {
            this.enableBtns();
        } else {
            this.disablebtns(); //???
        }
    }

    enableValidation() {  //вывести в отдельный метод "слушателей"??
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._buttonCondition();
            });
        });
        this._buttonCondition();
    }

    //типа этого  ?????? нужно ли снимать их потом?
    // _setEventListeners() {
    //     this._inputList.forEach(inputElement => {
    //         inputElement.addEventListener("input", () => {
    //             this._checkInputValidity(inputElement);
    //             this._buttonCondition();
    //         });
    //     });
    //     this._buttonCondition();
    // }

    // enableValidation() {
    //     this._setEventListeners()
    // }

    






}