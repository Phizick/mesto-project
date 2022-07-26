export const profileForm = document.querySelector('.popup__form-profile');
export const cardForm = document.querySelector('.popup__form-cards');
export const avatarForm = document.querySelector('.popup__form-avatar');

export const templateSelector = '#gallery__template';
export const containerSelector = '.cards';



export const btn1 = document.querySelector('.profile__name-edit');
export const btn2 = document.querySelector('.profile__avatar-edit-btn');
export const btn3 = document.querySelector('.profile__add-button');


export const links = {
    profile: '/users/me',
    avatar: '/users/me/avatar',
    cards: '/cards',
    cardLike: '/cards/likes/',
    cardDelete: '/cards/'
};

export const ProfileSelectors = {
    profileName: ".profile__name-text", 
    profileAbout: ".profile__bio",      
    profileAvatar: '.profile__avatar-image'
 };

export const popupSelectors = {
    popupProfile: '.popup__profile',
    popupAvatar: '.popup__avatar-edit',
    popupAddCard: '.popup__img',
    popupImg: '.popup__img-opened',
    popupDelete: '.popup__delete-confirm'
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

  