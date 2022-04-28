





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