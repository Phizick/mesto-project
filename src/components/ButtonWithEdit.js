/**
 * конструктор поведения всех кнопок редактирования информации на странице
 * @constructor
 * @param {object} buttonSelector - селектор кнопки редактирования
 * @param {object} popup - селектор вызываемого попапа редактирования
 * @param {object} form - форма попапа редактирования
 */
import { userProfileInfo } from "../pages";

export default class ButtonWithEdit{
    constructor(buttonSelector, popup, form) {
        this._buttonSelector = buttonSelector;
        this._form = form;
        this._popup = popup;
    }

    setBtnEventListeners() {
        this._buttonSelector.addEventListener("click", () => {
            this._popup.open();
            this._setProfileFormInputValues();
            this._form.resetValidation();
        });
    }

    _setProfileFormInputValues() {
        const { name, about } = userProfileInfo.getUserInfo()
        this._form._inputList.forEach((inputListItem) => {
            if (inputListItem.id === "userName-input") {
                inputListItem.value = name;
            } else if (inputListItem.id === 'userAbout-input') {
                inputListItem.value = about;
            }
        });
    }    
}
