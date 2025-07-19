const handleEscKeyUp = (esc) => {
    if(esc.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    }
};

export const openModal = (modal) => {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keyup', handleEscKeyUp);
};

export const closeModal = (modal) => {
 modal.classList.remove('popup_is-opened');
 document.removeEventListener('keyup', handleEscKeyUp);
};

export const functionOfListener = (elementPopup) => {
 const closeButton = elementPopup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => {
    closeModal(elementPopup);
  });

  elementPopup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup')) {
        closeModal(elementPopup);
    }
  });
};