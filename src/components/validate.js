


// const showInputError = (formElement, inputElement, errorMessage) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.add('popup__input_type_error');
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add('popup__input-error-active');
//   };
  
//   const hideInputError = (formElement, inputElement) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.remove('popup__input_type_error');
//     errorElement.classList.remove('popup__input-error-active');
//     errorElement.textContent = '';
//   };
  
//   const checkInputValidity = (formElement, inputElement) => {
//     if (!inputElement.validity.valid) {
//       showInputError(formElement, inputElement, inputElement.validationMessage);
//     } else {
//       hideInputError(formElement, inputElement);
//     }
//   };
  


//   const enableValidation = (objConfig) => {
//     const {} = objConfig


//     const formList = document.querySelectorAll('.popup__form');
//   formList.forEach(formElement => {
//     formElement.addEventListener('submit', evt => {
//       evt.preventDefault();
//     });
  
//       setEventListeners(formElement);
//   })
    
//   }


const showInputError = (formElement, inputElement, objConfig) => {
    const { inputErrorClass, errorClass } = objConfig;
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
  };
  
  const hideInputError = (formElement, inputElement, objConfig) => {
    const { inputErrorClass, errorClass } = objConfig;
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  


  const enableValidation = (objConfig) => {
    const {} = objConfig


    const formList = document.querySelectorAll('.popup__form');
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
  
      setEventListeners(formElement);
  })
    
  }

  const objConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: '.popup__save-button_disabled',
    inputErrorClass: '.popup__input_type_error',
    errorClass: '.popup__input-error-active'
  }