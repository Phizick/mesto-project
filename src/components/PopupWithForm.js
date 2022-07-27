import Popup from "./Popup";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, {submit}, {clearFormValidity}) {
        super(popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__form');
        this._submitBtn = this._popup.querySelector('.popup__save-button');
        this._popupInputList = this._popup.querySelectorAll('.popup__input');
        this._clearFormValidity = clearFormValidity;
        this._formSubmitDefaultTextContent = this._submitBtn.textContent
    }

    _getFormInputValues() {
        this._formValues = {};
        this._popupInputList.forEach(item => {
            this._formValues[item.name] = item.value;
        });       
        return this._formValues
    }

    setPopupEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit(this._getFormInputValues());       
        });
    }



    setFormSubmitBtnContent(content) {
        this._submitBtn.textContent = content;
    }

    close() {
        super
        .close();
        this._form.reset();        
        this._popupInputList.forEach(item => {
            this._clearFormValidity(item);
        });
    }

    setFormInputValues(data) {        
        this._popupInputList.forEach((item) => {
           if (item.name === 'name') {
            item.value = data.name
           } else {
            item.value = data.about
           }
        })
    }



    // _approveSubmit(evt) { 
    //     evt.preventDefault();
    //     // this._submit.then(() => this.close());
    //     const a = this._getFormInputValues();
    //     // this._setFormSubmitBtnState(true);
    //     this._submit(a)
    //         .then(() => this.close())
    //         .finally(() => {
    //             this._setFormSubmitBtnState(false)
    //         })    
    // }

    // _setFormSubmitBtnState(state) {
    //     console.log(this._formSubmitDefaultTextContent)
    //     this._submitBtn.disabled = state;
    //     this._submitBtn.textContent = state ? 'Сохранение...' : this._formSubmitDefaultTextContent;
    // }

  
}