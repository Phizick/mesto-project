import { closePopup, openPopup } from "./modal";
import { likeCardAddApi, likeCardRemoveApi, deleteCard, loadCards, apiConfig } from "./api";

const galleryList = document.querySelector(".gallery__grid");
const galleryTemplate = document.querySelector(".gallery__template").content;
const popupOpenedImg = document.querySelector(".popup__img-opened");
const imageContainer = document.querySelector(".image__container");
const imageOpened = imageContainer.querySelector(".image__opened");
const popupConfirmDel = document.querySelector(".popup__delete-confirm");
const formDelete = document.querySelector(".popup__form-delete");
const imageOpenedTitel = imageContainer.querySelector('.image__opened-title');

const gallerySpec = {
    galleryItemClass: ".gallery__grid-item",
    galleryImgClass: ".gallery__grid-image",
    galleryCardNameClass: ".gallery__grid-name",
    galleryLikeClass: ".gallery__grid-like",
    galleryLikeStatus: "gallery__grid-like_active",
    galleryDelButton: ".gallery__delete-img-button",
    galleryLikeCountClass: ".gallery__grid-like-count",
};

const cardData = {
    name: "",
    link: "",
    likes: "",
    owner: "",
    _Id: "",
    createdAt: "",
    owner: {
        name: "",
        about: "",
        avatar: "",
        _id: "",
    },
};

const openImgPreview = (evt) => {
    if (evt.target.closest(".gallery__grid-image")) {
        imageOpened.src = evt.target.src;
        imageOpened.alt = evt.target.alt;
        imageOpenedTitel.textContent = evt.target.alt;
        openPopup(popupOpenedImg);
    } else {
        return;
    }
};

const createNewCard = (cardData) => {
    const { name, link, _Id, likes } = cardData;
    const { _id } = cardData.owner;
    const { galleryItemClass, galleryImgClass, galleryCardNameClass, galleryLikeClass, galleryLikeStatus, galleryDelButton, galleryLikeCountClass, ...anySpec } = gallerySpec;
    const card = galleryTemplate.querySelector(galleryItemClass).cloneNode(true);
    const image = card.querySelector(galleryImgClass);
    image.src = link;
    image.alt = name;
    card.dataset.id = _Id;
    const likeContainer = card.querySelector(galleryLikeCountClass);
    const likebtn = card.querySelector(galleryLikeClass);
    const likeStatus = likes.find((elem) => elem._id === apiConfig.userId) === undefined ? false : true;
    likeStatus && likebtn.classList.add(galleryLikeStatus);
    likeContainer.textContent = likes.length;
    card.querySelector(galleryCardNameClass).textContent = name;
    const delItem = card.querySelector(galleryDelButton);
    _id !== apiConfig.userId && delItem.remove();
    delItem.addEventListener("click", (evt) => {
        openPopup(popupConfirmDel);
        popupConfirmDel.dataset.Id = _Id;   
    });
    likebtn.addEventListener("click", () => {
        likeCardAdd(card, likebtn, likeContainer, galleryLikeStatus);
    });
    return card;
};

formDelete.addEventListener("submit", confirmDeleteCard);

function confirmDeleteCard(evt) {
    evt.preventDefault();
    const deleteId = popupConfirmDel.dataset.Id;
    deletingCard(deleteId);
    closePopup(popupConfirmDel);
};

function deletingCard(deleteId) {
    deleteCard(deleteId)
        .then(() => {
            document.querySelector(`.gallery__grid-item[data-id="${deleteId}"]`).remove();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupConfirmDel.dataset.Id = "";
        });
};

const renderCard = (cardData) => {
    galleryList.append(createNewCard(cardData));
};


const likeCardAdd = (card, likebtn, likeContainer, galleryLikeStatus) => {
    if (!likebtn.classList.contains(galleryLikeStatus)) {        
        likeCardAddApi(card.dataset.id)            
            .then((res) => (likeContainer.textContent = res.likes.length),
            likebtn.classList.add(galleryLikeStatus))
            .catch((err) => console.log(err));
    } else {        
        likeCardRemoveApi(card.dataset.id)            
            .then((res) => (likeContainer.textContent = res.likes.length),
            likebtn.classList.remove(galleryLikeStatus))
            .catch((err) => console.log(err));
    }
};

export { openImgPreview, galleryList, cardData, renderCard};
