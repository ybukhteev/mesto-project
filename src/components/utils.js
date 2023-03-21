export const settings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

export const popupConfig = {
  profilePopup: '.popup_edit-profile',
  popupUpdateAvatar:'.popup_update-avatar',
  cardPopup: '.popup_add-card',
  popupImgs: '.popup_imgs',
}

export const renderLoading = (popup, isLoading = false) => {
  const button = popup.querySelector('.form__submit');
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
};
