import '../pages/index.css';

import Api from './Api';
import FormValidator from './FormValidator';
import Popup from './popup';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './popupWithImage';
import Userinfo from './Userinfo'
import Card from './card'
import * as constant from '../utils/constants';
import Section from './Section';
import PopupForDel from './PopupForDel';
import { clearValidity } from './validate';


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
const newCard = new Card(); // новая карточка 

const formAvatar = new FormValidator(constant.validationConfig, constant.avatarForm);
const formProfile = new FormValidator(constant.validationConfig, constant.profileForm);
const formCard = new FormValidator(constant.validationConfig, constant.cardForm);



// редактирование аватарки(мои ляпы)
const popupAvatar = new PopupWithForm(constant.popupSelectors.popupAvatar,{
   submit: (data) => {
        popupAvatar.textContent = "Сохранение...";
        getApi.avatarEdit(data)
            .then((data) => {
                profileInfo.setUserAvatar(data);
                popupAvatar.close();
            })
            .catch((err) => { console.log(err); })
            .finally(() => {
                popupAvatar.textContent = "Сохранить";
            });}
},
{
    clearValidity: (input) => {
      resetValidation(input, constant.avatarForm, constant.popupSelectors.popupAvatar)
    }}); 

// редактирование профайла(вместе...)
const popupProfile = new PopupWithForm(constant.popupSelectors.popupProfile, {
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
    {
        clearValidity: (input) => {
          resetValidation(input, constant.profileForm, constant.popupSelectors.popupProfile)
        }});



// добавление новой карточки(мои ляпы..) 
const popupMesto = new PopupWithForm(constant.popupSelectors.popupAddCard,{
    submit: (data) => {
        popupMesto.textContent = "Сохранение...";
        getApi.pushCard(data)
            .then((data) => {
                newCard.createNewCard(data, data.owner._id);
                popupMesto.close();
            })
            .catch((err) => { console.log(err); })
            .finally(() => {
                popupMesto.textContent = "Сохранить";
            });}

},
{
  clearValidity: (input) => {
    resetValidation(input, constant.cardForm, constant.popupSelectors.popupAddCard)
  }});


const  resetValidation = ((input, formAbout, form) => {
    const errorElement = form._form.querySelector(`.${inputElement.id}-error`);
    formAbout.hideInputError(input, errorElement)
});