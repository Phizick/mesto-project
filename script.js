const profileEdit = document.querySelector('.profile__name-edit');
const popupForm = document.querySelector('.popup');
const popupCloseBtn = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__save-button');
const nameInput = document.querySelector('.popup__input_data_name');
const jobInput = document.querySelector('.popup__input_data_about');
let profileName = document.querySelector('.profile__name-text');
let profileAbout = document.querySelector('.profile__bio');
const addImgForm = document.querySelector('.profile__add-button')
let formTitle = document.querySelector('.popup__title');
let likeBtn = document.querySelector('.gallery__grid-like');



function showClick() {
  popupForm.classList.add('popup_opened');  //открытие попапа
}

function hiddenClick() {
    popupForm.classList.remove('popup_opened');  //закрытие по close-btn
  }
  
popupCloseBtn.addEventListener('click', hiddenClick); 

function profileAdded() { //попап редактирования профиля
    showClick();
    formTitle.textContent = 'Редактировать профиль';
  formElement.textContent = 'Сохранить';
  nameInput.placeholder = 'Ваше имя';
  jobInput.placeholder = 'Ваш род занятий';
}


profileEdit.addEventListener('click', profileAdded); 


function formSubmitHandler (evt) {  //обработчик данных в полях формы
    evt.preventDefault();
    profileName.textContent(nameInput.value);
    profileAbout.textContent(jobInput.value);
}

formElement.addEventListener('submit', formSubmitHandler);


addImgForm.addEventListener('click', addedImg);

function addedImg() { //попап добавления карточки
    showClick();
    formTitle.textContent = 'Новое место';
  formElement.textContent = 'Создать';
  nameInput.placeholder = 'Название';
  jobInput.placeholder = 'Ссылка на картинку';
}



function a () {
    likeBtn.classList.toggle('gallery__grid-like_active'); //лайк карточки
}
  
  
likeBtn.addEventListener('click', a);


 



  

  