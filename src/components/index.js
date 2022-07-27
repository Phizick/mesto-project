import "../pages/index.css";

import Api from "./Api";
import FormValidator from "./FormValidator";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";
import Userinfo from "./Userinfo";
import Card from "./Card";
import * as constant from "../utils/constants";
import Section from "./Section";
import PopupWithDelete from "./PopupWithDelete";

const getApi = new Api(constant);
const userProfileApi = getApi.loadUserProfileData();
const cardsGalleryApi = getApi.loadCardsData();
const userProfileInfo = new Userinfo(constant.ProfileSelectors);
const formEditAvatar = new FormValidator(constant.validationConfig, constant.avatarEditForm);
const formEditProfile = new FormValidator(constant.validationConfig, constant.profileEditForm);
const formEditCard = new FormValidator(constant.validationConfig, constant.cardEditForm);
const allFormsGroup = [formEditAvatar, formEditProfile, formEditCard];
allFormsGroup.forEach(form => form.enableValidation());

Promise.all([userProfileApi, cardsGalleryApi])
    .then(([user, cards]) => {
        userProfileInfo.setUserInfo(user);
        userProfileInfo.setUserAvatar(user);
        newCard.renderDefaultItems(cards, user._id);
    })
    .catch((err) => {
        console.error(err);
    });


const popupAvatarEdit = new PopupWithForm(
    constant.popupSelectors.popupAvatarEditClass,
    {
        submit: (avatarData) => {
            popupAvatarEdit.setFormSubmitBtnContent("Сохранение...");
            getApi
                .userAvatarEdit(avatarData)
                .then((avatarData) => {
                    userProfileInfo.setUserAvatar(avatarData);
                    popupAvatarEdit.close();
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => {
                    popupAvatarEdit.setFormSubmitBtnContent("Сохранить");
                });
        },
    },
    {
        clearFormValidity: (formInput) => {
            resetFormValidation(formInput, formEditAvatar, constant.avatarEditForm);
        },
    }
);
popupAvatarEdit.setPopupEventListeners();

const popupProfileEdit = new PopupWithForm(
    constant.popupSelectors.popupProfileEditClass,
    {
        submit: (data) => {
            popupProfileEdit.setFormSubmitBtnContent("Сохранение...");
            getApi
                .editProfileData(data)
                .then((data) => {
                    userProfileInfo.setUserInfo(data);
                    popupProfileEdit.close();
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => {
                    popupProfileEdit.setFormSubmitBtnContent("Сохранить");
                });
        },
    },
    {
        clearFormValidity: (input) => {
            resetFormValidation(input, formEditProfile, constant.profileEditForm);
        },
    }
);
popupProfileEdit.setPopupEventListeners();

const popupDeleteCardConfirm = new PopupWithDelete(constant.popupSelectors.popupDeleteConfirmClass, {
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

const popupOpenImgPreview = new PopupWithImage(constant.popupSelectors.popupImg);
popupOpenImgPreview.setEventListeners();

const newCard = new Section(
    {
        renderer: (item, userId) => {
            const creatingCard = new Card(
                item,
                {
                    handleCardZoomClick: (name, link) => {
                        popupOpenImgPreview .open(name, link);
                    },
                },
                {
                    handleCardLikeClick: (card, id) => {
                        handleCardLikeClick(card, id, creatingCard);
                    },
                },
                {
                    openCardDeletingPopup: (id) => {
                        popupDeleteCardConfirm.open(id);
                    },
                },
                userId,
                constant.cardTemplateSelector
            );
            return creatingCard.createNewCard();
        },
    },
    constant.containerSelector
);

const popupAddedNewCard = new PopupWithForm(
    constant.popupSelectors.popupAddCardClass,
    {
        submit: (cardData) => {
            popupAddedNewCard.setFormSubmitBtnContent("Сохранение...");
            getApi
                .setNewCard(cardData)
                .then((cardData) => {
                    newCard.renderNewItem(cardData);
                    popupAddedNewCard.close();
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => {
                    popupAddedNewCard.setFormSubmitBtnContent("Сохранить");
                });
        },
    },
    {
        clearFormValidity: (formInput) => {
            resetFormValidation(formInput, formEditCard, constant.cardEditForm);
        },
    }
);
popupAddedNewCard.setPopupEventListeners();

const handleCardLikeClick = (card, id, creatingCard) => {
    if (card.dataset.like === 'liked') {
        getApi
            .cardLikeRemove(id)
            .then((res) => {
                creatingCard._removeCardLike(res);
            })
            .catch(err => {console.error(err)});
    } else {
        getApi
            .cardLikeAdd(id) 
            .then((res) => {
                creatingCard._addedCardLike(res)
            })
            .catch(err => {console.error(err)})
    }    
}

const resetFormValidation = (input, form, formSelector) => {
    const errorElement = formSelector.querySelector(`.${input.id}-error`);
    form.hideFormInputError(input, errorElement);
};

constant.profileNameEditBtn.addEventListener("click", () => {
    popupProfileEdit.open();
    popupProfileEdit.setFormInputValues(userProfileInfo.getUserInfo());
    formEditProfile.enableFormSubmitBtns();
});

constant.userAvatarEditBtn.addEventListener("click", () => {
    popupAvatarEdit.open();
    formEditAvatar.disableFormSubmitBtns();
});

constant.galleryAddCardBtn.addEventListener("click", () => {
    popupAddedNewCard.open();
    formEditCard.disableFormSubmitBtns();
});
