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
const newCard = new Card(); // новая карточка 

const formAvatar = new FormValidator(constant.validationConfig, constant.formAvatar);
const formProfile = new FormValidator(constant.validationConfig, constant.formProfile);
const formCard = new FormValidator(constant.validationConfig, constant.formCard);



// редактирование аватарки(мои ляпы)
const popupAvatar = new PopupWithForm(constant.poupup.popupAvatarEdit,{
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
    {clearValidity: try to code this: resetValid}
});  

// редактирование профайла(вместе...)
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




// добавление новой карточки(мои ляпы..) 
const popupMesto = new PopupWithForm(constant.popup.popupAddCard,{
    submit: (data) => {
        popupMesto.textContent = "Сохранение...";
        getApi.pushCard(data)
            .then((data) => {
                newCard.createNewCard(data);
                popupMesto.close();
            })
            .catch((err) => { console.log(err); })
            .finally(() => {
                popupMesto.textContent = "Сохранить";
            });}

},
{
  clearValidity: try to code this: resetValid} 
});