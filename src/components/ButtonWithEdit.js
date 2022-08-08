/**
 * конструктор поведения всех кнопок редактирования информации на странице
 * @constructor
 * @param {object} buttonSelector - селектор кнопки редактирования
 * @param {object} popup - селектор вызываемого попапа редактирования
 * @param {object} form - форма попапа редактирования
 */


export default class ButtonWithEdit{
    constructor(buttonSelector, popup, form) {
        this._buttonSelector = buttonSelector;
        this._form = form;
        this._popup = popup;
    }

    setBtnEventListeners() {
        this._buttonSelector.addEventListener("click", () => {
            this._popup.open();           
            this._form.resetValidation();
        });
    }

   
}
