import $ from 'jquery';
import sum from './utils/sum/sum';
const startButton = document.getElementById('start-button')! as HTMLElement;
const cardsContainer = document.getElementById('cards-container')! as HTMLElement;
const timerElement = document.getElementById('timer-count')! as HTMLElement;
let timerCount = 0;
let intervalID: number | undefined;

startButton.addEventListener('click', startGame);

function startGame() {
    resetGame(); 
    startTimer();
    showCards();
}

function startTimer() {
    if (intervalID !== undefined) {
        clearInterval(intervalID); 
    }
    timerCount = 0;
    timerElement.textContent = timerCount.toString();
    intervalID = window.setInterval(() => {
        timerCount++;
        timerElement.textContent = timerCount.toString();
    }, 1000);
}

function showCards() {
    cardsContainer.classList.remove('hidden');
}

const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
    const htmlCard = card as HTMLElement;

    htmlCard.addEventListener('click', () => {
        const color = htmlCard.getAttribute('data-color');
        if (color) {
            htmlCard.style.backgroundColor = color;
            checkMatch();
        }
    });
});

function checkMatch() {
    const selectedCards = Array.from(cards).filter(card => 
        (card as HTMLElement).style.backgroundColor !== ''
    );
    if (selectedCards.length === 2) {
        if (selectedCards[0].getAttribute('data-color') === selectedCards[1].getAttribute('data-color')) {
            setTimeout(() => {
                alert('Match found!');
                resetGame();
            }, 500);
        } else {
            setTimeout(() => {
                selectedCards.forEach(card => {
                    (card as HTMLElement).style.backgroundColor = '';
                });
            }, 500);
        }
    }
}

function resetGame() {
    if (intervalID !== undefined) {
        clearInterval(intervalID);
    }
    timerCount = 0;
    timerElement.textContent = '0';
    cards.forEach((card) => {
        const htmlCard = card as HTMLElement;
        htmlCard.style.backgroundColor = '';
    });
}
