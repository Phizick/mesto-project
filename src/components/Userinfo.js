
export default class Userinfo {
    constructor({profileName, profileAbout, profileAvatar}) {
        this._profileName =  document.querySelector(profileName);
        this._profileAbout =  document.querySelector(profileAbout);
        this._profileAvatar = document.querySelector(profileAvatar);
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            about: this._profileAbout.textContent
        }
    }

    setUserInfo = ({name, about}) => {
        this._name = name;
        this._about = about;
        this._profileName.textContent = this._name;
        this._profileAbout.textContent = this._about;
    }

    setUserAvatar = ({avatar}) => {
        this._avatar = avatar;
        this._profileAvatar.src = this._avatar;
    }
}

