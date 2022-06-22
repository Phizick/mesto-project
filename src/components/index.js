//объявляем переменные
const popupProfileForm = document.querySelector(".popup__form-profile");//форма профайла
const profileEdit = document.querySelector(".profile__name-edit"); //кнопка редактирования профиля
const popupProfile = document.querySelector(".popup__profile"); //попап профиля
const formProfileSaveBtn = document.querySelector(".popup__form-profile"); //сабмит профайла
const nameInput = popupProfileForm.querySelector(".popup__input_data_name"); //поле ввода имени профайла
const jobInput = popupProfileForm.querySelector(".popup__input_data_about"); //поле ввода инф профайла
const profileName = document.querySelector(".profile__name-text"); //заголовок профайла
const profileAbout = document.querySelector(".profile__bio"); //инф профайла
const buttonOpenPopupCard = document.querySelector(".profile__add-button"); //кнопка добавления карточки
const popupAddCard = document.querySelector(".popup__img"); //форма добавления карточки
const imgLinkInput = popupAddCard.querySelector(".popup__input_data_imgUrl"); //поле ввода ссылки на картинку в форме добавления карточки
const imgNameInput = popupAddCard.querySelector(".popup__input_data_imgName"); //поле ввода имени картинки в форме добавления карточки
const closeBtns = document.querySelectorAll(".popup__close-button"); //кнопка закрытия модальных окон
const galleryList = document.querySelector(".gallery__grid"); //список карточек
const galleryTemplate = document.querySelector(".gallery__template").content; //шаблон для добавления карточек в разметку
const popupOpenedImg = document.querySelector(".popup__img-opened"); //попап карточки в полный размер картинки

const formElement = document.querySelector('.popup__form')
const inputSelector = formElement.querySelector('.popup__input')

export {imgLinkInput, imgNameInput, galleryList, galleryTemplate, popupOpenedImg, openPopup, closePopup, keyClose, overlayClose}

const openPopup = (item => {
  item.classList.add("popup_opened");
  item.addEventListener('click', overlayClose);
  document.addEventListener('keydown', keyClose);
});

//закрытие попапа
const closePopup = (item => {
  item.classList.remove("popup_opened");
  document.removeEventListener('keydown', keyClose);
  item.removeEventListener('click', overlayClose);
});


profileEdit.addEventListener("click", () => {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
});


buttonOpenPopupCard.addEventListener("click", () => {
  openPopup(popupAddCard);
});


closeBtns.forEach(button => {
  button.addEventListener("click", () => {closePopup(button.closest(".popup"))});
});

const keyClose = (evt => {evt.keyCode == 27 && closePopup(document.querySelector('.popup_opened'))})    

const overlayClose = (evt => {!evt.target.closest('.popup__container') && closePopup(evt.target.closest('.popup'))})

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: '.popup__input_type_error',
  errorClass: '.popup__input-error-active',
  formButtonSubmit: '.popup__save-button'
};



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
  errorElement.textContent = '';
};



const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);       
  }
};
const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

const invalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
}




const buttonCondition = (buttonSelected, inputList, validationConfig) => {
  
  const {inactiveButtonClass, errorClass, inputErrorClass, ...anyConfig} = validationConfig;
  if (invalidInput(inputList)) {
    buttonSelected.classList.add(inactiveButtonClass)
    buttonSelected.disabled = true;
    
  } else {
    buttonSelected.classList.remove(inactiveButtonClass)
    buttonSelected.disabled = false;
    
  }

}

const setEventListeners = (formElement, validationConfig) => {
  const buttonSelected = formElement.querySelector('.popup__save-button');
  const {inputSelector, submitButtonSelector, ...anyConfig} = validationConfig;
  formElement.addEventListener('submit', evt => {evt.preventDefault()})
  
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, anyConfig)
      buttonCondition(buttonSelected, inputList, anyConfig)
    })
  })
  buttonCondition(buttonSelected, inputList, anyConfig)
}


const enableValidation = () => {
  const {formSelector, ...anyConfig} = validationConfig;
  const formList = document.querySelectorAll(formSelector)
  formList.forEach(formElement => {
    setEventListeners(formElement, anyConfig)
  })
}

enableValidation()

