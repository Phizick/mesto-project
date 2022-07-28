import Popup from "./Popup";

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
            this._submit(this._popup.dataset.delId);
            this.close()
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
}