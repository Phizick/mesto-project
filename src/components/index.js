import "../pages/index.css";
import { openPopup, closePopup } from "./modal";
import { galleryList, openImgPreview, cardData, renderCard} from "./card";
import { clearValidity, enableValidation } from "./validate";
import { loadProfileData, avatarEdit, editProfileData, pullCard, apiConfig, loadCards } from "./api";
import config from '../utils/config'


const userProfile = {
    name: "",
    about: "",
    avatar: "",
    _id: "",
};

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
const profileAvatar = document.querySelector(".profile__avatar-image");
const popupAvatarEdit = document.querySelector(".popup__avatar-edit");
const popupAvatarEditBtn = document.querySelector(".profile__avatar-edit-btn");
const popupAvatarSaveBtn = document.querySelector(".popup__avatar-save-button");
const avatarInput = popupAvatarEdit.querySelector(".popup__input_data_avatarUrl");
const avatEditForm = document.querySelector(".popup__form-avatar");
const profileSaveBtns = document.querySelector(".popup__profile-save-button");
const profileAddCardSaveBtn = document.querySelector(".popup__card-save-button");






Promise.all([loadProfileData(), loadCards()])
    .then(([user, card]) => {
        profileName.textContent = user.name;
        profileAbout.textContent = user.about;
        profileAvatar.src = user.avatar;      
        card.forEach((item) => {
            cardData.name = item.name;
            cardData.link = item.link;
            cardData.owner._id = item.owner._id;
            cardData._Id = item._id;
            cardData.likes = item.likes;
            renderCard(cardData);
        })      
    })
    .catch(err => {console.log(err)})


popupAvatarEditBtn.addEventListener("click", () => {
    openPopup(popupAvatarEdit);
});

profileEdit.addEventListener("click", () => {
    openPopup(popupProfile);
    clearValidity(popupProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
});

closeBtns.forEach((button) => {
    button.addEventListener("click", () => {
        closePopup(button.closest(".popup"));
    });
});

buttonOpenPopupCard.addEventListener("click", () => {
    openPopup(popupAddCard);
    clearValidity(popupAddCard);
});

avatEditForm.addEventListener("submit", (evt) => {
    evt.preventDefault();   
    popupAvatarSaveBtn.textContent = "Сохранение...";
    avatarEdit(avatarInput.value)
        .then((data) => {
            profileAvatar.src = data.avatar;
            closePopup(popupAvatarEdit);
            avatEditForm.reset()
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupAvatarSaveBtn.textContent = "Сохранить";           
        });
});

formProfileSaveBtn.addEventListener("submit", (evt) => {
    evt.preventDefault();    
    userProfile.name = nameInput.value;
    userProfile.about = jobInput.value;
    profileSaveBtns.textContent = "Сохранение...";
    editProfileData(userProfile)
        .then((userProfile) => {
            profileName.textContent = userProfile.name;
            profileAbout.textContent = userProfile.about;
            closePopup(popupProfile);            
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            profileSaveBtns.textContent = "Сохранить";
        });
});

popupAddCard.addEventListener("submit", (evt) => {
    evt.preventDefault();    
    cardData.name = imgNameInput.value;
    cardData.link = imgLinkInput.value;
    cardData.owner._id = apiConfig.userId;
    (cardData._Id = ""), (cardData.likes = ""), (profileAddCardSaveBtn.textContent = "Добавление...");
    pullCard(cardData)
        .then((cardData) => {
            renderCard(cardData);
            closePopup(popupAddCard);           
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            profileAddCardSaveBtn.textContent = "Добавить";
            location.reload()
        });
});

galleryList.addEventListener("click", (evt) => openImgPreview(evt));

enableValidation(validationConfig);


export {  popupAddCard, userProfile };
