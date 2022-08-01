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
import Buttons from "./Buttons";

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
            })    
);
popupAvatarEdit.setPopupEventListeners();

const popupProfileEdit = new PopupWithForm(
    constants.popupSelectors.popupProfileEditSelector,
    (profileData) =>
        getApi
            .editProfileData(profileData)
            .then((profileData) => {
                userProfileInfo.setUserInfo(profileData);
            })
            .catch((err) => {
                console.error(err);
            }) 
);
popupProfileEdit.setPopupEventListeners();

const popupDeleteCardConfirm = new PopupWithDelete(constants.popupSelectors.popupDeleteConfirmSelector, 
    {
    submit: (cardId) => {
        getApi
            .deleteCard(cardId)
            .then(() => {
                document.querySelector(`.card[data-id="${cardId}"]`).remove();                
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
            })  
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

const profileBTnEdit = new Buttons(constants.profileNameEditBtn, popupProfileEdit, formEditProfile)
profileBTnEdit._setBtnEventListeners();

const avatarBtnEdit = new Buttons(constants.userAvatarEditBtn, popupAvatarEdit, formEditAvatar);
avatarBtnEdit._setBtnEventListeners()

const cardBtnEdit = new Buttons(constants.galleryAddCardBtn, popupAddedNewCard, formEditCard);
cardBtnEdit._setBtnEventListeners()

// constants.profileNameEditBtn.addEventListener("click", () => {
//     popupProfileEdit.open();
//     popupProfileEdit.setFormInputValues(userProfileInfo.getUserInfo());
//     formEditProfile.resetValidation();
// });

// constants.userAvatarEditBtn.addEventListener("click", () => {
//     popupAvatarEdit.open();
//     formEditAvatar.resetValidation();
// });

// constants.galleryAddCardBtn.addEventListener("click", () => {
//     popupAddedNewCard.open();
//     formEditCard.resetValidation();
// });
