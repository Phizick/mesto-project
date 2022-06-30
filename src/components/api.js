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

// _checkResponse(res) {
//     if (res.ok) {
//         return res.json();
//     }
//     return Promise.reject(new Error (`Произошла ошибка со статус-кодом ${res.status}`));
// };

// _checkResponse(res) {
//     if (res.status === 200) {
//         return await res.json();
//     }
//     throw new Error(res.status);
// };



const pullCard = async (cardData) => {
    const res = await fetch(`${apiConfig.serverUrl}/cards`, {
        method: "POST",
        headers: apiConfig.headers,
        body: JSON.stringify(cardData),
    });
    if (res.status === 200) {
        return await res.json();
    }
    throw new Error(res.status);
};


const loadCards = async () => {
    const res = await fetch(`${apiConfig.serverUrl}/cards`, {
        headers: apiConfig.headers,
    });
    if (res.status === 200) {
        return await res.json();
    }
    throw new Error(res.status);
};

const deleteCard = async (_Id) => {
    const res = await fetch(`${apiConfig.serverUrl}/cards/${_Id}`, {
        method: "DELETE",
        headers: apiConfig.headers,
    });
    if (res.status === 200) {
        return await res.json();
    }
    throw new Error(res.status);
};

const likeCardAddApi = async (_Id) => {
    const res = await fetch(`${apiConfig.serverUrl}/cards/likes/${_Id}`, {
        method: "PUT",
        headers: apiConfig.headers,
    });
    if (res.status === 200) {
        return await res.json();
    }
    throw new Error(res.status);
};

const likeCardRemoveApi = async (_Id) => {
    const res = await fetch(`${apiConfig.serverUrl}/cards/likes/${_Id}`, {
        method: "DELETE",
        headers: apiConfig.headers,
    });
    if (res.status === 200) {
        return await res.json();
    }
    throw new Error(res.status);
};

const editProfileData = async (userProfile) => {
    const res = await fetch(`${apiConfig.serverUrl}/users/me`, {
        method: "PATCH",
        headers: apiConfig.headers,
        body: JSON.stringify(userProfile),
    });
    if (res.status === 200) {
        return await res.json();
    }
    throw new Error(res.status);
};

const avatarEdit = async (avatar) => {
    const res = await fetch(`${apiConfig.serverUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: apiConfig.headers,
        body: JSON.stringify({
            avatar: avatar,
        }),
    });
    if (res.status === 200) {
        return await res.json();
    }
    throw new Error(res.status);
};

const loadProfileData = async () => {
    const res = await fetch(`${apiConfig.serverUrl}/users/me`, {
        headers: apiConfig.headers,
    });
    if (res.status === 200) {
        return await res.json();
    }
    throw new Error(res.status);
};



export { loadProfileData, avatarEdit, editProfileData, likeCardAddApi, likeCardRemoveApi, deleteCard, loadCards, pullCard, apiConfig };
