"use strict";

//объявляем переменные
const profileEdit = document.querySelector(".profile__name-edit");//кнопка редактирования профиля
const popupForm = document.querySelector(".popup");//окно-подложка для попапов
const formProfileSaveBtn = document.querySelector(".popup__profile-save-button");//сабмит профайла
const nameInput = document.querySelector(".popup__input_data_name");//поле ввода имени профайла
const jobInput = document.querySelector(".popup__input_data_about");//поле ввода инф профайла
const profileName = document.querySelector(".profile__name-text");//заголовок профайла
const profileAbout = document.querySelector(".profile__bio");//инф профайла
const addImgForm = document.querySelector(".profile__add-button");//кнопка добавления карточки
const formTitle = document.querySelector(".popup__title");//заголовок формы попапа
const imgAddForm = document.querySelector(".popup__img");//форма добавления карточки
const newCardAdd = document.querySelector(".popup__card-save-button");//сабмит формы добавления карточки
const imgLinkInput = imgAddForm.querySelector(".popup__input_data_imgUrl");//поле ввода ссылки на картинку в форме добавления карточки
const imgNameInput = imgAddForm.querySelector(".popup__input_data_imgName");//поле ввода имени картинки в форме добавления карточки
const closeBtns = document.querySelectorAll(".popup__close-button");//кнопка закрытия модальных окон
const galleryItem = document.querySelector(".gallery__grid-item");//контейнер-карточка
const galleryList = document.querySelector(".gallery__grid");//список карточек
const galleryTemplate = document.querySelector(".gallery__template").content;//шаблон для добавления карточек в разметку
const openedImg = document.querySelector(".popup__img-opened");//попап карточки в полный размер картинки


//массив с карточками
const initialCards = [
    {
        name: "Стокгольм",
        link: "https://images.unsplash.com/photo-1630772063386-f363836989cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    },
    {
        name: "Хельсинки",
        link: "https://images.unsplash.com/photo-1588362993329-325f0ebc7150?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80",
    },
    {
        name: "Санкт-Петербург",
        link: "https://images.unsplash.com/photo-1551709076-89f2499d383b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
        name: "Стамбул",
        link: "https://images.unsplash.com/photo-1622587853578-dd1bf9608d26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    },
    {
        name: "Осло",
        link: "https://images.unsplash.com/photo-1575624290661-87b16b3d971b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    },
    {
        name: "Рига",
        link: "https://images.unsplash.com/photo-1566297558982-b511b3690b94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
];

//открытие попапа
function showClick() {
    popupForm.classList.add("popup_opened");
};

//закрытие попапов
function hiddenClick() {
    popupForm.classList.remove("popup_opened");
    imgAddForm.classList.remove("popup_opened");
    openedImg.classList.remove("popup_opened");
};

//попап редактирования профиля
profileEdit.addEventListener("click", () => {
    showClick();
    nameInput.placeholder = profileName.textContent;
    jobInput.placeholder = profileAbout.textContent;
});

//попап добавления карточки
addImgForm.addEventListener("click", () => {
    imgAddForm.classList.add("popup_opened");
    nameInput.placeholder = "Название";
    jobInput.placeholder = "Ссылка на картинку";
});

//добавление информации о себе
formProfileSaveBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    hiddenClick();
});

//перебор всех кнопок с закрытием модальных окон
closeBtns.forEach((button) => {
    button.addEventListener("click", hiddenClick);
});

//перебор массива
initialCards.forEach((item) => {
    createNewCard(item.name, item.link);
});

//создание новой карточки
function createNewCard(cardName, cardLink) {
    //создание контейнера под карточку и определение его значений
    const cards = galleryTemplate.querySelector(".gallery__grid-item").cloneNode(true);
    cards.querySelector(".gallery__grid-image").src = cardLink;
    cards.querySelector(".gallery__grid-name").textContent = cardName;
    cards.querySelector(".gallery__grid-image").alt = cardName;
    galleryList.prepend(cards);    
    //удаление карточки
    const delItem = document.querySelector(".gallery__delete-img-button");
    delItem.addEventListener("click", () => {
        const listItem = delItem.closest(".gallery__grid-item");
        listItem.remove();
        return cards;
    });
    //лайк карточки
    const likebtn = cards.querySelector(".gallery__grid-like");
    likebtn.addEventListener("click", () => {
        likebtn.classList.toggle("gallery__grid-like_active");
    });
    //открытие карточки в полном размере изображения
    const imageContainer = document.querySelector(".image__container");
    const image = cards.querySelector(".gallery__grid-image");
    image.addEventListener("click", () => {
        imageContainer.querySelector(".image__opened").src = image.src;
        imageContainer.querySelector(".image__opened-title").textContent = image.alt;
        openedImg.classList.add("popup_opened");
    });
};

//добавление новой карточки
imgAddForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    createNewCard(imgNameInput.value, imgLinkInput.value);
    hiddenClick();
    //обнуление значений полей ввода
    imgNameInput.value = "";
    imgLinkInput.value = "";
});
