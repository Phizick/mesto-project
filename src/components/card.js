import { userProfile } from "../index.js";
import { closePopup, openPopup } from "./modal.js";

const galleryList = document.querySelector(".gallery__grid");
const galleryTemplate = document.querySelector(".gallery__template").content;
const popupOpenedImg = document.querySelector(".popup__img-opened");
const imageContainer = document.querySelector(".image__container");
const imageOpened = imageContainer.querySelector(".image__opened");
const popupConfirmDel = document.querySelector('.popup__delete-confirm')

const gallerySpec = {
    galleryItemClass: ".gallery__grid-item",
    galleryImgClass: ".gallery__grid-image",
    galleryCardNameClass: ".gallery__grid-name",
    galleryLikeClass: ".gallery__grid-like",
    galleryLikeStatus: "gallery__grid-like_active",
    galleryDelButton: ".gallery__delete-img-button"
};

const cardData = {
    name: '',
    link: '',
    likes: '',
    owner: '',
    _Id: '',
    createdAt: '',
    owner: {
        name: '',
        about: '',
        avatar: '',
        _id: ''
    }
};   

// const delSubmitDtn = document.getElementById('conf')

// const  deletingCard = () => {
//     openPopup(popupConfirmDel)
    
// }

// delSubmitDtn.addEventListener("click", (card, _Id) => {
//     deletingCard2(card, _Id)
//     closePopup(popupConfirmDel)

// })

// const deletingCard2 = (card, _Id) => {
//  deleteCard(_Id).catch(err => console.log(err))         
//         card.remove()
// }



const openImgPreview = (evt) => {    
    if (evt.target.closest('.gallery__grid-image')) {    
        imageOpened.src = evt.target.src;
        imageOpened.alt = evt.target.alt;
        imageContainer.querySelector(".image__opened-title").textContent = evt.target.alt;
        openPopup(popupOpenedImg);
    } else {
        return
    }
};

const createNewCard = (cardData) => {    
    const { name, link, _Id, likes} = cardData;
    const { _id} = cardData.owner;        
    const { galleryItemClass, galleryImgClass, galleryCardNameClass, galleryLikeClass, galleryLikeStatus, galleryDelButton, ...anySpec} = gallerySpec;
    const card = galleryTemplate.querySelector(galleryItemClass).cloneNode(true);
    const image = card.querySelector(galleryImgClass);
    image.src = link;
    image.alt = name;
    const likeContainer = card.querySelector('.gallery__grid-like-count')
    const delSubmitDtn = document.getElementById('conf')
    likeContainer.textContent = likes.length
    
    card.querySelector(galleryCardNameClass).textContent = name;
    const delItem = card.querySelector(galleryDelButton);
    (_id !== apiConfig.userId) && delItem.remove();       
    const likebtn = card.querySelector(galleryLikeClass);
    // delItem.addEventListener("click", deletingCard );
    delItem.addEventListener('click', () => {
        // closePopup(popupConfirmDel)
        deleteCard(_Id).catch(err => console.log(err))         
        card.remove() 
    })        
    likebtn.addEventListener("click", () => {
        likeCardAdd(_Id, likebtn, likeContainer, galleryLikeStatus)
               
    });     
    return card;
};

const renderData = (name, link, owner_id, _id, likes) => {
    cardData.name = `${name}`;
    cardData.link = `${link}`; 
    cardData.owner._id = `${owner_id}` 
    cardData._Id = `${_id}`
    cardData.likes = likes                    
    renderCard(cardData);    
};

const renderCard = (cardData) => {
    galleryList.append(createNewCard(cardData));    
};

const apiConfig = {
    serverUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
    headers: {
        authorization: 'c1b9d872-823e-43ab-9724-10a589fee2c1',
        'Content-Type': 'application/json'
    },
    userId: '7a744b5fd03159f0028e76c6',
    likes: '',
    _id: ''
}

const pullCard = async (cardData) => {
    let res = await fetch(`${apiConfig.serverUrl}/cards`, {
                method: 'POST',
                headers: apiConfig.headers,
                body: JSON.stringify(cardData),        
            })
        if (res.status === 200) {            
            return await res.json();
        }
        throw new Error(res.status)
};

const loadCards = async () => {
    let res = await fetch(`${apiConfig.serverUrl}/cards`, {headers: apiConfig.headers})
    if (res.status === 200) {        
        return await res.json();
    }
    throw new Error(res.status);
};

const loadedCards = loadCards().then(data => data);
loadedCards.then(data => data.forEach(item => {renderData(item.name, item.link, item.owner._id, item._id, item.likes)}))
.catch(err => {console.log(err)});



const deleteCard = async (_Id) => {
    let res = await fetch(`${apiConfig.serverUrl}/cards/${_Id}`, {
        method: 'DELETE',
        headers: apiConfig.headers        
    })
    if (res.status === 200) {        
        return await res.json();
    }
    throw new Error(res.status)
};

const likeCardAddApi = async (_Id) => {
    let res = await fetch(`${apiConfig.serverUrl}/cards/likes/${_Id}`, {
        method: 'PUT',
        headers: apiConfig.headers        
    })
    if (res.status === 200) {
        return await res.json();
    } 
    throw new Error(res.status)
};




const likeCardRemoveApi = async (_Id) => {
    let res = await fetch(`${apiConfig.serverUrl}/cards/likes/${_Id}`, {
        method: 'DELETE',
        headers: apiConfig.headers        
    })
    if (res.status === 200) {
        return await res.json();
    } 
    throw new Error(res.status)

}

const likeCardAdd = (_Id, likebtn, likeContainer, galleryLikeStatus) => {
    if (!likebtn.classList.contains(galleryLikeStatus)) {
        likebtn.classList.add(galleryLikeStatus);
    likeCardAddApi(_Id)
    .then(data => likeContainer.textContent = data.likes.length)
    .catch(err => (console.log(err)))
    } else {
        likebtn.classList.remove(galleryLikeStatus);
    likeCardRemoveApi(_Id)
    .then(data => likeContainer.textContent = data.likes.length)
    .catch(err => (console.log(err)))
    }    
}



export {renderCard, renderData, openImgPreview, galleryList, pullCard, cardData, apiConfig};



