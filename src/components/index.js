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

export {imgLinkInput, imgNameInput, galleryList, galleryTemplate, popupOpenedImg, openPopup, closePopup, keyClose, overlayClose}

const openPopup = (item) => {
  item.classList.add("popup_opened");
  item.addEventListener('click', overlayClose);
  document.addEventListener('keydown', keyClose);
};

//закрытие попапа
const closePopup = (item) => {
  item.classList.remove("popup_opened");
  document.removeEventListener('keydown', keyClose);
  item.removeEventListener('click', overlayClose);
};

//попап редактирования профиля
profileEdit.addEventListener("click", () => {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
});

//попап добавления карточки
buttonOpenPopupCard.addEventListener("click", () => {
  openPopup(popupAddCard);
});

//перебор всех кнопок с закрытием модальных окон
closeBtns.forEach(button => {
  button.addEventListener("click", () => {closePopup(button.closest(".popup"));});
});

const keyClose = (evt => {
  const openedPopup = document.querySelector('.popup_opened');  
  evt.keyCode == 27 && closePopup(openedPopup);
})    

const overlayClose = (evt => {!evt.target.closest('.popup__container') && closePopup(evt.target.closest('.popup'))})

// const objConfig = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__save-button',
//   inactiveButtonClass: '.popup__save-button_disabled',
//   inputErrorClass: '.popup__input_type_error',
//   errorClass: '.popup__input-error-active',
// }




// const showInputError = (formElement, inputElement, objConfig) => {
//   const { inputErrorClass, errorClass } = objConfig;
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(inputErrorClass);
//   errorElement.textContent = inputElement.validationMessage;
//   errorElement.classList.add(errorClass);
// };

// const hideInputError = (formElement, inputElement, objConfig) => {
//   const { inputErrorClass, errorClass } = objConfig;
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(inputErrorClass);
//   errorElement.classList.remove(errorClass);
//   errorElement.textContent = '';
// };

// const checkInputValidity = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// };


// const enableValidation = (objConfig) => {
//   const { formSelector, ...restConfig } = objConfig;
//   const formList = document.querySelectorAll(formSelector)



// //     const formList = document.querySelectorAll('.popup__form');
// formList.forEach(formElement => {
//   setEventListeners(formElement, restConfig)
//   });
// }
// //       setEventListeners(formElement);
// //   })
  
// //   }


// enableValidation();


