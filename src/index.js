import './pages/index.css' ;
import { openPopup, closePopup } from "./components/modal.js";
import { renderData, galleryList, openImgPreview, renderCard } from './components/card.js';
import { clearValidity, enableValidation } from './components/validate.js';
import { pullCard, cardData } from './components/card.js';


const popupProfileForm = document.querySelector(".popup__form-profile");
const profileEdit = document.querySelector(".profile__name-edit");
const popupProfile = document.querySelector(".popup__profile");
const formProfileSaveBtn = document.querySelector(".popup__form-profile");
const nameInput = popupProfileForm.querySelector(".popup__input_data_name");
const jobInput = popupProfileForm.querySelector(".popup__input_data_about");
const profileName = document.querySelector(".profile__name-text");
const profileAbout = document.querySelector(".profile__bio");
const buttonOpenPopupCard = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup__img");
const closeBtns = document.querySelectorAll(".popup__close-button");
const imgLinkInput = popupAddCard.querySelector(".popup__input_data_imgUrl");
const imgNameInput = popupAddCard.querySelector(".popup__input_data_imgName");

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",    
    inactiveButtonClass: "popup__save-button_disabled",
    inputErrorClass: "popup__input-type-error",
    errorClass: "popup__input-error_active"    
};



profileEdit.addEventListener("click", () => {
    openPopup(popupProfile);
    clearValidity(popupProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
    // profileName.textContent = user.name;
    // profileAbout.textContent = user.about

    // let user = {
    //     name: '',
    //     about: ''
    // }
    
    // userUpdate(user)
});

closeBtns.forEach(button => {
    button.addEventListener("click", () => {
        closePopup(button.closest(".popup"));
    });
});

buttonOpenPopupCard.addEventListener("click", () => {
    openPopup(popupAddCard);
    clearValidity(popupAddCard);
});

formProfileSaveBtn.addEventListener("submit", evt => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(popupProfile);
  
    
});

popupAddCard.addEventListener("submit", evt => {
    evt.preventDefault();
    renderData(imgNameInput.value, imgLinkInput.value);    
    closePopup(popupAddCard); 
    cardData.name = imgNameInput.value
    cardData.link = imgLinkInput.value
    pullCard(cardData)
    .then( (cardData) => {
        renderCard(cardData);
    })
    .catch(err => { console.log(err)})
    // renderPull(imgNameInput.value, imgLinkInput.value);
});

galleryList.addEventListener('click', evt => openImgPreview(evt))

enableValidation();

export { validationConfig, popupAddCard };

let userProfile = {
    name: 'Denis Kraev',
    about: 'power ranger',
    avatar: ''
}

// fetch('https://mesto.nomoreparties.co/v1/plus-cohort-12/users/me', {
//     headers: {
//         authorization: 'c1b9d872-823e-43ab-9724-10a589fee2c1'
//     }
// })
// .then(res => res.json())
// .then(res => {
//     profileName.textContent = res.name;
//     profileAbout.textContent = res.about;
//     userProfile.avatar = res.avatar;
//     console.log(res)
// })







// fetch('https://mesto.nomoreparties.co/v1/plus-cohort-12/cards', {
//     headers: {
//         authorization: 'c1b9d872-823e-43ab-9724-10a589fee2c1'
//     }
// })
// .then(res => res.json())
// .then(res => console.log(res))

// fetch('https://nomoreparties.co/v1/plus-cohort-12/users/me', {
//     headers: {
//         authorization: 'c1b9d872-823e-43ab-9724-10a589fee2c1'
//     }
// })
// .then(res => res.json())
// .then(res => console.log(res))





fetch('https://nomoreparties.co/v1/plus-cohort-12/users/me', {
    method: 'PATCH',
    headers: {
        authorization: 'c1b9d872-823e-43ab-9724-10a589fee2c1',
        'Content-Type': 'application/json'
    },        
    body: JSON.stringify(userProfile)
})
.then(res => res.json())
.then(res => {
    profileName.textContent = res.name;
    profileAbout.textContent = res.about;
    userProfile.avatar = res.avatar;
    console.log(res)
})
.then(error => { console.log('error', error)})



