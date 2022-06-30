const apiConfig = {
    serverUrl: "https://nomoreparties.co/v1/plus-cohort-12",
    headers: {
        authorization: "c1b9d872-823e-43ab-9724-10a589fee2c1",
        "Content-Type": "application/json",
    },
    userId: "7a744b5fd03159f0028e76c6",
    likes: "",
    _id: "",
};

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(new Error (`Error ${res.status}`));
};

const pullCard = async (cardData) => {
    return fetch(`${apiConfig.serverUrl}/cards`, {
        method: "POST",
        headers: apiConfig.headers,
        body: JSON.stringify(cardData),
    })
    .then (res => checkResponse(res))   
};

const loadCards = async () => {
   return fetch(`${apiConfig.serverUrl}/cards`, {
        headers: apiConfig.headers,
    })
    .then (res => checkResponse(res))
};

const deleteCard = async (_Id) => {
    return fetch(`${apiConfig.serverUrl}/cards/${_Id}`, {
        method: "DELETE",
        headers: apiConfig.headers,
    })
    .then (res => checkResponse(res))
};

const likeCardAddApi = async (_Id) => {
    return fetch(`${apiConfig.serverUrl}/cards/likes/${_Id}`, {
        method: "PUT",
        headers: apiConfig.headers,
    })
    .then (res => checkResponse(res))
};

const likeCardRemoveApi = async (_Id) => {
    return fetch(`${apiConfig.serverUrl}/cards/likes/${_Id}`, {
        method: "DELETE",
        headers: apiConfig.headers,
    })
    .then (res => checkResponse(res))
};

const editProfileData = async (userProfile) => {
   return fetch(`${apiConfig.serverUrl}/users/me`, {
        method: "PATCH",
        headers: apiConfig.headers,
        body: JSON.stringify(userProfile),
    })
    .then (res => checkResponse(res))
};

const avatarEdit = async (image) => {
    return fetch(`${apiConfig.serverUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: apiConfig.headers,
        body: JSON.stringify({
            avatar: image
        }),
    })
    .then (res => checkResponse(res))
};

const loadProfileData = async () => {
    return fetch(`${apiConfig.serverUrl}/users/me`, {
        headers: apiConfig.headers,
    })
    .then (res => checkResponse(res))
};

export { loadProfileData, avatarEdit, editProfileData, likeCardAddApi, likeCardRemoveApi, deleteCard, loadCards, pullCard, apiConfig };
