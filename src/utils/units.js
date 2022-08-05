import * as constants from "./constants";
import { getApi } from "../pages";

export const errorHandler = (err, form) => {
    if (!err.json) {
        if (form !== "default") {
            const errorElementGroup = Array.from(form.querySelectorAll(constants.validationConfig.inputErrorClass));
            errorElementGroup[errorElementGroup.length - 1].textContent = "что-то пошло не так";
            errorElementGroup[errorElementGroup.length - 1].classList.add(constants.validationConfig.errorVisibilityClass);
            return Promise.reject(err);
        } else {
            console.error("ошибка");
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

export const handleCardLikeClick = (card, id, creatingCard) => {
    if (card.dataset.like === "liked") {
        getApi
            .cardLikeRemove(id)
            .then((res) => {
                creatingCard.removeCardLike(res);
            })
            .catch((err) => errorHandler(err, 'default'));
    } else {
        getApi
            .cardLikeAdd(id)
            .then((res) => {
                creatingCard.addedCardLike(res);
            })
            .catch((err) => errorHandler(err, 'default'));
    }
};

// Promise.race([
//     request(),
//     new Promise((_, reject) => setTimeout(reject, 4000)),
// ]).then((data) => {

// }).catch((err) => console.error(err))
