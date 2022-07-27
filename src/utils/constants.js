export const profileEditForm = document.querySelector('.popup__form-profile');
export const cardEditForm = document.querySelector('.popup__form-cards');
export const avatarEditForm = document.querySelector('.popup__form-avatar');

export const cardTemplateSelector = '#gallery__template';
export const containerSelector = '.cards';

export const profileNameEditBtn = document.querySelector('.profile__name-edit');
export const userAvatarEditBtn = document.querySelector('.profile__avatar-edit-btn');
export const galleryAddCardBtn = document.querySelector('.profile__add-button');


export const links = {
    profile: '/users/me',
    avatar: '/users/me/avatar',
    cards: '/cards',
    cardLike: '/cards/likes/',
    cardDelete: '/cards/'
};

export const ProfileSelectors = {
    profileUserName: ".profile__name-text", 
    profileUserAbout: ".profile__bio",      
    profileUserAvatar: '.profile__avatar-image'
 };

export const popupSelectors = {
    popupProfileEditClass: '.popup__profile',
    popupAvatarEditClass: '.popup__avatar-edit',
    popupAddCardClass: '.popup__img',
    popupImg: '.popup__img-opened',
    popupDeleteConfirmClass: '.popup__delete-confirm'
};

export const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_disabled",
    inputErrorClass: "popup__input-type-error",
    errorClass: "popup__input-error_active",
  };
  
export const apiConfig = {
      serverUrl: "https://nomoreparties.co/v1/plus-cohort-12",
      headers: {
          authorization: "c1b9d872-823e-43ab-9724-10a589fee2c1",
          "Content-Type": "application/json",
      },
    //   userId: "7a744b5fd03159f0028e76c6",
    //   likes: "",
    //   _id: "",
  };

  