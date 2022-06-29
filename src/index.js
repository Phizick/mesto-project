import './pages/index.css' ;
import { openPopup, closePopup } from "./components/modal.js";
import { renderData, galleryList, openImgPreview, renderCard } from './components/card.js';
import { clearValidity, enableValidation } from './components/validate.js';
import { pullCard, cardData } from './components/card.js';
import { apiConfig } from './components/card.js';
// import { avatarEdit } from './components/card.js';



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
const profileAvatar = document.querySelector('.profile__avatar-image');
const popupAvatarEdit = document.querySelector('.popup__avatar-edit');
const popupAvatarEditBtn = document.querySelector('.profile__avatar-edit-btn');
const popupAvatarSaveBtn = document.querySelector('.popup__avatar-save-button');
const avatarInput = popupAvatarEdit.querySelector('.popup__input_data_avatarUrl');
const avatEditForm = document.querySelector('.popup__form-avatar');


const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",    
    inactiveButtonClass: "popup__save-button_disabled",
    inputErrorClass: "popup__input-type-error",
    errorClass: "popup__input-error_active"    
};

popupAvatarEditBtn.addEventListener('click', () => {
    openPopup(popupAvatarEdit)
})




profileEdit.addEventListener("click", () => {
    openPopup(popupProfile);
    clearValidity(popupProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
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

avatEditForm.addEventListener('submit', evt => {
    evt.preventDefault();
    closePopup(popupAvatarEdit);
    const avatar = avatarInput.value    
    avatarEdit(avatar)    
    .then((avatar) => {        
        profileAvatar.src = avatar
    })
    .catch(err => {console.log(err)})
})

formProfileSaveBtn.addEventListener("submit", evt => {
    evt.preventDefault();    
    closePopup(popupProfile);
    userProfile.name = nameInput.value;
    userProfile.about = jobInput.value;    
    editProfileData(userProfile)
    .then((userProfile) => {
    profileName.textContent = userProfile.name;
    profileAbout.textContent = userProfile.about;
           
    })
    .catch(err => {console.log(err)})
});

popupAddCard.addEventListener("submit", evt => {
    evt.preventDefault();
    renderData(imgNameInput.value, imgLinkInput.value, apiConfig.userId, apiConfig._id, apiConfig.likes);    
    closePopup(popupAddCard); 
    cardData.name = imgNameInput.value
    cardData.link = imgLinkInput.value
    cardData.owner._id = apiConfig.userId    
    pullCard(cardData)
    .then( (cardData) => {
        renderCard(cardData);
    })
    .catch(err => { console.log(err)})
    
});

galleryList.addEventListener('click', evt => openImgPreview(evt))

enableValidation();

export { validationConfig, popupAddCard, userProfile};

let userProfile = {
    name: '',
    about: '',
    avatar: '',
    _id: ''
}

const editProfileData = async (userProfile) => {
    let res = await fetch(`${apiConfig.serverUrl}/users/me`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify(userProfile)
    })
    if (res.status === 200) {        
        return await res.json()        
    }
    throw new Error(res.status)    
};

const avatarEdit = async (avatar) => {
    let res = await fetch(`${apiConfig.serverUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
            avatar: avatar
        }),    
    })
    if (res.status === 200) {
        return await res.json();
    } 
    throw new Error(res.status)
};


const loadProfileData = async () => {
    let res = await fetch(`${apiConfig.serverUrl}/users/me`, {        
        headers: apiConfig.headers,        
    })
    if (res.status === 200) {        
        return await res.json()        
    }
    throw new Error(res.status)    
};


loadProfileData()
.then((userProfile) => {
    profileName.textContent = userProfile.name;
    profileAbout.textContent = userProfile.about;
    profileAvatar.src = userProfile.avatar
})
.catch(err => {console.log(err)})





