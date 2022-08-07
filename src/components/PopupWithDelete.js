import Popup from "./Popup";
/**
 * Конструктор попапа подтверждения удаления карточки из DOM
 * @constructor
 * @param {string} popupSelector - селектор класса разметки попапа в DOM
 * @param {function} submit - колбэк функции подтверждения удаления карточки
 */

export default class PopupWithDelete extends Popup{
    constructor(popupSelector, {submit}) {
        super(popupSelector);        
        this._submit = submit;        
        this._form = this._popup.querySelector('.popup__form')
    }  

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._submit(this._popup.dataset.delId)                           
        });
    }

    close() {
        super.close();
        this._popup.dataset.delId = ''
        

    }

    open(id) {
        super.open();
        this._popup.dataset.delId = id              
    }

      delcard() {
        document.querySelector(`.card[data-id="${this._popup.dataset.delId}"]`).remove()
    }
 
  
}