import { closePopup, openPopup } from "./modal";
import { likeCardAddApi, likeCardRemoveApi, deleteCard, loadCards, apiConfig } from "./api";

const galleryList = document.querySelector(".gallery__grid");
const galleryTemplate = document.querySelector(".gallery__template").content;
const popupOpenedImg = document.querySelector(".popup__img-opened");
const imageContainer = document.querySelector(".image__container");
const imageOpened = imageContainer.querySelector(".image__opened");
const popupConfirmDel = document.querySelector(".popup__delete-confirm");
const formDelete = document.querySelector(".popup__form-delete");

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
        imageContainer.querySelector(".image__opened-title").textContent = evt.target.alt;
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
        likeCardAdd(_Id, likebtn, likeContainer, galleryLikeStatus);
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

const loadedCards = loadCards().then((data) => data);
loadedCards
    .then((data) =>
        data.forEach((item) => {
            cardData.name = item.name;
            cardData.link = item.link;
            cardData.owner._id = item.owner._id;
            cardData._Id = item._id;
            cardData.likes = item.likes;
            renderCard(cardData);
        })
    )
    .catch((err) => {
        console.log(err);
    });

const likeCardAdd = (_Id, likebtn, likeContainer, galleryLikeStatus) => {
    if (!likebtn.classList.contains(galleryLikeStatus)) {
        likebtn.classList.add(galleryLikeStatus);
        likeCardAddApi(_Id)
            .then((data) => (likeContainer.textContent = data.likes.length))
            .catch((err) => console.log(err));
    } else {
        likebtn.classList.remove(galleryLikeStatus);
        likeCardRemoveApi(_Id)
            .then((data) => (likeContainer.textContent = data.likes.length))
            .catch((err) => console.log(err));
    }
};

export { openImgPreview, galleryList, cardData, renderCard, loadedCards};
