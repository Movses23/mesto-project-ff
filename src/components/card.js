const cardTemplate = document.querySelector("#card-template").content;

function createCard(
  addCard,
  deleteCard,
  openImage,
  handleLike,
  currentUserId,
  openConfirmDeletePopup
) {
  const cards = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cards.querySelector(".card__delete-button");
  const likeButton = cards.querySelector(".card__like-button");
  const cardImage = cards.querySelector(".card__image");
  const cardTitle = cards.querySelector(".card__title");
  const cardImageAlt = cards.querySelector(".card__image");
  const cardLikesNumber = cards.querySelector(".card__likes-count");

  cardImage.src = addCard.link;
  cardTitle.textContent = addCard.name;
  cardImageAlt.alt = `Название места: ${addCard.name}`;

  cardImage.addEventListener("click", () => openImage(addCard));

  renderLikes(addCard);

  if (addCard.owner._id === currentUserId) {
    deleteButton.style.display = "block";
  } else {
    deleteButton.style.display = "none";
  }

  deleteButton.addEventListener("click", () => {
    openConfirmDeletePopup(addCard._id, cards);
  });

  function renderLikes(cardData) {
    const isLiked = cardData.likes.some((like) => like._id === currentUserId);
    likeButton.classList.toggle("card__like-button_is-active", isLiked);
    cardLikesNumber.textContent = cardData.likes.length;
  }

  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.classList.contains(
      "card__like-button_is-active"
    );
    handleLike(addCard._id, isLiked, renderLikes);
  });

  return cards;
};

function deleteCard(cards) {
  cards.remove();
};

export { createCard, deleteCard };