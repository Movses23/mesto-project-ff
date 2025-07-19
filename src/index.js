import "./pages/index.css";
import { createCard, deleteCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  functionOfListener,
} from "./components/modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getUserProfile,
  getInitialCards,
  updateUserProfile,
  addCard,
  toggleLikePromise,
  deleteCardApi,
  updateUserAvatar,
} from "./api.js";

const allCards = document.querySelector(".places__list");
const popupEditProfile = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const popupAddCard = document.querySelector(".popup_type_new-card");
const addButton = document.querySelector(".profile__add-button");
const formEditProfile = document.querySelector(".popup__form-profile");
const formElementCard = document.querySelector(".popup__form-card");
const popupImage = document.querySelector(".popup_type_image");
const modalImage = popupImage.querySelector(".popup__image");
const modalCaption = popupImage.querySelector(".popup__caption");
const nameDisplayElement = document.querySelector(".profile__title");
const jobDisplayElement = document.querySelector(".profile__description");
const nameInputCard = formElementCard.querySelector(
  ".popup__input_type_card-name"
);
const linkInput = formElementCard.querySelector(".popup__input_type_url");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const popupConfirm = document.querySelector(".popup_type_delete");
const buttonConfirm = popupConfirm.querySelector(".popup__button_delete");
let cardToDelete;
let cardIdToDelete;
let currentUserId;
const profileImageDiv = document.querySelector(".profile__image");
const editAvatarButton = document.querySelector(".profile__edit-avatar");
const popupAvatar = document.querySelector(".popup_type-avatar");
const formAvatar = document.querySelector(".popup__form-avatar");
const inputAvatarLink = formAvatar.querySelector(".popup__input_type_url");
const avatarSaveButton = formAvatar.querySelector(".popup__button");
const profileSaveButton = formEditProfile.querySelector(".popup__button");
const cardSaveButton = formElementCard.querySelector(".popup__button");

function renderButtonLoading(
  button,
  isLoading,
  isLoadingText = "Сохранение...",
  defaultText = "Сохранить"
) {
  if (isLoading) {
    button.textContent = isLoadingText;
    button.disabled = true;
  } else {
    button.textContent = defaultText;
    button.disabled = false;
  }
}

editButton.addEventListener("click", () => {
  renderButtonLoading(profileSaveButton, false);
});

addButton.addEventListener("click", () => {
  renderButtonLoading(cardSaveButton, false);
});
editAvatarButton.addEventListener("click", () => {
  renderButtonLoading(avatarSaveButton, false);
});

functionOfListener(popupEditProfile);
functionOfListener(popupAddCard);
functionOfListener(popupImage);
functionOfListener(popupConfirm);
functionOfListener(popupAvatar);

editButton.addEventListener("click", () => {
  clearValidation(formEditProfile, {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
  });

  openModal(popupEditProfile);
  const currentName = document.querySelector(".profile__title").textContent;
  const currentJob = document.querySelector(
    ".profile__description"
  ).textContent;
  nameInput.value = currentName;
  jobInput.value = currentJob;
  formEditProfile.addEventListener("submit", submitEditProfileForm);
});

addButton.addEventListener("click", () => {
  openModal(popupAddCard);
  formElementCard.addEventListener("submit", handleFormSubmitCard);
});

function openImage(addCard) {
  modalImage.src = addCard.link;
  modalImage.alt = addCard.name;
  modalCaption.textContent = addCard.name;

  openModal(popupImage);
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  renderButtonLoading(profileSaveButton, true);

  updateUserProfile(nameValue, jobValue)
    .then((userData) => {
      nameDisplayElement.textContent = userData.name;
      jobDisplayElement.textContent = userData.about;
      closeModal(popupEditProfile);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении данных пользователя:", error);
    })
    .finally(() => {
      renderButtonLoading(profileSaveButton, false);
    });
}

function handleFormSubmitCard(evt) {
  evt.preventDefault();

  const name = nameInputCard.value;
  const link = linkInput.value;

  renderButtonLoading(cardSaveButton, true);

  addCard(name, link)
    .then((serverCard) => {
      const card = createCard(
        serverCard,
        deleteCard,
        openImage,
        toggleLikePromise,
        currentUserId,
        openConfirmDeletePopup
      );
      allCards.prepend(card);
      closeModal(popupAddCard);
      formElementCard.reset();
      clearValidation(formElementCard, {
        inputSelector: ".popup__input",
        submitButtonSelector: ".popup__button",
        inactiveButtonClass: "popup__button_disabled",
      });
    })
    .catch((error) => console.error("Ошибка при добавлении карточки:", error))
    .finally(() => {
      renderButtonLoading(cardSaveButton, false);
    });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

getUserProfile()
  .then((userData) => {
    currentUserId = userData._id;
  })
  .catch((error) =>
    console.error("Ошибка при загрузке данных пользователя:", error)
  );

getInitialCards()
  .then((cardsData) => {
    cardsData.forEach((card) => {
      const newCard = createCard(
        card,
        deleteCard,
        openImage,
        toggleLikePromise,
        currentUserId,
        openConfirmDeletePopup
      );
      allCards.append(newCard);
    });
  })
  .catch((error) =>
    console.error("Ошибка при загрузке данных карточек:", error)
  );

function openConfirmDeletePopup(id, card) {
  cardToDelete = card;
  cardIdToDelete = id;
  openModal(popupConfirm);
}
buttonConfirm.addEventListener("click", () => {
  if (cardToDelete && cardIdToDelete) {
    deleteCardApi(cardIdToDelete)
      .then(() => {
        deleteCard(cardToDelete);
        closeModal(popupConfirm);
      })
      .catch((error) => console.error("Ошибка при удалении карточки:", error));
  }
});

editAvatarButton.addEventListener("click", () => {
  formAvatar.reset();
  clearValidation(formAvatar, {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  });
  openModal(popupAvatar);
});

formAvatar.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const avatarUrl = inputAvatarLink.value;
  renderButtonLoading(avatarSaveButton, true);
  updateUserAvatar(avatarUrl)
    .then((userData) => {
      profileImageDiv.style.backgroundImage = `url('${userData.avatar}')`;
      closeModal(popupAvatar);
      formAvatar.reset();
    })
    .catch((error) => {
      console.error("Ошибка загрузки аватара: " + error);
    })
    .finally(() => {
      renderButtonLoading(avatarSaveButton, false);
    });
});

getUserProfile()
  .then((userData) => {
    currentUserId = userData._id;
    profileImageDiv.style.backgroundImage = `url('${userData.avatar}')`;
    nameDisplayElement.textContent = userData.name;
    jobDisplayElement.textContent = userData.about;
  })
  .catch((error) =>
    console.error("Ошибка при загрузке данных пользователя:", error)
  );