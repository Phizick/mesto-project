export default class Api {
    constructor(apiData) {
        this._config = apiData.apiConfig;
        this._links = apiData.apiLinks;
    }

    _checkResponse(res) {
        if (res.status === 200) {
            return res.json();
        }
        return Promise.reject(new Error(`Error ${res.status}`));
    }

    _getApiData(links, method, id) {
        return fetch(`${this._config.serverUrl}${links}${id}`, {
            method: method,
            headers: this._config.headers,
        }).then(this._checkResponse);
    }

    _setApiData(links, method, data) {
        return fetch(`${this._config.serverUrl}${links}`, {
            method: method,
            headers: this._config.headers,
            body: JSON.stringify(data),
        }).then(this._checkResponse);
    }

    loadCardsData() {
        return this._getApiData(this._links.cards, "GET", "");
    }

    loadUserProfileData() {
        return this._getApiData(this._links.userProfile, "GET", "");
    }

    deleteCard(id) {
        return this._getApiData(this._links.cardDelete, "DELETE", id);
    }

    cardLikeAdd(id) {
        return this._getApiData(this._links.cardLike, "PUT", id);
    }

    cardLikeRemove(id) {
        return this._getApiData(this._links.cardLike, "DELETE", id);
    }

    setNewCard(cardData) {
        return this._setApiData(this._links.cards, "POST", cardData);
    }

    editProfileData(data) {
        return this._setApiData(this._links.userProfile, "PATCH", data);
    }

    userAvatarEdit(avatarData) {
        return this._setApiData(this._links.userAvatar, "PATCH", avatarData);
    }
}
