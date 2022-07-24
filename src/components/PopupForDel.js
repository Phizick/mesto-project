import Popup from "./popup";

export default class PopupForDel {
    constructor(popupSelector, {delSubmit}) {
        super(popupSelector);
        this._submit = delSubmit;
        this._form = this._popup.querySelector('.popup__delete-confirm')
    }

    open(id) {
        super.open();
        this._popup.dataset.delId = id
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._submit(this._popup.dataSet.delId);
        });
    }

    close() {
        super.close();
        this._popup.dataset.delId = null
    }
}