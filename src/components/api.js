// const apiConfig = {
//     serverUrl: "https://nomoreparties.co/v1/plus-cohort-12",
//     headers: {
//         authorization: "c1b9d872-823e-43ab-9724-10a589fee2c1",
//         "Content-Type": "application/json",
//     },
//     userId: "7a744b5fd03159f0028e76c6",
//     likes: "",
//     _id: "",
// };


export default class Api {
    constructor(data) {
        this._config = data.apiConfig;
        this._link = data.link;
    }

    _checkResponse(res) {
        if (res.status === 200) {
            return res.json();
        }
        return Promise.reject(new Error (`Error ${res.status}`));
    }

    _getData(link, method) {
        return fetch(`${this._config.serverUrl}${link}`, {
            method: method,
            headers: this._config.headers
        })
        .then (this._checkResponse)
    }
}





//     pullCard({name, link}) {
//         return fetch(`${this.apiConfig.serverUrl}/cards`, {
//             method: "POST",
//             headers: this.apiConfig.headers,
//             body: JSON.stringify(cardData), //карддату поменять на валидную
//         })
//         .then (this._checkResponse)  
//     }

//     loadCards() {
//         return fetch(`${this.apiConfig.serverUrl}/cards`, {
//             headers: this.apiConfig.headers,
//         })
//         .then (this._checkResponse)
//     }

//     deleteCard(_Id) {
//         return fetch(`${this.apiConfig.serverUrl}/cards/${_Id}`, {
//             method: "DELETE",
//             headers: this.apiConfig.headers,
//         })
//         .then (this._checkResponse)
//     }

//     likeCardAddApi(_Id) {
//         return fetch(`${this.apiConfig.serverUrl}/cards/likes/${_Id}`, {
//             method: "PUT",
//             headers: this.apiConfig.headers,
//         })
//         .then (this._checkResponse)
//     }

//     likeCardRemoveApi(_Id) {
//         return fetch(`${this.apiConfig.serverUrl}/cards/likes/${_Id}`, {
//             method: "DELETE",
//             headers: this.apiConfig.headers,
//         })
//         .then (this._checkResponse)
//     }

//     editProfileData(userProfile) {
//         return fetch(`${this.apiConfig.serverUrl}/users/me`, {
//             method: "PATCH",
//             headers: this.apiConfig.headers,
//             body: JSON.stringify(userProfile),
//         })
//         .then (this._checkResponse)
//     }

//     avatarEdit(image) {
//         return fetch(`${this.apiConfig.serverUrl}/users/me/avatar`, {
//             method: "PATCH",
//             headers: this.apiConfig.headers,
//             body: JSON.stringify({
//                 avatar: image
//             }),
//         })
//         .then (this._checkResponse)
//     }

//     loadProfileData() {
//         return fetch(`${this.apiConfig.serverUrl}/users/me`, {
//             headers: this.apiConfig.headers,
//         })
//         .then (this._checkResponse)
//    }
   

// }




