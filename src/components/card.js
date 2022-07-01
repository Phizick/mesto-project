import { closePopup, openPopup } from "./modal";
import { deleteCard, likeCardAddApi, likeCardRemoveApi, apiConfig } from "./api";

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

const cardData = { //обьект для хранения всех свойств карточек
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
    //проверяем есть в массиве лайков лайк от нас, поиском нашего userId. Выражение возвращает значение первого найденного элемента, в противном случае 
    // вернет undefined. нам нужен ответ результата через условный оператор. если userId найден, то find не вернет undefined и все выражение вернет false,
    // иначе - true
    const likeStatus = likes.find((elem) => elem._id === apiConfig.userId) === undefined ? false : true; 
    //активируем лайк, если мы не лайкали
    likeStatus && likebtn.classList.add(galleryLikeStatus);
    likeContainer.textContent = likes.length;
    card.querySelector(galleryCardNameClass).textContent = name;    
    const delItem = card.querySelector(galleryDelButton);
    // снимаем кнопки удаления с карточек простым условием
    // если id владельца карточки не равен нашему userId - удаляем иконку
    _id !== apiConfig.userId && delItem.remove();
    //удаление карточки через подтверждение
    delItem.addEventListener("click", (evt) => {
        openPopup(popupConfirmDel); //открыли попап с запросом удаления
        popupConfirmDel.dataset.Id = _Id; //передали id карточки в атрибуты попапа
    });
    likebtn.addEventListener("click", () => {
        likeCardAdd(card, likebtn, likeContainer, galleryLikeStatus);
    });
    return card;
};

formDelete.addEventListener("submit", confirmDeleteCard); //при нажатии на кнопку происходит удаление карточки

function confirmDeleteCard(evt) {
    evt.preventDefault();
    const deleteId = popupConfirmDel.dataset.Id; //забираем id карточки, из атрибутов
    deletingCard(deleteId); //обрабатываем удаление карточки с заданным id
    ;
};

function deletingCard(deleteId) {
    deleteCard(deleteId) //отправляем карточку на удаление с сервера
        .then(() => {
            document.querySelector(`.gallery__grid-item[data-id="${deleteId}"]`).remove(), //удаляем карточку из DOM
            closePopup(popupConfirmDel);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupConfirmDel.dataset.Id = ""; //сбрасываем значение атрибута
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
