/**
 * класс для валидации полей всех форм. Отвечает за валидацию самих полей, состояние кнопок и отображение ошибок
 * @constructor
 * @param {object} validationConfig - обьект, хранящий селекторы и классы формы, кнопок, полей ввода и состояния видимости ошибок
 * @param {object} form - обьект формы для валидации
 */

 export default class FormValidator {
    constructor(validationConfig, form) {
        this._config = validationConfig;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._submitBTn = this._form.querySelector(this._config.submitButtonSelector);
    }

    _hideInputErrorElement(errorElement) {
        errorElement.classList.remove(this._config.errorVisibilityClass);
        errorElement.textContent = "";
    }

    _hideInputElement(inputElement) {
        inputElement.classList.remove(this._config.inputErrorClass);
    }

    _showFormInputError(inputElement, errorMsg, errorElement) {
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.classList.add(this._config.errorVisibilityClass);
        errorElement.textContent = errorMsg;
    }

    _hideFormInputError(inputElement, errorElement) {
        this._hideInputErrorElement(errorElement);
        this._hideInputElement(inputElement);
    }

    _checkInputValidity(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        if (inputElement.validity.valid) {
            this._hideFormInputError(inputElement, errorElement);
        } else {
            this._showFormInputError(inputElement, inputElement.validationMessage, errorElement);
        }
    }

    _enableFormSubmitBtns() {
        this._submitBTn.classList.remove(this._config.inactiveButtonClass);
        this._submitBTn.disabled = false;
    }

    _disableFormSubmitBtns() {
        this._submitBTn.classList.add(this._config.inactiveButtonClass);
        this._submitBTn.disabled = true;
    }

    _invalidInputState() {
        return this._inputList.every((item) => item.validity.valid);
    }

    _buttonCondition() {
        if (this._invalidInputState()) {
            this._enableFormSubmitBtns();
        } else {
            this._disableFormSubmitBtns();
        }
    }

    enableValidation() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._buttonCondition();
            });
        });
        this._buttonCondition();
    }

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._buttonCondition();
            });
        });
        this._buttonCondition();
    }

    resetValidation() {
        this._buttonCondition();
        this._inputList.forEach((item) => {
            const errorElement = this._form.querySelector(`.${item.id}-error`);
            this._hideFormInputError(item, errorElement);
        });
    }
}
