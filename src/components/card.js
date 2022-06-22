
import { galleryList, galleryTemplate, popupOpenedImg } from './index.js'
import {initialCards} from './cards.js'
import {openPopup, closePopup, keyClose, overlayClose} from './index.js'



//создание новой карточки
const createNewCard = (cardName, cardLink) => {
    //создание контейнера под карточку и определение его значений
    const card = galleryTemplate.querySelector(".gallery__grid-item").cloneNode(true);
    const image = card.querySelector(".gallery__grid-image");
    image.src = cardLink;
    image.alt = cardName;
    card.querySelector(".gallery__grid-name").textContent = cardName;
    
    //удаление карточки
    const delItem = card.querySelector(".gallery__delete-img-button");
    delItem.addEventListener("click", () => {
        const listItem = delItem.closest(".gallery__grid-item");
        listItem.remove();
    });

    //лайк карточки
    const likebtn = card.querySelector(".gallery__grid-like");
    likebtn.addEventListener("click", () => {
        likebtn.classList.toggle("gallery__grid-like_active");
    }); 

    //открытие карточки в полном размере изображения
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

//отрисовка карточки в контейнер
const renderCard = (cardName, cardLink) => {
    galleryList.prepend(createNewCard(cardName, cardLink));    
};

//перебор массива
initialCards.forEach(item => {
    renderCard(item.name, item.link);
});
