const profileSelector = {
    profileName: ".profile__name-text", // фио профайла
    profileAbout: ".profile__bio",      // профессия
    profileAvatar: '.rofile__avatar-image'
 };


export default class Userinfo {
    constructor(profileSelector) {
        this._profileName = profileSelector.profileName;
        this._profileAbout = profileSelector.profileAbout;
        this._profileAvatar = profileSelector.profileAvatar;
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