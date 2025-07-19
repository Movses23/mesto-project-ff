import {toggleLikePromise} from '../api.js';

const cardTemplate = document.querySelector('#card-template').content; 

function handleLike(cardId, isLiked, renderLikes) {
    console.log('Отправляем запрос с параметрами:', cardId, isLiked);
    toggleLikePromise(cardId, isLiked)
        .then((cards) => {
            console.log('Ответ сервера:', cards);
            renderLikes(cards);
        })
        .catch((error) => {
            console.error('Ошибка при toggle like:', error);
        });
};

function createCard(addCard, deleteCard, openImage, toggleLikePromise, currentUserId, openConfirmDeletePopup) {
    const cards = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cards.querySelector('.card__delete-button');
    const likeButton = cards.querySelector('.card__like-button');
    const cardImage = cards.querySelector('.card__image');
    const cardTitle = cards.querySelector('.card__title');
    const cardImageAlt = cards.querySelector('.card__image');
    const cardLikesNumber = cards.querySelector('.card__likes-count');

    cardImage.src = addCard.link;
    cardTitle.textContent = addCard.name;
    cardImageAlt.alt = `Название места: ${addCard.name}`;

    cardImage.addEventListener('click', () => openImage(addCard));

    renderLikes(addCard);

    if (addCard.owner._id === currentUserId) {
        deleteButton.style.display = 'block';
    } else {
        deleteButton.style.display = 'none';
    };
         
    deleteButton.addEventListener('click', () => {
    openConfirmDeletePopup(addCard._id, cards);
    });;

likeButton.addEventListener('click', () => {
        handleLike(addCard._id, likeButton.classList.contains('card__like-button_is-active'), renderLikes);
        likeButton.classList.toggle('card__like-button_is-active');
    });

function renderLikes(cards) {
    console.log('Полученные данные для обновления лайков:', cards);
    if (cards.likes) {
        const cardIsLiked = cards.likes.map((like) => like._id).includes(currentUserId);
        likeButton.classList.toggle('card__like-button_is-active', cardIsLiked);
        cardLikesNumber.textContent = cards.likes.length;
    } else {
        cardLikesNumber.textContent = 0;
    }
};

    return cards;
};
    
function deleteCard(cards) { 
    cards.remove();
};

export {createCard, deleteCard};