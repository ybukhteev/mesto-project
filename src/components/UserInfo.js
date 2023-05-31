export default class UserInfo {
  constructor({ profileName, profileStatus, profileAvatar }) {
    this.profileName = profileName;
    this.profileStatus = profileStatus;
    this.profileAvatar = profileAvatar;
  }

  getUserInfo() {
    return {
      username: this.name,
      status: this.about,
      avatar: this.avatar,
      _id: this._id
    };
  }

  _updateAvatar() {
    this.profileAvatar.src = this.avatar;
  }

  _updateUserInfo() {
    this.profileName.textContent = this.name;
    this.profileStatus.textContent = this.about;
  }

  setUserInfo({ name, about, avatar, _id }) {
    this.name = name;
    this.about = about;
    this.avatar = avatar;
    this._userId = _id;

    this._updateUserInfo();
    this._updateAvatar();
  }
}