import * as constants from "../utils/constants";
export const errorHandler = (err, form) => {
    if (!err.json) {
        if (form !== "default") {
            const errorElementGroup = Array.from(form.querySelectorAll(constants.validationConfig.inputErrorClass));
            errorElementGroup[errorElementGroup.length - 1].textContent = "что-то пошло не так";
            errorElementGroup[errorElementGroup.length - 1].classList.add(constants.validationConfig.errorVisibilityClass);
            return Promise.reject(err);
        } else {
            console.error("что-то пошло не так");
        }
    } else {
        err.json().then((err) => console.error(err.message));
    }
};

function enableGlobalPromiseErrorsListener() {
    window.addEventListener("unhandledrejection", (evt) => {
        console.error("необработанная ошибка Promise:" + evt.reason);
    });
}

enableGlobalPromiseErrorsListener();

// Promise.race([
//     request(),
//     new Promise((_, reject) => setTimeout(reject, 4000)),
// ]).then((data) => {

// }).catch((err) => console.error(err))
