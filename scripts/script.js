// "use strict";

// //объявляем переменные
// const popupProfileForm = document.querySelector(".popup__form-profile");//форма профайла
// const profileEdit = document.querySelector(".profile__name-edit"); //кнопка редактирования профиля
// const popupProfile = document.querySelector(".popup__profile"); //попап профиля
// const formProfileSaveBtn = document.querySelector(".popup__form-profile"); //сабмит профайла
// const nameInput = popupProfileForm.querySelector(".popup__input_data_name"); //поле ввода имени профайла
// const jobInput = popupProfileForm.querySelector(".popup__input_data_about"); //поле ввода инф профайла
// const profileName = document.querySelector(".profile__name-text"); //заголовок профайла
// const profileAbout = document.querySelector(".profile__bio"); //инф профайла
// const buttonOpenPopupCard = document.querySelector(".profile__add-button"); //кнопка добавления карточки
// const popupAddCard = document.querySelector(".popup__img"); //форма добавления карточки
// const imgLinkInput = popupAddCard.querySelector(".popup__input_data_imgUrl"); //поле ввода ссылки на картинку в форме добавления карточки
// const imgNameInput = popupAddCard.querySelector(".popup__input_data_imgName"); //поле ввода имени картинки в форме добавления карточки
// const closeBtns = document.querySelectorAll(".popup__close-button"); //кнопка закрытия модальных окон
// const galleryList = document.querySelector(".gallery__grid"); //список карточек
// const galleryTemplate = document.querySelector(".gallery__template").content; //шаблон для добавления карточек в разметку
// const popupOpenedImg = document.querySelector(".popup__img-opened"); //попап карточки в полный размер картинки

// export {imgLinkInput, imgNameInput, galleryList, galleryTemplate, popupOpenedImg }


// function openPopup(item) {
//     item.classList.add("popup_opened");
//     const currentPopup = document.querySelector('.popup_opened')
//     currentPopup.addEventListener('click', evt => {!evt.target.closest('.popup__container') && closePopup(evt.target.closest('.popup'))})
//     // currentPopup.addEventListener('keydown', evt => {evt.keyCode == 27 && closePopup(currentPopup.closest('.popup'))})
    

// };

// //закрытие попапа
// function closePopup(item) {
//     item.classList.remove("popup_opened");
// };


// //попап редактирования профиля
// profileEdit.addEventListener("click", () => {
//     openPopup(popupProfile);
//     nameInput.value = profileName.textContent;
//     jobInput.value = profileAbout.textContent;
// });

// //попап добавления карточки
// buttonOpenPopupCard.addEventListener("click", () => {
//     openPopup(popupAddCard);
// });

// //добавление информации о себе
// // formProfileSaveBtn.addEventListener("submit", (evt) => {
// //     evt.preventDefault();
// //     profileName.textContent = nameInput.value;
// //     profileAbout.textContent = jobInput.value;
// //     closePopup(popupProfile);
// // });

// //перебор всех кнопок с закрытием модальных окон
// closeBtns.forEach((button) => {
//     button.addEventListener("click", () => {
//         closePopup(button.closest(".popup"));
//     });
// });



// //добавление новой карточки
// // popupAddCard.addEventListener("submit", (evt) => {
// //     evt.preventDefault();
// //     renderCard(imgNameInput.value, imgLinkInput.value);
// //     closePopup(popupAddCard);
// //     //обнуление значений полей ввода
// //     imgNameInput.value = "";
// //     imgLinkInput.value = "";
// // });

// // const popupFormElement = document.querySelector('.popup__form');
// // const popupFormInput = document.getElementById('userName-input');

// // const formError = popupFormElement.querySelector('.userName-input-error')


// const setEventListeners = (formElement) => {
//     const inputList = formElement.querySelectorAll('.popup__input');
//     inputList.forEach((inputElement) => {
//       inputElement.addEventListener('input', function () {
//         checkInputValidity(formElement, inputElement);
//       });
//     });
//   };
  
  
//   const enableValidation = () => {
//     const formList = document.querySelectorAll('.popup__form');
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
  
//     //   setEventListeners(formElement);
//   })
    
//   }
  
 



// const popupList = document.querySelectorAll('.popup');

// // const closeKey = (evt =>  {
// // if (evt.keyCode == 27) {
// //     for (let i = 0; i < popupList.length; i++) {
// //         popupList[i].classList.remove('popup_opened')
// //     }
// // }
// // })

// // function closeKey(evt) {
// //     if (evt.keyCode == 27) {
// //             for (let i = 0; i < popupList.length; i++) {
// //                 popupList[i].classList.remove('popup_opened')
// //             }
// //         }
// // }


