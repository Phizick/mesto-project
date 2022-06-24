const keyClose = (evt => {evt.keyCode == 27 && closePopup(document.querySelector('.popup_opened'))})    

const overlayClose = (evt => {!evt.target.closest('.popup__container') && closePopup(evt.target.closest('.popup'))})

const setEventListeners = (formElement, validationConfig) => {
    const {inputSelector, submitButtonSelector, ...anyConfig} = validationConfig;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonSelected = formElement.querySelector(submitButtonSelector);   
    formElement.addEventListener('submit', evt => {evt.preventDefault()});  
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, anyConfig)
        buttonCondition(buttonSelected, inputList, anyConfig)
      });
    });
    buttonCondition(buttonSelected, inputList, anyConfig)  
  };
  
  const removeEventListeners = (formElement, validationConfig) => {
    const {inputSelector, submitButtonSelector, ...anyConfig} = validationConfig;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonSelected =  formElement.querySelector(submitButtonSelector);  
    formElement.removeEventListener('submit', evt => {evt.preventDefault()})
    inputList.forEach(inputElement => {
      inputElement.removeEventListener('input', () => {
        checkInputValidity(formElement, inputElement, anyConfig)
        buttonCondition(buttonSelected, inputList, anyConfig)
      });
    }); 
  };