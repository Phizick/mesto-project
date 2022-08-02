export const errorHandler = (err, form, input) => {
    if (!err.json) {
    if (form !== 'default') {
        const errorElement = Array.from(form.querySelectorAll(`.${input.id}-error`));
        errorElement[errorElement.length - 1].textContent = 'это место сломалось - несите новое';
        errorElement[errorElement.length - 1].classList.add(constant.validationConfig.errorClass);
        return Promise.reject(err);
    } else {
        console.error('error');
    } 
} else {
    err.json().then(err => console.error(err.message))
}
}

window.addEventListener('unhandledrejection', (evt) => {
    console.error('необработанная ошибка Promise:' + evt.reason)    
})  

Promise.race([
    request(),
    new Promise((_, reject) => setTimeout(reject, 4000)),
]).then((data) => {

}).catch((err) => console.error(err))
