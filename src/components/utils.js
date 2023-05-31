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
  popupUpdateAvatar: '.popup_update-avatar',
  cardPopup: '.popup_add-card',
  popupImgs: '.popup_imgs',
}

const btnTextLoaderConfig = {
  btnTextOriginal: "",
  btnTextLoading: "Сохранение ...",
};

const storeOriginalText = (btnSubmitElement) => {
  btnTextLoaderConfig.btnTextOriginal = btnSubmitElement.textContent;
};

const showPreloader = (btnSubmitElement) => {
  storeOriginalText(btnSubmitElement);
  return (btnSubmitElement.textContent = btnTextLoaderConfig.btnTextLoading);
};

const hidePreloader = (btnSubmitElement) => {
  return (btnSubmitElement.textContent = btnTextLoaderConfig.btnTextOriginal);
};

export { showPreloader, hidePreloader };