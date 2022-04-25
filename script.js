const profileEdit = document.querySelector(".profile__name-edit");
const popupForm = document.querySelector(".popup");
const popupCloseBtn = document.querySelector(".popup__close-button");
const formElement = document.querySelector(".popup__save-button");
const nameInput = document.querySelector(".popup__input_data_name");
const jobInput = document.querySelector(".popup__input_data_about");
const profileName = document.querySelector(".profile__name-text");
const profileAbout = document.querySelector(".profile__bio");
const addImgForm = document.querySelector(".profile__add-button");
let formTitle = document.querySelector(".popup__title");
let likeBtn = document.querySelectorAll(".gallery__grid-like");

function showClick() {
    popupForm.classList.add("popup_opened"); //открытие попапа
}

function hiddenClick() {
    popupForm.classList.remove("popup_opened"); //закрытие по close-btn
}

popupCloseBtn.addEventListener("click", hiddenClick);

function profileAdded() {
    //попап редактирования профиля
    showClick();
    formTitle.textContent = "Редактировать профиль";
    formElement.textContent = "Сохранить";
    nameInput.placeholder = profileName.textContent;
    jobInput.placeholder = profileAbout.textContent;
  

 
}

profileEdit.addEventListener("click", profileAdded);

function formSubmitHandler (evt) {  //добавление информации о себе
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    hiddenClick();

}

formElement.addEventListener('click', formSubmitHandler);


addImgForm.addEventListener("click", addedImg);

function addedImg() {
    //попап добавления карточки
    showClick();
    formTitle.textContent = "Новое место";
    formElement.textContent = "Создать";
    nameInput.placeholder = "Название";
    jobInput.placeholder = "Ссылка на картинку";
}



const initialCards = [
    {
      name: 'Стокгольм',
      link: 'https://images.unsplash.com/photo-1630772063386-f363836989cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
    },
    {
      name: 'Хельсинки',
      link: 'https://images.unsplash.com/photo-1588362993329-325f0ebc7150?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80'
    },
    {
      name: 'Санкт-Петербург',
      link: 'https://images.unsplash.com/photo-1551709076-89f2499d383b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    {
      name: 'Стамбул',
      link: 'https://images.unsplash.com/photo-1622587853578-dd1bf9608d26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
    },
    {
      name: 'Осло',
      link: 'https://images.unsplash.com/photo-1575624290661-87b16b3d971b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
    },
    {
      name: 'Рига',
      link: 'https://images.unsplash.com/photo-1566297558982-b511b3690b94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    }
    ];