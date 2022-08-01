export default class Buttons {
    constructor(buttonSelector, popupSelector, form) {
        this._buttonSelector = buttonSelector;
        this._form = form;
        this._popupSelector = popupSelector;
       
              
    }

    setBtnEventListeners() {
        this._buttonSelector.addEventListener('click', () => {
            this._popupSelector.open();
            this.userinfotext()                     
            this._form.resetValidation();
        })
    }

    userinfotext() {
            const userInputName = document.getElementById('userName-input');
            const userInputAbout = document.getElementById('userAbout-input')
            const a = document.querySelector('.profile__name-text') 
            const b = document.querySelector('.profile__bio')  
            userInputName.value = a.textContent
            userInputAbout.value = b.textContent

    }

}

