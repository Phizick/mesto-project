import "../pages/index.css";

import Api from "../components/Api";
import FormValidator from "../components/FormValidator";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Userinfo from "../components/Userinfo";
import Card from "../components/Card";
import * as constants from "../utils/constants";
import Section from "../components/Section";
import PopupWithDelete from "../components/PopupWithDelete";
import ButtonWithEdit from "../components/ButtonWithEdit";
import { errorHandler, handleCardLikeClick } from "../utils/units";

export const getApi = new Api(constants);
const userProfileApi = getApi.loadUserProfileData();
const cardsGalleryApi = getApi.loadCardsData();
export const userProfileInfo = new Userinfo(constants.profileSelectors);
const formEditAvatar = new FormValidator(constants.validationConfig, constants.avatarEditForm);
const formEditProfile = new FormValidator(constants.validationConfig, constants.profileEditForm);
const formEditCard = new FormValidator(constants.validationConfig, constants.cardEditForm);

const allFormsGroup = [formEditAvatar, formEditProfile, formEditCard];
allFormsGroup.forEach((form) => form.enableValidation());

const popupOpenImgPreview = new PopupWithImage(constants.popupSelectors.popupOpenedImgSelector);
popupOpenImgPreview.setEventListeners();

Promise.all([userProfileApi, cardsGalleryApi])
    .then(([user, cards]) => {
        userProfileInfo.setUserInfo(user);
        userProfileInfo.setUserAvatar(user);
        cardContainer.renderDefaultItems(cards, user._id);
    })
    .catch((err) => errorHandler(err, 'default'));

const cardContainer = new Section(
    {
        renderer: (cardData, userId) => {
            const renderedCard = new Card(
                cardData,
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
            )            
            return renderedCard.createNewCard();
        },
    },
    constants.cardContainerSelector
)

const popupAvatarEdit = new PopupWithForm(
    constants.popupSelectors.popupAvatarEditSelector,
    (avatarData) =>
        getApi
            .userAvatarEdit(avatarData)
            .then((avatarData) => {
                userProfileInfo.setUserAvatar(avatarData);                
            })
            .catch((err) => errorHandler(err, constants.avatarEditForm))    
);

const popupProfileEdit = new PopupWithForm(
    constants.popupSelectors.popupProfileEditSelector,
    (profileData) =>
        getApi
            .editProfileData(profileData)
            .then((profileData) => {
                userProfileInfo.setUserInfo(profileData);                                            
            })
            .catch((err) => errorHandler(err, constants.profileEditForm)) 
);

const popupDeleteCardConfirm = new PopupWithDelete(constants.popupSelectors.popupDeleteConfirmSelector, 
    {
    submit: (cardId) => {
        getApi
            .deleteCard(cardId)
            .then(() => popupDeleteCardConfirm.delcard())                    
            .then(() => popupDeleteCardConfirm.close())            
            .catch((err) => errorHandler(err, 'default'));       
    },  
});
popupDeleteCardConfirm.setEventListeners();

const popupAddedNewCard = new PopupWithForm(
    constants.popupSelectors.popupAddCardSelector,
    (cardData) =>
        getApi
            .setNewCard(cardData)
            .then((cardData) => {               
                cardContainer.renderNewItem(cardData, cardData.owner._id);                
            })
            .catch((err) => errorHandler(err, constants.cardEditForm))  
);

const allAddContentPopupsGroup = [popupAvatarEdit, popupAddedNewCard, popupProfileEdit];
allAddContentPopupsGroup.forEach((popup) => popup.setPopupEventListeners());

const profileBtnEdit = new ButtonWithEdit(constants.profileNameEditBtn, popupProfileEdit, formEditProfile);
const avatarBtnEdit = new ButtonWithEdit(constants.userAvatarEditBtn, popupAvatarEdit, formEditAvatar);
const cardBtnEdit = new ButtonWithEdit(constants.galleryAddCardBtn, popupAddedNewCard, formEditCard);

const allEditBtnsGroup = [ profileBtnEdit, avatarBtnEdit, cardBtnEdit];
allEditBtnsGroup.forEach((btn) => btn.setBtnEventListeners());



