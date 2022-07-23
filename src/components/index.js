import "../pages/index.css";
import { openPopup, closePopup } from "./modal";
import { galleryList, openImgPreview, cardData, renderCard} from "./card";
import { clearValidity, enableValidation } from "./validate";
import { loadProfileData, avatarEdit, editProfileData, pullCard, apiConfig, loadCards } from "./api";

const userProfile = {
    name: "",
    about: "",
    avatar: "",
    _id: "",
};

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


export { validationConfig, popupAddCard, userProfile };
