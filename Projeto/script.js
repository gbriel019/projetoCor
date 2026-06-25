
class Game {
    constructor() {
        this.optionsCount = 4;  
        this.colors = [];  
        this.correctColor = null;  
        this.score = 0;  
        this.round = 1;  
    }

    // gera uma cor hexadecimal aleatória
    generateRandomColor() {
        const hex = Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
        return `#${hex.toUpperCase()}`;
    }

    
    startNewRound() {
        this.colors = [];
        for (let i = 0; i < this.optionsCount; i++) {
            this.colors.push(this.generateRandomColor());
        }

        
        const randomIndex = Math.floor(Math.random() * this.colors.length);
        this.correctColor = this.colors[randomIndex];
    }
}


const game = new Game();

const colorCodeDisplay = document.getElementById('color-code');
const optionsContainer = document.getElementById('options-container');
const scoreDisplay = document.getElementById('score');
const roundDisplay = document.getElementById('round');
const feedbackMessage = document.getElementById('feedback-message');
const resetButton = document.getElementById('reset-button');


function renderGame(game) {
    scoreDisplay.textContent = game.score;
    roundDisplay.textContent = game.round;
    colorCodeDisplay.textContent = game.correctColor;
    
    
    optionsContainer.innerHTML = '';

    
    game.colors.forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.classList.add('color-option');
        colorOption.style.backgroundColor = color;
        colorOption.dataset.color = color;
        
        
        optionsContainer.appendChild(colorOption);
    });
}


optionsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('color-option')) {
        const selectedColor = e.target.dataset.color;

        
        if (selectedColor === game.correctColor) {
            feedbackMessage.textContent = 'Correto!';
            game.score++;  
        } else {
            feedbackMessage.textContent = 'Incorreto!';
        }

        
        resetButton.classList.add('visible');
    }
});


resetButton.addEventListener('click', function () {
    game.round++;  
    game.startNewRound();  
    renderGame(game);  
    feedbackMessage.textContent = '';  
    resetButton.classList.remove('visible');  
});


document.addEventListener('DOMContentLoaded', function () {
    game.startNewRound();
    renderGame(game);
});
