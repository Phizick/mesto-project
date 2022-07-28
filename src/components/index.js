import "../pages/index.css";

import Api from "./Api";
import FormValidator from "./FormValidator";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";
import Userinfo from "./Userinfo";
import Card from "./Card";
import * as constants from "../utils/constants";
import Section from "./Section";
import PopupWithDelete from "./PopupWithDelete";

const getApi = new Api(constants);
const userProfileApi = getApi.loadUserProfileData();
const cardsGalleryApi = getApi.loadCardsData();
const userProfileInfo = new Userinfo(constants.profileSelectors);
const formEditAvatar = new FormValidator(constants.validationConfig, constants.avatarEditForm);
const formEditProfile = new FormValidator(constants.validationConfig, constants.profileEditForm);
const formEditCard = new FormValidator(constants.validationConfig, constants.cardEditForm);
const allFormsGroup = [formEditAvatar, formEditProfile, formEditCard];
allFormsGroup.forEach((form) => form.enableValidation());

Promise.all([userProfileApi, cardsGalleryApi])
    .then(([user, cards]) => {
        userProfileInfo.setUserInfo(user);
        userProfileInfo.setUserAvatar(user);
        newCard.renderDefaultItems(cards, user._id);
    })
    .catch((err) => {
        console.error(err);
    });

const newCard = new Section(
    {
        renderer: (item, userId) => {
            const renderedCard = new Card(
                item,
                {
                    handleCardZoomClick: (name, link) => {
                        popupOpenImgPreview.open(name, link);
                    },
                },
                {
                    handleCardLikeClick: (card, id) => {
                        handleCardLikeClick(card, id, renderedCard);
                    },
                },
                {
                    openCardDeletingPopup: (id) => {
                        popupDeleteCardConfirm.open(id);
                    },
                },
                userId,
                constants.cardTemplateSelector
            );
            return renderedCard.createNewCard();
        },
    },
    constants.cardContainerSelector
);

const popupAvatarEdit = new PopupWithForm(
    constants.popupSelectors.popupAvatarEditSelector,
    (avatarData) =>
        getApi
            .userAvatarEdit(avatarData)
            .then((avatarData) => {
                userProfileInfo.setUserAvatar(avatarData);
            })
            .catch((err) => {
                console.error(err);
            }),
    {
        clearFormValidity: (formInput) => {
            resetFormValidation(formInput, formEditAvatar, constants.avatarEditForm);
        },
    }
);
popupAvatarEdit.setPopupEventListeners();

const popupProfileEdit = new PopupWithForm(
    constants.popupSelectors.popupProfileEditSelector,
    (data) =>
        getApi
            .editProfileData(data)
            .then((data) => {
                userProfileInfo.setUserInfo(data);
            })
            .catch((err) => {
                console.error(err);
            }),

    {
        clearFormValidity: (formInput) => {
            resetFormValidation(formInput, formEditProfile, constants.profileEditForm);
        },
    }
);
popupProfileEdit.setPopupEventListeners();

const popupDeleteCardConfirm = new PopupWithDelete(constants.popupSelectors.popupDeleteConfirmSelector, {
    submit: (id) => {
        getApi
            .deleteCard(id)
            .then(() => {
                document.querySelector(`.card[data-id="${id}"]`).remove();
                popupDeleteCardConfirm.close();
            })
            .catch((err) => {
                console.error(err);
            });
    },
});
popupDeleteCardConfirm.setEventListeners();

const popupOpenImgPreview = new PopupWithImage(constants.popupSelectors.popupOpenedImgSelector);
popupOpenImgPreview.setEventListeners();

const popupAddedNewCard = new PopupWithForm(
    constants.popupSelectors.popupAddCardSelector,
    (cardData) =>
        getApi
            .setNewCard(cardData)
            .then((cardData) => {
                newCard.renderNewItem(cardData);
            })
            .catch((err) => {
                console.error(err);
            }),

    {
        clearFormValidity: (formInput) => {
            resetFormValidation(formInput, formEditCard, constants.cardEditForm);
        },
    }
);
popupAddedNewCard.setPopupEventListeners();

const handleCardLikeClick = (card, id, creatingCard) => {
    if (card.dataset.like === "liked") {
        getApi
            .cardLikeRemove(id)
            .then((res) => {
                creatingCard._removeCardLike(res);
            })
            .catch((err) => {
                console.error(err);
            });
    } else {
        getApi
            .cardLikeAdd(id)
            .then((res) => {
                creatingCard._addedCardLike(res);
            })
            .catch((err) => {
                console.error(err);
            });
    }
};

const resetFormValidation = (input, form, formSelector) => {
    const errorElement = formSelector.querySelector(`.${input.id}-error`);
    form.hideFormInputError(input, errorElement);
};

constants.profileNameEditBtn.addEventListener("click", () => {
    popupProfileEdit.open();
    popupProfileEdit.setFormInputValues(userProfileInfo.getUserInfo());
    formEditProfile.enableFormSubmitBtns();
});

constants.userAvatarEditBtn.addEventListener("click", () => {
    popupAvatarEdit.open();
    formEditAvatar.disableFormSubmitBtns();
});

constants.galleryAddCardBtn.addEventListener("click", () => {
    popupAddedNewCard.open();
    formEditCard.disableFormSubmitBtns();
});
