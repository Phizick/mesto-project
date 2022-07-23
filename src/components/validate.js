import { setEventListeners} from "./units.js";
import { validationConfig } from '../utils/constants'


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
    const { inactiveButtonClass } = validationConfig;
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

const enableValidation = (validationConfig) => {
    const { formSelector } = validationConfig;
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach(formElement => {
        setEventListeners(formElement, validationConfig);
    })   
};

const resetValidation = (formElement, validationConfig) => {
    const { errorClass, inputErrorClass, inactiveButtonClass, submitButtonSelector } = validationConfig;
    const errorItems = Array.from(formElement.querySelectorAll(`.${errorClass}`));    
    const inputList = Array.from(formElement.querySelectorAll(`.${inputErrorClass}`));
    const buttonItem = formElement.querySelector(submitButtonSelector);
    errorItems.forEach(errorItem => {
        errorItem.classList.remove(errorClass);
    })
    inputList.forEach(inputItem => {
        inputItem.classList.remove(inputErrorClass);
    })
    buttonItem.disabled = true;
    buttonItem.classList.add(inactiveButtonClass);
};

const clearValidity = (formItem) => {
    const { formSelector } = validationConfig;
    const formList = Array.from(formItem.querySelectorAll(formSelector));
    formList.forEach(formElement => {
        resetValidation(formElement, validationConfig);
        formElement.reset();
    })    
};

export { enableValidation, buttonCondition, checkInputValidity, invalidInput, clearValidity };
