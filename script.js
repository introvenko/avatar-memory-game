const cards = Array.from(document.querySelectorAll(".card"));
const playingCard = document.querySelector('.cards');

let flippedCards = []; // Масив для збереження відкритих карток
let lockBoard = false; // Блокування дошки під час перевірки

// Перемішування карток
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

// Перевірка на збіг відкритих карток
function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.querySelector('.front').src === secondCard.querySelector('.front').src) {
        // Якщо картки співпадають, залишаємо їх відкритими
        flippedCards = [];
        return;
    }
    
    // Якщо картки не співпадають, закриваємо їх після короткої затримки
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        flippedCards = [];
        lockBoard = false;
    }, 1000);
}

// Обробник натискання на картку
function flipCard() {
    if (lockBoard) return; // Забороняємо перевертати інші картки під час перевірки
    if (this === flippedCards[0]) return; // Забороняємо натискати на ту саму картку двічі

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Додаємо обробник до кожної картки
cards.forEach(card => card.addEventListener('click', flipCard));

shuffleBoard(); // Перемішуємо картки перед початком гри