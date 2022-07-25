import "../pages/index.css";

import Api from "./Api";
import FormValidator from "./FormValidator";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./popupWithImage";
import Userinfo from "./Userinfo";
import Card from "./card";
import * as constant from "../utils/constants";
import Section from "./Section";
import PopupForDel from "./PopupForDel";


const getApi = new Api(constant);
const userApi = getApi.loadProfileData();
const cardsApi = getApi.loadCards();
const profileInfo = new Userinfo(constant.ProfileSelectors);


const formAvatar = new FormValidator(constant.validationConfig, constant.avatarForm);
const formProfile = new FormValidator(constant.validationConfig, constant.profileForm);
const formCard = new FormValidator(constant.validationConfig, constant.cardForm);
const allForms = [formAvatar, formProfile, formCard];
allForms.forEach(item => item.enableValidation());

const handleLikeClick = (card, id, creatingCard) => {
    if (card.dataset.like) {
        getApi.likeCardRemove(id)
            .then((res) => {
                creatingCard._removeLike(res);
            })
            .catch(err => {console.log(err)});
    } else {
        getApi.likeCardAdd(id) 
            .then((res) => {
                creatingCard._addedLike(res)
            })
            .catch(err => {console.log(err)})
    }
}
// редактирование аватарки
const popupAvatar = new PopupWithForm(
    constant.popupSelectors.popupAvatar,
    {
        submit: (data) => {
            popupAvatar.setBtnContent('Сохранение...');
            getApi
                .avatarEdit(data)                
                .then((data) => {
                    profileInfo.setUserAvatar(data);
                    popupAvatar.close();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    popupAvatar.setBtnContent('Сохранить');
                });
        },
    },
    {
        clearValidity: (input) => {
            resetValidation(input, formAvatar, constant.avatarForm);
        },
    }
);
popupAvatar.setEventListeners();
// редактирование профайла
const popupProfile = new PopupWithForm(
    constant.popupSelectors.popupProfile,
    {
        submit: (data) => {
            popupProfile.setBtnContent('Сохранение...');
            getApi
                .editProfileData(data)
                .then((data) => {
                    profileInfo.setUserInfo(data);
                    popupProfile.close();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    popupProfile.setBtnContent('Сохранить');
                });
        },
    },
    {
        clearValidity: (input) => {
            resetValidation(input, formProfile, constant.profileForm);
        },
    }
);
popupProfile.setEventListeners();

// 
const addedCardPopup = new PopupWithForm(
    constant.popupSelectors.popupAddCard,
    {
        submit: (data) => {
            addedCardPopup.setBtnContent('Сохранение...');
            getApi            
                .pushCard(data)
                .then((data) => {
                    newCard.renderItem(data, data.owner._id);
                    addedCardPopup.close();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    addedCardPopup.setBtnContent('Сохранить');
                });
        },
    },
    {
        clearValidity: (input) => {
            resetValidation(input, formCard, constant.cardForm);
        },
    }
);
addedCardPopup.setEventListeners();

const popupDelCard = new PopupForDel(constant.popupSelectors.popupDelete, {
    submit: (id) => {        
        getApi.deleteCard(id)        
            .then(() => {
                document.querySelector(`.card[data-id="${id}"]`).remove();
                popupDelCard.close()
            })
            .catch(err => {console.log(err)})
    }
})
popupDelCard.setEventListeners();

const popupWithImage = new PopupWithImage(constant.popupSelectors.popupImg);
popupWithImage.setEventListeners();

const newCard = new Section({
    renderer: (item, userId) => {
        const creatingCard = new Card(item, {
            handleCardClick: (name, link) => {popupWithImage.open(name, link)},
        }, {
            handleLikeClick: (card, id) => {handleLikeClick(card, id, creatingCard)},
        }, {
            openDelPopup: (id) => {popupDelCard.open(id)}
        }, userId, constant.templateSelector);
        return creatingCard.createNewCard();
        }
    }, constant.containerSelector);

const resetValidation = (input, formAbout, form) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    formAbout.hideInputError(input, errorElement);
};

constant.btn1.addEventListener('click', () => {
    popupProfile.open();
    popupProfile.setInputValues(profileInfo.getUserInfo());
    formProfile.enableBtns();
});

constant.btn2.addEventListener('click', () => {
    popupAvatar.open();
    formAvatar.disablebtns();
})

constant.btn3.addEventListener('click', () => {
    addedCardPopup.open();
    formCard.disablebtns();
})

Promise.all([userApi, cardsApi])
    .then(([user, cards]) => {
        profileInfo.setUserInfo(user);
        profileInfo.setUserAvatar(user);
        newCard.renderItems(cards, user._id);
    })
    .catch((err) => {
        console.log(err);
    });

