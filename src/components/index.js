import {initialCards} from './cards.js'


profileEdit.addEventListener("click", () => {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
});

closeBtns.forEach(button => {button.addEventListener("click", () => {closePopup(button.closest(".popup"))})});


formProfileSaveBtn.addEventListener("submit", evt => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popupProfile);
});

popupAddCard.addEventListener("submit", evt => {
  evt.preventDefault();
  renderCard(imgNameInput.value, imgLinkInput.value);
  closePopup(popupAddCard);    
  imgNameInput.value = "";
  imgLinkInput.value = "";
});


