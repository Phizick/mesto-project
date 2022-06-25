import { buttonCondition, checkInputValidity } from "./validate.js";
import { closePopup } from "./modal.js";

const keyClose = (evt => {evt.keyCode == 27 && closePopup(document.querySelector(".popup_opened"))});

const overlayClose = (evt => {!evt.target.closest(".popup__container") & !evt.target.closest(".image__container") && closePopup(evt.target.closest(".popup"))});

const resetDefaultAction = (evt => {evt.preventDefault()});

const setEventListeners = (formElement, validationConfig) => {
    const { inputSelector, submitButtonSelector, ...anyConfig } = validationConfig;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonSelected = formElement.querySelector(submitButtonSelector);
    formElement.addEventListener("submit", resetDefaultAction);
    inputList.forEach(inputElement => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(formElement, inputElement, anyConfig);
            buttonCondition(buttonSelected, inputList, anyConfig);
        });
    });
    buttonCondition(buttonSelected, inputList, anyConfig);
};

const removeEventListeners = (formElement, validationConfig) => {
    const { inputSelector, submitButtonSelector, ...anyConfig } = validationConfig;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonSelected = formElement.querySelector(submitButtonSelector);
    formElement.removeEventListener("submit", resetDefaultAction);
    inputList.forEach(inputElement => {
        inputElement.removeEventListener("input", () => {
            checkInputValidity(formElement, inputElement, anyConfig);
            buttonCondition(buttonSelected, inputList, anyConfig);
        });
    });
};

export { keyClose, overlayClose, setEventListeners, removeEventListeners};
