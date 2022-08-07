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

export const handleCardLikeClick = (card, id, renderedCard) => {
    if (card.dataset.like === "liked") {
        getApi
            .cardLikeRemove(id)
            .then((res) => {
                renderedCard.removeCardLike(res);
            })
            .catch((err) => errorHandler(err, 'default'));
    } else {
        getApi
            .cardLikeAdd(id)
            .then((res) => {
                renderedCard.addedCardLike(res);
            })
            .catch((err) => errorHandler(err, 'default'));
    }
};