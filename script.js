const profileEdit = document.querySelector(".profile__name-edit");
const popupForm = document.querySelector(".popup");
const popupCloseBtn = document.querySelector(".popup__close-button");
const formProfileSaveBtn = document.querySelector(".popup__profile-save-button");
const nameInput = document.querySelector(".popup__input_data_name");
const jobInput = document.querySelector(".popup__input_data_about");
const profileName = document.querySelector(".profile__name-text");
const profileAbout = document.querySelector(".profile__bio");
const addImgForm = document.querySelector(".profile__add-button");
const formTitle = document.querySelector(".popup__title");
const imgAddForm = document.querySelector('.popup__img');
const newCardAdd = document.querySelector('.popup__card-save-button');
const imgLinkInput = imgAddForm.querySelector(".popup__input_data_imgUrl");
const imgNameInput = imgAddForm.querySelector(".popup__input_data_imgName");



profileEdit.addEventListener("click", profileAdded);

formProfileSaveBtn.addEventListener('click', formSubmitHandler);

popupCloseBtn.addEventListener('click', hiddenClick);


function showClick() {
    popupForm.classList.add("popup_opened"); //открытие попапа
};

function profileAdded() {
    //попап редактирования профиля
    showClick();
    nameInput.placeholder = profileName.textContent;
    jobInput.placeholder = profileAbout.textContent; 
};


function hiddenClick() {
    imgAddForm.classList.remove("popup_opened"); //закрытие по close-btn
};



function formSubmitHandler(evt) {  //добавление информации о себе
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    hiddenClick();
};


addImgForm.addEventListener("click", addedImg);

function showClickImg() {
    imgAddForm.classList.add("popup_opened"); //открытие попапа
};


function addedImg() {
    //попап добавления карточки
    showClickImg();
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



    //переменныее галлереи
const galleryItem = document.querySelector('.gallery__grid-item');
const galleryList = document.querySelector('.gallery__grid');
const galleryTemplate = document.querySelector('.gallery__template').content;




//перебор массива
initialCards.forEach(function (item) {
    createNewCard(item.name, item.link);  
});

//создание новой карточки
function createNewCard(cardName, cardLink) {
    const cards = galleryTemplate.querySelector('.gallery__grid-item').cloneNode(true);
    cards.querySelector('.gallery__grid-image').src = cardLink;
   cards.querySelector('.gallery__grid-name').textContent = cardName;
   cards.querySelector('.gallery__grid-image').alt = cardName;
   galleryList.prepend(cards);
   const delItem = document.querySelector('.gallery__delete-img-button');
   delItem.addEventListener ('click', () => {
   const listItem = delItem.closest('.gallery__grid-item');
 listItem.remove();
 //let likeBtn = cards.querySelectorAll(".gallery__grid-like");
// likeBtn.addEventListener('click', () => {
//    likeBtn.classList.add('gallery__grid-like_active');
// });
 
 });
};









//добавление новой картинки в карточку
  function addNewCard(evt) {
    evt.preventDefault();
    createNewCard(imgNameInput.value, imgLinkInput.value);    
  };
  
  imgAddForm.addEventListener('submit', addNewCard);

