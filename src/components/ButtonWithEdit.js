/**
 * конструктор поведения всех кнопок редактирования информации на странице
 * @constructor
 * @param {object} buttonSelector - селектор кнопки редактирования
 * @param {object} popupSelector - селектор вызываемого попапа редактирования
 * @param {object} form - форма попапа редактирования
 */

export default class ButtonWithEdit{
    constructor(buttonSelector, popupSelector, form) {
        this._buttonSelector = buttonSelector;
        this._form = form;
        this._popupSelector = popupSelector;
    }

    setBtnEventListeners() {
        this._buttonSelector.addEventListener("click", () => {
            this._popupSelector.open();
            this._setFormInputValues();
            this._form.resetValidation();
        });
    }

    _setFormInputValues() {        
        const profileNameTextContainer = document.querySelector(".profile__name-text");
        const profileAboutTextContainer = document.querySelector(".profile__bio");
        this._form._inputList.forEach((inputListItem) => {
            if (inputListItem.id === "userName-input") {
                inputListItem.value = profileNameTextContainer.textContent;
            } else if (inputListItem.id === 'userAbout-input') {
                inputListItem.value = profileAboutTextContainer.textContent;
            }
        });
    }
}
