import { initialCards } from "./cards.js";
import { openPopup } from "./modal.js";

const galleryList = document.querySelector(".gallery__grid");
const galleryTemplate = document.querySelector(".gallery__template").content;
const popupOpenedImg = document.querySelector(".popup__img-opened");

const createNewCard = (cardName, cardLink) => {
    const card = galleryTemplate.querySelector(".gallery__grid-item").cloneNode(true);
    const image = card.querySelector(".gallery__grid-image");
    image.src = cardLink;
    image.alt = cardName;
    card.querySelector(".gallery__grid-name").textContent = cardName;
    const delItem = card.querySelector(".gallery__delete-img-button");
    delItem.addEventListener("click", () => {
        const listItem = delItem.closest(".gallery__grid-item");
        listItem.remove();
    });
    const likebtn = card.querySelector(".gallery__grid-like");
    likebtn.addEventListener("click", () => {
        likebtn.classList.toggle("gallery__grid-like_active");
    });
    const imageContainer = document.querySelector(".image__container");
    image.addEventListener("click", () => {
        const imageOpened = imageContainer.querySelector(".image__opened");
        imageOpened.src = image.src;
        imageOpened.alt = image.alt;
        imageContainer.querySelector(".image__opened-title").textContent = image.alt;
        openPopup(popupOpenedImg);
    });
    return card;
};

const renderCard = (cardName, cardLink) => {
    galleryList.prepend(createNewCard(cardName, cardLink));
};

initialCards.forEach(item => {
    renderCard(item.name, item.link);
});

export {renderCard};
