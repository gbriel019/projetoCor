// Classe que representa o jogo "Adivinhe a Cor!"
class Game {
    constructor() {
        this.optionsCount = 4;  // Quantidade de opções
        this.colors = [];  // Array para armazenar as cores
        this.correctColor = null;  // Cor correta a ser adivinhada
        this.score = 0;  // Pontuação inicial
        this.round = 1;  // Rodada inicial
    }

    // Gera uma cor hexadecimal aleatória
    generateRandomColor() {
        const hex = Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
        return `#${hex.toUpperCase()}`;
    }

    // Inicia uma nova rodada com novas cores
    startNewRound() {
        this.colors = [];
        for (let i = 0; i < this.optionsCount; i++) {
            this.colors.push(this.generateRandomColor());
        }

        // Escolhe aleatoriamente a cor correta
        const randomIndex = Math.floor(Math.random() * this.colors.length);
        this.correctColor = this.colors[randomIndex];
    }
}

// Instancia o jogo
const game = new Game();

const colorCodeDisplay = document.getElementById('color-code');
const optionsContainer = document.getElementById('options-container');
const scoreDisplay = document.getElementById('score');
const roundDisplay = document.getElementById('round');
const feedbackMessage = document.getElementById('feedback-message');
const resetButton = document.getElementById('reset-button');

// Função para renderizar o jogo na tela
function renderGame(game) {
    scoreDisplay.textContent = game.score;
    roundDisplay.textContent = game.round;
    colorCodeDisplay.textContent = game.correctColor;
    
    // Limpa as opções anteriores
    optionsContainer.innerHTML = '';

    // Cria as novas opções de cor
    game.colors.forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.classList.add('color-option');
        colorOption.style.backgroundColor = color;
        colorOption.dataset.color = color;
        
        // Adiciona as opções ao container
        optionsContainer.appendChild(colorOption);
    });
}

// Evento de clique nas opções de cor
optionsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('color-option')) {
        const selectedColor = e.target.dataset.color;

        // Verifica se a cor está correta
        if (selectedColor === game.correctColor) {
            feedbackMessage.textContent = 'Correto!';
            game.score++;  // Incrementa a pontuação
        } else {
            feedbackMessage.textContent = 'Incorreto!';
        }

        // Exibe o botão "Próxima Rodada"
        resetButton.classList.add('visible');
    }
});

// Evento de clique no botão "Próxima Rodada"
resetButton.addEventListener('click', function () {
    game.round++;  // Incrementa a rodada
    game.startNewRound();  // Gera novas cores
    renderGame(game);  // Atualiza o jogo
    feedbackMessage.textContent = '';  // Limpa a mensagem de feedback
    resetButton.classList.remove('visible');  // Esconde o botão
});

// Inicializa o jogo assim que o DOM for carregado
document.addEventListener('DOMContentLoaded', function () {
    game.startNewRound();
    renderGame(game);
});
