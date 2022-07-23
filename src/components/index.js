import '../pages/index.css';

import Api from './Api';
import FormValidator from './FormValidator';
import Popup from './popup';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './popupWithImage';
import Userinfo from './Userinfo'


// Promise.all([profileApi, cardsApi])
//     .then(([user, card]) => {
//         profile.setUserInfo(user);
//         profile.setUserAvatar(user);
     
//         })      
    
//     .catch(err => {console.log(err)})







const apiConfig = {
    serverUrl: "https://nomoreparties.co/v1/plus-cohort-12",
    headers: {
        authorization: "c1b9d872-823e-43ab-9724-10a589fee2c1",
        "Content-Type": "application/json",
    },
    userId: "7a744b5fd03159f0028e76c6",
    likes: "",
    _id: "",
};