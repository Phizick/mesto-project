"use strict";

//объявляем переменные
const popupProfileForm = document.querySelector(".popup__form-profile");//форма профайла
const profileEdit = document.querySelector(".profile__name-edit"); //кнопка редактирования профиля
const popupProfile = document.querySelector(".popup__profile"); //попап профиля
const formProfileSaveBtn = document.querySelector(".popup__form-profile"); //сабмит профайла
const nameInput = popupProfileForm.querySelector(".popup__input_data_name"); //поле ввода имени профайла
const jobInput = popupProfileForm.querySelector(".popup__input_data_about"); //поле ввода инф профайла
const profileName = document.querySelector(".profile__name-text"); //заголовок профайла
const profileAbout = document.querySelector(".profile__bio"); //инф профайла
const buttonOpenPopupCard = document.querySelector(".profile__add-button"); //кнопка добавления карточки
const popupAddCard = document.querySelector(".popup__img"); //форма добавления карточки
const imgLinkInput = popupAddCard.querySelector(".popup__input_data_imgUrl"); //поле ввода ссылки на картинку в форме добавления карточки
const imgNameInput = popupAddCard.querySelector(".popup__input_data_imgName"); //поле ввода имени картинки в форме добавления карточки
const closeBtns = document.querySelectorAll(".popup__close-button"); //кнопка закрытия модальных окон
const galleryList = document.querySelector(".gallery__grid"); //список карточек
const galleryTemplate = document.querySelector(".gallery__template").content; //шаблон для добавления карточек в разметку
const popupOpenedImg = document.querySelector(".popup__img-opened"); //попап карточки в полный размер картинки


//открытие попапа
function openPopup(item) {
    item.classList.add("popup_opened");
};

//закрытие попапа
function closePopup(item) {
    item.classList.remove("popup_opened");
};

//попап редактирования профиля
profileEdit.addEventListener("click", () => {
    openPopup(popupProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
});

//попап добавления карточки
buttonOpenPopupCard.addEventListener("click", () => {
    openPopup(popupAddCard);
});

//добавление информации о себе
formProfileSaveBtn.addEventListener("submit", (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(popupProfile);
});

//перебор всех кнопок с закрытием модальных окон
closeBtns.forEach((button) => {
    button.addEventListener("click", () => {
        closePopup(button.closest(".popup"));
    });
});

//отрисовка карточки в контейнер
function renderCard(cardName, cardLink) {
    galleryList.prepend(createNewCard(cardName, cardLink));    
};

//перебор массива
initialCards.forEach((item) => {
    renderCard(item.name, item.link);
});

//создание новой карточки
function createNewCard(cardName, cardLink) {
    //создание контейнера под карточку и определение его значений
    const card = galleryTemplate.querySelector(".gallery__grid-item").cloneNode(true);
    const image = card.querySelector(".gallery__grid-image");
    image.src = cardLink;
    image.alt = cardName;
    card.querySelector(".gallery__grid-name").textContent = cardName;
    
    //удаление карточки
    const delItem = card.querySelector(".gallery__delete-img-button");
    delItem.addEventListener("click", () => {
        const listItem = delItem.closest(".gallery__grid-item");
        listItem.remove();
    });

    //лайк карточки
    const likebtn = card.querySelector(".gallery__grid-like");
    likebtn.addEventListener("click", () => {
        likebtn.classList.toggle("gallery__grid-like_active");
    }); 

    //открытие карточки в полном размере изображения
    const imageContainer = document.querySelector(".image__container");
    image.addEventListener("click", () => {
        const imageOpened = imageContainer.querySelector(".image__opened");
        imageOpened.src = image.src;
        imageOpened.alt = image.alt;
        imageContainer.querySelector(".image__opened-title").textContent = image.alt;
        openPopup(popupOpenedImg);
    });
    return card;
};

//добавление новой карточки
popupAddCard.addEventListener("submit", (evt) => {
    evt.preventDefault();
    renderCard(imgNameInput.value, imgLinkInput.value);
    closePopup(popupAddCard);
    //обнуление значений полей ввода
    imgNameInput.value = "";
    imgLinkInput.value = "";
});
