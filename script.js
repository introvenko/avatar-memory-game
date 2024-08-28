const back = document.querySelector('.back');
const cards = Array.from(document.querySelectorAll(".card"));
const playingCard = document.querySelector('.cards')

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function shuffleBoard() {
    const shuffledCards = shuffle(cards);
    shuffledCards.forEach((card) => playingCard.appendChild(card));
}

shuffleBoard();

