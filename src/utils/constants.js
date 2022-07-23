/* jshint esversion:6 */
// const popupProfile = document.querySelector(".popup__profile");
// const popupAddCard = document.querySelector(".popup__img");
// const popupAvatarEdit = document.querySelector(".popup__avatar-edit");

// const popupAvatarEditBtn = document.querySelector(".profile__avatar-edit-btn");
// const popupOpenedImg = document.querySelector(".popup__img-opened");
// const popupConfirmDel = document.querySelector(".popup__delete-confirm");

// const profileEdit = document.querySelector(".profile__name-edit");
// const profileName = document.querySelector(".profile__name-text");
// const profileAbout = document.querySelector(".profile__bio");
// const buttonOpenPopupCard = document.querySelector(".profile__add-button");

// const closeBtns = document.querySelectorAll(".popup__close-button");


// const popupProfileForm = document.querySelector(".popup__form-profile");
// ? const formProfileSaveBtn = document.querySelector(".popup__profile-save-button");
// ? const profileSaveBtns = document.querySelector(".popup__profile-save-button");
//const nameInput = popupProfileForm.querySelector(".popup__input_data_name");
// const jobInput = popupProfileForm.querySelector(".popup__input_data_about");

// const imgLinkInput = popupAddCard.querySelector(".popup__input_data_imgUrl");
// const imgNameInput = popupAddCard.querySelector(".popup__input_data_imgName");
// const profileAddCardSaveBtn = document.querySelector(".popup__card-save-button");

// const profileAvatar = document.querySelector(".profile__avatar-image");
// const popupAvatarSaveBtn = document.querySelector(".popup__avatar-save-button");
// const avatarInput = popupAvatarEdit.querySelector(".popup__input_data_avatarUrl");
// const avatEditForm = document.querySelector(".popup__form-avatar");

// const galleryList = document.querySelector(".gallery__grid");
// const imageContainer = document.querySelector(".image__container");
// const imageOpened = imageContainer.querySelector(".image__opened");
// const imageOpenedTitle = imageContainer.querySelector('.image__opened-title');

// const formDelete = document.querySelector(".popup__form-delete");

// const galleryTemplate = document.querySelector(".gallery__template").content;



const cardData = {
    name: "",
    link: "",
    likes: "",
    owner: "",
    _Id: "",
    createdAt: "",
    owner: {
        name: "",
        about: "",
        avatar: "",
        _id: "",
    },
};

export const galleryList = ".gallery__grid";          // селектор разметки куда будут добавляться карточки
export const galleryTemplate = ".gallery__template";   // разметка карточки из темплейт для подготовки
export const profileAvatar = ".profile__avatar-image"; // картинка Аватарки

/* селектора создаваемой карточки */ 
const gallerySpec = {
    galleryItemClass: ".gallery__grid-item",            // селектор карточки 
    galleryImgClass: ".gallery__grid-image",            // изображение карточки   
    galleryCardNameClass: ".gallery__grid-name",        // название карточки
    galleryLikeClass: ".gallery__grid-like",            // селектор сердечка общий (без лайка) 
    galleryLikeStatus: "gallery__grid-like_active",     // добавление селектора когда кликнули на сердечке 
    galleryDelButton: ".gallery__delete-img-button",    // корзинка удаления карточки
    galleryLikeCountClass: ".gallery__grid-like-count", // счетчик лайков 
};


/* кнопки открытия мод. окон */ 
export const editProfileBtn = {
    editAvatarBtn: ".profile__avatar-edit-btn",  // кнопка откр. мод. окна редактирования Аватарки
    editProfileInfoBtn: ".profile__name-edit",   // кнопка откр. мод. окна редактирования фио и профессии
    buttonOpenPopupCard: ".profile__add-button", // кнопка открытия мод. окна добавления карточки  
};

/* селекторы профайла */
export const profileSelector = {
   profileName: ".profile__name-text", // фио профайла
   profileAbout: ".profile__bio",      // профессия
}; 

/* модальные окна */ 
export const popupModals = {
   popupProfile: ".popup__profile",           // попап ред. профала
   popupAddCard: ".popup__img",               // попап добавления нового места
   popupOpenImg: ".popup__img-opened",        // попап открытия изображения картинки
   popupConfirmDel: ".popup__delete-confirm", // попап подтверждение удаления карточки
   popupAvatarEdit: ".popup__avatar-edit",    // попап изменение изо аватарки
};

/* 1. форма смены Аватарки*/
export const avatEditForm = {
  form: ".popup__form-avatar",                      // форма изменения Автарки
  avatarInput: ".popup__input_data_avatarUrl",      // поле ввода url ссылки на аватарку
  popupAvatarSaveBtn: ".popup__avatar-save-button", // кнопка отправить Аватарку 
};

/* 2. форма смены Профайла */ 
export const formProfile = {
  form: ".popup__form-profile",                      // форма профайла 
  nameInput: ".popup__input_data_name",              // поле ввода имени
  jobInput: ".popup__input_data_about",              // поле ввода профессии
  formProfileSaveBtn: ".popup__profile-save-button", // кнопка отправить данные профайла
};

/* 3. форма добавления новой карточки */
export const formMesto = {
    form: ".popup__form-cards",                        // форма
    imgLinkInput: ".popup__input_data_imgUrl",         // поле ввода url ссылки на кртинку
    imgNameInput: ".popup__input_data_imgName",        // поле ввода названия картинки
    profileAddCardSaveBtn: ".popup__card-save-button", //кнопка отправить данные карточки
};  

/* 4. открытие картинки */ 
export const openImgCard = {
    imageContainer: ".image__container",
    imageOpened: ".image__opened",
    imageOpenedTitle: ".image__opened-title",
};

/* 5. форма удаления карточки */ 
export const formDelete = {
    form: ".popup__form-delete",
    confirmBtn: ".popup__delete-confirm-button",
};

/* селекторы открытия-закрытия модальных окон */
export const selectorModal = {
  openModal: ".popup_opened",   // селектор добавляемый при открытии мод. окна    
  closeBtns: ".popup__close-button", // крестик  - закрытие модальных окон
};

/* селектора валидации форм */ 
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input-type-error",
  errorClass: "popup__input-error_active",
};