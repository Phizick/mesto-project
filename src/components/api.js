

const links = {
    profile: '/users/me',
    avatar: '/users/me/avatar',
    cards: '/cards',
    cardLike: '/cards/likes/',
    cardDelete: '/cards/'
}


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

    _getData(links, method, id) {
        return fetch(`${this._config.serverUrl}${links}${id}`, {
            method: method,
            headers: this._config.headers
        })
        .then (this._checkResponse);
    }

    _pushData(links, method, jsonInfo) {
        return fetch(`${this._config.serverUrl}${links}`, {
            method: method,
            headers: this._config.headers,
            body: JSON.stringify(jsonInfo)
        })
        .then (this._checkResponse);
    }

    loadCards() {
        return this._getData(this._link.cards, 'GET', '');
    }

    loadProfileData() {
        return this._getData(this._link.profile, 'GET', '');
    }

    deleteCard(id) {
        return this._getData(this._link.cardDelete, 'DELETE', id);
    }

    likeCardAdd(id) {
        return this._getData(this._link.cardLike, 'PUT', id);
    }

    likeCardRemove(id) {
        return this._getData(this._link.cardLike, 'DELETE', id);
    }

    pushCard(data) {
        return this._pushData(this._link.cards, 'POST', data);
    }

    editProfileData(data) {
        return this._pushData(this._link.profile, 'PATCH', data);
    }

    avatarEdit(data) {
        return this._pushData(this._link.avatar, 'PATCH', data);
    }

 
}





    