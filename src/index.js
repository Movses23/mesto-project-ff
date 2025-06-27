const allCards = document.querySelector('.places__list');
const popupEditProfile = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');
const formElement = document.querySelector('.popup__form');
const formElementCard = document.querySelector('.popup__form-card');

initialCards.forEach((item) => {
    const card = createCard(item, deleteCard, openImage);
    allCards.append(card);
});

functionOfListener(popupEditProfile);
functionOfListener(popupAddCard);

editButton.addEventListener('click', () => {
  openModal(popupEditProfile);
  const currentName = document.querySelector('.profile__title').textContent;
  const currentJob = document.querySelector('.profile__description').textContent;
  nameInput.value = currentName;
  jobInput.value = currentJob;
  formElement.addEventListener('submit', handleFormSubmit);
});

addButton.addEventListener('click', () => {
  openModal(popupAddCard);
  formElementCard.addEventListener('submit', handleFormSubmitCard);
});

function openImage (addCard) {
  const popupImage = document.querySelector('.popup_type_image');
  const modalImage = popupImage.querySelector('.popup__image');
  const modalCaption = popupImage.querySelector('.popup__caption');

  functionOfListener(popupImage);

  modalImage.src = addCard.link;
  modalImage.alt = addCard.name;
  modalCaption.textContent = addCard.name;

  openModal(popupImage);
};

const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

function handleFormSubmit(evt) {
    evt.preventDefault(); 

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    const nameDisplayElement = document.querySelector('.profile__title');
    const jobDisplayElement = document.querySelector('.profile__description');

    nameDisplayElement.textContent = nameValue;
    jobDisplayElement.textContent = jobValue;

    popupEditProfile.classList.remove('popup_is-opened');
};

const nameInputCard = formElementCard.querySelector('.popup__input_type_card-name');
const linkInput = formElementCard.querySelector('.popup__input_type_url');

function handleFormSubmitCard(evt) {
    evt.preventDefault(); 

    const name = nameInputCard.value;
    const link = linkInput.value;

    const newCard = createCard({ name, link }, deleteCard, openImage);

    allCards.prepend(newCard);

    closeModal(popupAddCard);

    nameInputCard.value = '';
    linkInput.value = '';
};

import {initialCards} from './cards.js';
import './pages/index.css';
import {createCard, deleteCard} from './components/card.js';
import {openModal, closeModal, functionOfListener} from './components/modal.js';