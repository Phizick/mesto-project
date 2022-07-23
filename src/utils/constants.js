export const profileForm = document.querySelector('.popup__form-profile');
export const cardForm = document.querySelector('.popup__form-cards');
export const avatarForm = document.querySelector('.popup__form-avatar');
export const cardsContainer = document.querySelector('.cards');
export const templateSelector = document.querySelector('.gallery__template');

export const cardData = {
    name: "",
    link: "",
    likes: "",
    owner: "",
    _id: "",
    createdAt: "",
    owner: {
        name: "",
        about: "",
        avatar: "",
        _id: "",
    },
};

export const userProfile = {
    name: "",
    about: "",
    avatar: "",
    _id: "",
};


const links = {
    profile: '/users/me',
    avatar: '/users/me/avatar',
    cards: '/cards',
    cardLike: '/cards/likes/',
    cardDelete: '/cards/'
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
      userId: "7a744b5fd03159f0028e76c6",
      likes: "",
      _id: "",
  };
