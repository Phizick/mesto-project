import '../pages/index.css';

import Api from './Api';
import FormValidator from './FormValidator';
import Popup from './popup';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './popupWithImage';
import Userinfo from './Userinfo'
import Card from './card'
import * as constant from '../utils/constants.js'; 

Promise.all([userApi, cardsApi])
    .then(([user, cards]) => {
        Userinfo.setUserInfo(user);
        Userinfo.setUserAvatar(user); 
        // сдесь будут отрисованы карточки

    })
    .catch(err => {console.log(err)});

const getApi = new Api(constant);
const userApi = getApi.getUser();
const cardsApi = getApi.getCards();
const profileInfo = new Userinfo();
const formAvatar = new FormValidator(constant.validationConfig, constant.formAvatar);
const formProfile = new FormValidator(constant.validationConfig, constant.formProfile);
const formCard = new FormValidator(constant.validationConfig, constant.formCard);

const popupProfile = new PopupWithForm(constant.popup.profile, {
    submit: (data) => {
        popupProfile.textContent = "Сохранение...";
        getApi.editProfileData(data)
            .then((data) => {
                profileInfo.setUserInfo(data);
                popupProfile.close();
            })
            .catch((err) => { console.log(err) })
            .finally(() => {
                popupProfile.textContent = "Сохранить";
            });}
    }, 
    {clearValidity: resetValid});







   




