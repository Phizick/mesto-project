export const errorHandler = (err, element, input) => {
    if (!err.json) {
    if (!element === 'console') {
        const errorElement = element.querySelector(`.${input.id}-error`);
        errorElement[0].textContent = 'это место сломалось - несите новое';
        errorElement[0].classList.add(constant.validationConfig.errorClass);
        return Promise.reject(err);
    } else {
        console.error('все очень плохо, совсем');
    } 
} else {
    err.json().then(err => console.error(err.message))
}
}