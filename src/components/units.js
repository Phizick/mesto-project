export const errorHandler = (err, form, input) => {
    if (!err.json) {
    if (form !== 'default') {
        const errorElementGroup = Array.from(form.querySelectorAll(`.${input.id}-error`));
        errorElementGroup[errorElementGroup.length - 1].textContent = 'это место сломалось - несите новое';
        errorElementGroup[errorElementGroup.length - 1].classList.add(constant.validationConfig.errorClass);
        return Promise.reject(err);
    } else {
        console.error('error');
    } 
} else {
    err.json().then(err => console.error(err.message))
}
}

function enableGlobalPromiseErrorsListener() {
    window.addEventListener('unhandledrejection', (evt) => {
        console.error('необработанная ошибка Promise:' + evt.reason)    
    }) 
}

enableGlobalPromiseErrorsListener()

 

Promise.race([
    request(),
    new Promise((_, reject) => setTimeout(reject, 4000)),
]).then((data) => {

}).catch((err) => console.error(err))
