/**
 * класс для обработки запросов к серверу
 * @constructor
 * @param {object} apiData - содержит два обьекта: apiConfig (токен для авторизации сервера и url, а так же заголовки для запросов)
 * apiLinks ( пути от корневого каталога сервера к нужным страницам)
 */

export default class Api {
    constructor(apiData) {
        this._config = apiData.apiConfig;
        this._routes = apiData.apiRoutes;
    }

    _checkResponse(res) {
        if (res.status === 200) {
            return res.json();
        }
        return Promise.reject(new Error(`Ошибка сервера: ${res.status}`));
    }

    async _getApiData(routes, method, id) {
        return await fetch(`${this._config.serverUrl}${routes}${id}`, {
            method: method,
            headers: this._config.headers,
        }).then(this._checkResponse)        
    }

    async _setApiData(routes, method, data) {
        return await fetch(`${this._config.serverUrl}${routes}`, {
            method: method,
            headers: this._config.headers,
            body: JSON.stringify(data),
        }).then(this._checkResponse)        
    }

    loadCardsData() {
        return this._getApiData(this._routes.cards, "GET", "");
    }

    loadUserProfileData() {
        return this._getApiData(this._routes.userProfile, "GET", "");
    }

    deleteCard(id) {
        return this._getApiData(this._routes.cardDelete, "DELETE", id);
    }

    cardLikeAdd(id) {
        return this._getApiData(this._routes.cardLike, "PUT", id);
    }

    cardLikeRemove(id) {
        return this._getApiData(this._routes.cardLike, "DELETE", id);
    }

    setNewCard(cardData) {
        return this._setApiData(this._routes.cards, "POST", cardData);
    }

    editProfileData(data) {
        return this._setApiData(this._routes.userProfile, "PATCH", data);
    }

    userAvatarEdit(avatarData) {
        return this._setApiData(this._routes.userAvatar, "PATCH", avatarData);
    }
}
