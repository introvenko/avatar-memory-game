const cards = Array.from(document.querySelectorAll(".card"));
const playingCard = document.querySelector('.cards');
let flippedCards = [];
let lockBoard = false;
let matchedCards = 0;

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

function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.querySelector('.front').src === secondCard.querySelector('.front').src) {
        matchedCards += 2;
        flippedCards = [];
        return;
    }
    
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        flippedCards = [];
        lockBoard = false;
    }, 1000);
}

function checkGameOver() {
    if (matchedCards === 20) {
        alert("Bumi is proud of your work.");
    } else {
        alert("Not your day. Someone destroyed your cabbage cart again.");
    }
    lockBoard = true;
}

function flipCard() {
    if (lockBoard) return; // Забороняю перевертати інші картки під час перевірки
    if (this === flippedCards[0]) return; // Забороняю натискати на ту саму картку двічі

    this.classList.add('flipped');
    flippedCards.push(this);

    if (this.querySelector('.back').classList.contains('special')) {
        if (matchedCards === 20) {
            alert("You won! All pairs have been found and you have opened a special card. Bumi is proud of your work.");
        } else {
            alert("You lost! You opened a special card before you found all the pairs.");
        }
        lockBoard = true;
        return;
    }

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));

shuffleBoard();
