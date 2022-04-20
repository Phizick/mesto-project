const profileEdit = document.querySelector('.profile__name-edit');
const popupForm = document.querySelector('.popup');
const popupCloseBtn = document.querySelector('.popup__close-button');

function showClick() {
  popupForm.classList.add('popup_opened');  //открытие попапа
}

profileEdit.addEventListener('click', showClick); 

function hiddenClick() {
    popupForm.classList.remove('popup_opened');  //закрытие по close-btn
  }
  
popupCloseBtn.addEventListener('click', hiddenClick); 
