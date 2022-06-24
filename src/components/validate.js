import { validationConfig } from "../index.js";
import { setEventListeners, removeEventListeners } from "./units.js";

const showInputError = (formElement, inputElement, validationConfig) => {
    const { inputErrorClass, errorClass } = validationConfig;
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
    const { inputErrorClass, errorClass } = validationConfig;
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, validationConfig);
    } else {
        showInputError(formElement, inputElement, validationConfig);
    }
};

const buttonCondition = (buttonSelected, inputList, validationConfig) => {
    const { inactiveButtonClass, errorClass, inputErrorClass, ...anyConfig } = validationConfig;
    if (invalidInput(inputList)) {
        buttonSelected.classList.add(inactiveButtonClass);
        buttonSelected.disabled = true;
    } else {
        buttonSelected.classList.remove(inactiveButtonClass);
        buttonSelected.disabled = false;
    }
};

const invalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
};

const disableValidation = () => {
    const { formSelector, ...anyConfig } = validationConfig;
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach(formElement => {
        removeEventListeners(formElement, anyConfig);
    });
};

const enableValidation = () => {
    const { formSelector, ...anyConfig } = validationConfig;
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach(formElement => {
        setEventListeners(formElement, anyConfig);
    });
};

export { enableValidation, disableValidation, buttonCondition, checkInputValidity, invalidInput };
