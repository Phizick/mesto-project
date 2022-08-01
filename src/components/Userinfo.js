
export default class Userinfo {
    constructor(userDataValues) {
        this._profileUserName =  document.querySelector(userDataValues.profileUserName);
        this._profileUserAbout =  document.querySelector(userDataValues.profileUserAbout);
        this._profileUserAvatar = document.querySelector(userDataValues.profileUserAvatar);
    }

    getUserInfo() {
        return {
            name: this._profileUserName.textContent,
            about: this._profileUserAbout.textContent
        }
    }

    setUserInfo(userData) {
        this._name = userData.name;
        this._about = userData.about;
        this._profileUserName.textContent = this._name;
        this._profileUserAbout.textContent = this._about;
    }

    setUserAvatar(userData) {
        this._avatar = userData.avatar;
        this._profileUserAvatar.src = this._avatar;
    }
}
