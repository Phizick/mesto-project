import { keyClose, overlayClose } from "./units";

const openPopup = (item => {
    item.classList.add("popup_opened");
    item.addEventListener("click", overlayClose);
    document.addEventListener("keydown", keyClose);       
});

const closePopup = (item => {
    item.classList.remove("popup_opened");
    document.removeEventListener("keydown", keyClose);
    item.removeEventListener("click", overlayClose);
});

export { openPopup, closePopup };
