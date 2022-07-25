export default class Api {
    constructor(data) {
        this._config = data.apiConfig;
        this._links = data.links;
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

    _pushData(links, method, data) {                
        return fetch(`${this._config.serverUrl}${links}`, {
            method: method,
            headers: this._config.headers,
            body: JSON.stringify(data)
        })
        .then (this._checkResponse);
    }

    loadCards() {
        return this._getData(this._links.cards, 'GET', '');
    }

    loadProfileData() {
        return this._getData(this._links.profile, 'GET', '');
    }

    deleteCard(id) {
        return this._getData(this._links.cardDelete, 'DELETE', id);
    }

    likeCardAdd(id) {
        return this._getData(this._links.cardLike, 'PUT', id);
    }

    likeCardRemove(id) {
        return this._getData(this._links.cardLike, 'DELETE', id);
    }

    pushCard(data) {
        return this._pushData(this._links.cards, 'POST', data);
    }

    editProfileData(data) {
        return this._pushData(this._links.profile, 'PATCH', data);
    }

    avatarEdit(data) {            
        return this._pushData(this._links.avatar, 'PATCH', data);
    }

 
}





    