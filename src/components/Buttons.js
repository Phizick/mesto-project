// import userProfileInfo from './index'
export default class Buttons {
    constructor(buttonSelector, popupSelector, form) {
        this._buttonSelector = buttonSelector;
        this._form = form;
        this._popupSelector = popupSelector;       
    }

    _setBtnEventListeners() {
        this._buttonSelector.addEventListener('click', () => {
            this._popupSelector.open();
            this._popupSelector.setFormInputValues(userProfileInfo.getUserInfo());
            this._form.resetValidation();
        })
    }
}

// constants.profileNameEditBtn.addEventListener("click", () => {
//     popupProfileEdit.open();
//     popupProfileEdit.setFormInputValues(userProfileInfo.getUserInfo());
//     formEditProfile.resetValidation();
// });

// constants.userAvatarEditBtn.addEventListener("click", () => {
//     popupAvatarEdit.open();
//     formEditAvatar.resetValidation();
// });

// constants.galleryAddCardBtn.addEventListener("click", () => {
//     popupAddedNewCard.open();
//     formEditCard.resetValidation();
// });