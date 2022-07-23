import { closePopup, openPopup } from "./modal";
import { deleteCard, likeCardAddApi, likeCardRemoveApi, apiConfig } from "./api";

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
};

function deletingCard(deleteId) {
    deleteCard(deleteId)
        .then(() => {
            document.querySelector(`.gallery__grid-item[data-id="${deleteId}"]`).remove(),
            closePopup(popupConfirmDel);
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
