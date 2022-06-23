import {initialCards} from './cards.js'
const popupProfileForm = document.querySelector(".popup__form-profile");
const profileEdit = document.querySelector(".profile__name-edit"); 
const popupProfile = document.querySelector(".popup__profile"); 
const formProfileSaveBtn = document.querySelector(".popup__form-profile"); 
const nameInput = popupProfileForm.querySelector(".popup__input_data_name"); 
const jobInput = popupProfileForm.querySelector(".popup__input_data_about");
const profileName = document.querySelector(".profile__name-text");
const profileAbout = document.querySelector(".profile__bio");
const buttonOpenPopupCard = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup__img");
const imgLinkInput = popupAddCard.querySelector(".popup__input_data_imgUrl");
const imgNameInput = popupAddCard.querySelector(".popup__input_data_imgName");
const closeBtns = document.querySelectorAll(".popup__close-button"); 
const galleryList = document.querySelector(".gallery__grid");
const galleryTemplate = document.querySelector(".gallery__template").content;
const popupOpenedImg = document.querySelector(".popup__img-opened");


// const popupOpenedForm = document.querySelector('.popup_opened')
// const formElement = document.querySelector('.popup__form')
// const formElement = document.getElementById('123')



export {imgLinkInput, imgNameInput, galleryList, galleryTemplate, popupOpenedImg, openPopup, closePopup, keyClose, overlayClose}

const openPopup = (item => {
  item.classList.add("popup_opened");
  item.addEventListener('click', overlayClose);
  document.addEventListener('keydown', keyClose);
  enableValidation()
});



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
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error-active',
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
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
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


const invalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
}



const enableValidation = () => {
  const {formSelector, ...anyConfig} = validationConfig;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(formElement => {
    setEventListeners(formElement, anyConfig)    
  })
}


formProfileSaveBtn.addEventListener("submit", evt => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popupProfile);
});

popupAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();

  renderCard(imgNameInput.value, imgLinkInput.value);
  closePopup(popupAddCard);    
  imgNameInput.value = "";
  imgLinkInput.value = "";
});


//создание новой карточки
const createNewCard = (cardName, cardLink) => {
  //создание контейнера под карточку и определение его значений
  const card = galleryTemplate.querySelector(".gallery__grid-item").cloneNode(true);
  const image = card.querySelector(".gallery__grid-image");
  image.src = cardLink;
  image.alt = cardName;
  card.querySelector(".gallery__grid-name").textContent = cardName;
  
  //удаление карточки
  const delItem = card.querySelector(".gallery__delete-img-button");
  delItem.addEventListener("click", () => {
      const listItem = delItem.closest(".gallery__grid-item");
      listItem.remove();
  });

  //лайк карточки
  const likebtn = card.querySelector(".gallery__grid-like");
  likebtn.addEventListener("click", () => {
      likebtn.classList.toggle("gallery__grid-like_active");
  }); 

  //открытие карточки в полном размере изображения
  const imageContainer = document.querySelector(".image__container");
  image.addEventListener("click", () => {
      const imageOpened = imageContainer.querySelector(".image__opened");
      imageOpened.src = image.src;
      imageOpened.alt = image.alt;
      imageContainer.querySelector(".image__opened-title").textContent = image.alt;
      openPopup(popupOpenedImg);
  });
  return card;
};

//отрисовка карточки в контейнер
const renderCard = (cardName, cardLink) => {
  galleryList.prepend(createNewCard(cardName, cardLink));    
};

//перебор массива
initialCards.forEach(item => {
  renderCard(item.name, item.link);
});
