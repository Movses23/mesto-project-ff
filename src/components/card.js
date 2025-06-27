const cardTemplate = document.querySelector('#card-template').content; 

function createCard (addCard, deleteCard, openImage, likeCard) { 
    const cards = cardTemplate.querySelector('.card').cloneNode(true); 
    const deleteButton = cards.querySelector('.card__delete-button');
    const likeButton = cards.querySelector('.card__like-button');
    const cardImage = cards.querySelector('.card__image');
    const cardTitle = cards.querySelector('.card__title');
    const cardImageAlt = cards.querySelector('.card__image');

    cardImage.src = addCard.link;
    cardTitle.textContent = addCard.name;
    cardImageAlt.alt = `Название места: ${addCard.name}`;
    
    likeButton.addEventListener('click', likeCard = (evt) =>
    evt.target.classList.toggle('card__like-button_is-active'));

    cardImage.addEventListener('click', () => openImage (addCard));

    deleteButton.addEventListener('click', (evt) => { 
        deleteCard(cards); 
    });

    return cards; 
};

function deleteCard(cards) { 
    cards.remove();
};

export {createCard, deleteCard};