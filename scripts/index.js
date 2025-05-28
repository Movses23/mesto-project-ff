// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const cardTemplate = document.querySelector('#card-template').content;
const allCards = document.querySelector('.places__list');

initialCards.forEach(function(item) {
    const card = createCard(item, deleteCard);
    allCards.append(card);
});


function createCard (cardsContent, deleteCard) {
    
    const cardsElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardsElement.querySelector('.card__delete-button');

    cardsElement.querySelector('.card__title').textContent = cardsContent.name;
    cardsElement.querySelector('.card__image').src = cardsContent.link;
    cardsElement.querySelector('.card__image').alt = `Фотография места: ${cardsContent.name}`;

    deleteButton.addEventListener('click', function (evt) {
        deleteCard(cardsElement);
    });

    return cardsElement;
}


function deleteCard(cardsElement) {
    cardsElement.remove();
}
