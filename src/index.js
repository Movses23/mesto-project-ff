import {initialCards} from './cards.js';
import './pages/index.css';
import {createCard, deleteCard} from './components/card.js';
import {openModal, closeModal, functionOfListener} from './components/modal.js';

const allCards = document.querySelector('.places__list');
const popupEditProfile = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');
const formEditProfile = document.querySelector('.popup__form-profile');
const formElementCard = document.querySelector('.popup__form-card');
const popupImage = document.querySelector('.popup_type_image');
const modalImage = popupImage.querySelector('.popup__image');
const modalCaption = popupImage.querySelector('.popup__caption');
const nameDisplayElement = document.querySelector('.profile__title');
const jobDisplayElement = document.querySelector('.profile__description');
const nameInputCard = formElementCard.querySelector('.popup__input_type_card-name');
const linkInput = formElementCard.querySelector('.popup__input_type_url');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');

initialCards.forEach((item) => {
    const card = createCard(item, deleteCard, openImage);
    allCards.append(card);
});

functionOfListener(popupEditProfile);
functionOfListener(popupAddCard);
functionOfListener(popupImage);

editButton.addEventListener('click', () => {
  openModal(popupEditProfile);
  const currentName = document.querySelector('.profile__title').textContent;
  const currentJob = document.querySelector('.profile__description').textContent;
  nameInput.value = currentName;
  jobInput.value = currentJob;
  formEditProfile.addEventListener('submit', submitEditProfileForm);
});

addButton.addEventListener('click', () => {
  openModal(popupAddCard);
  formElementCard.addEventListener('submit', handleFormSubmitCard);
});

function openImage (addCard) {

  modalImage.src = addCard.link;
  modalImage.alt = addCard.name;
  modalCaption.textContent = addCard.name;

  openModal(popupImage);
};

function submitEditProfileForm(evt) {
    evt.preventDefault(); 

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    
    nameDisplayElement.textContent = nameValue;
    jobDisplayElement.textContent = jobValue;

    closeModal(popupEditProfile);
};

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