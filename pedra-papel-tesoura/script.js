// ========================================
// ELEMENTOS DO HTML
// ========================================

const playerScoreElement =
    document.getElementById("playerScore");

const computerScoreElement =
    document.getElementById("computerScore");

const resultTitle =
    document.getElementById("resultTitle");

const playerMoveElement =
    document.getElementById("playerMove");

const computerMoveElement =
    document.getElementById("computerMove");

const messageElement =
    document.getElementById("message");

const resetButton =
    document.getElementById("resetButton");

const historyList =
    document.getElementById("historyList");

const choiceButtons =
    document.querySelectorAll(".choice");


// ========================================
// VARIÁVEIS DO JOGO
// ========================================

let playerScore = 0;
let computerScore = 0;

const choices = [
    "pedra",
    "papel",
    "tesoura"
];

const icons = {
    pedra: "🪨",
    papel: "📄",
    tesoura: "✂️"
};


// ========================================
// ESCOLHER JOGADA DO COMPUTADOR
// ========================================

function getComputerChoice() {

    const randomIndex =
        Math.floor(
            Math.random() * choices.length
        );

    return choices[randomIndex];
}


// ========================================
// VERIFICAR VENCEDOR
// ========================================

function getWinner(player, computer) {

    // Empate
    if (player === computer) {
        return "empate";
    }

    // Jogador vence
    if (
        (player === "pedra" &&
            computer === "tesoura") ||

        (player === "papel" &&
            computer === "pedra") ||

        (player === "tesoura" &&
            computer === "papel")
    ) {
        return "jogador";
    }

    // Computador vence
    return "computador";
}


// ========================================
// INICIAR RODADA
// ========================================

function playRound(playerChoice) {

    const computerChoice =
        getComputerChoice();

    const winner =
        getWinner(
            playerChoice,
            computerChoice
        );


    // Mostrar escolhas
    playerMoveElement.textContent =
        icons[playerChoice];

    computerMoveElement.textContent =
        icons[computerChoice];


    // Limpar classes anteriores
    messageElement.classList.remove(
        "win",
        "lose",
        "draw"
    );


    // ====================================
    // JOGADOR VENCE
    // ====================================

    if (winner === "jogador") {

        playerScore++;

        resultTitle.textContent =
            "🎉 Você venceu!";

        messageElement.textContent =
            `${capitalize(playerChoice)}
            vence
            ${capitalize(computerChoice)}!`;

        messageElement.classList.add("win");

        addHistory(
            `Você venceu: ${icons[playerChoice]}
            ${playerChoice} ×
            ${icons[computerChoice]}
            ${computerChoice}`
        );
    }


    // ====================================
    // COMPUTADOR VENCE
    // ====================================

    else if (winner === "computador") {

        computerScore++;

        resultTitle.textContent =
            "😢 Você perdeu!";

        messageElement.textContent =
            `${capitalize(computerChoice)}
            vence
            ${capitalize(playerChoice)}!`;

        messageElement.classList.add("lose");

        addHistory(
            `Computador venceu:
            ${icons[playerChoice]}
            ${playerChoice} ×
            ${icons[computerChoice]}
            ${computerChoice}`
        );
    }


    // ====================================
    // EMPATE
    // ====================================

    else {

        resultTitle.textContent =
            "🤝 Empate!";

        messageElement.textContent =
            `Os dois escolheram
            ${capitalize(playerChoice)}.`;

        messageElement.classList.add("draw");

        addHistory(
            `Empate:
            ${icons[playerChoice]}
            ${playerChoice} ×
            ${icons[computerChoice]}
            ${computerChoice}`
        );
    }


    // Atualizar placar
    updateScore();
}


// ========================================
// ATUALIZAR PLACAR
// ========================================

function updateScore() {

    playerScoreElement.textContent =
        playerScore;

    computerScoreElement.textContent =
        computerScore;
}


// ========================================
// ADICIONAR AO HISTÓRICO
// ========================================

function addHistory(text) {

    const item =
        document.createElement("li");

    item.textContent = text;

    historyList.prepend(item);
}


// ========================================
// PRIMEIRA LETRA MAIÚSCULA
// ========================================

function capitalize(text) {

    return (
        text.charAt(0).toUpperCase() +
        text.slice(1)
    );
}


// ========================================
// REINICIAR JOGO
// ========================================

function resetGame() {

    playerScore = 0;
    computerScore = 0;

    updateScore();

    resultTitle.textContent =
        "Faça sua jogada!";

    playerMoveElement.textContent =
        "❔";

    computerMoveElement.textContent =
        "❔";

    messageElement.textContent =
        "Boa sorte! 🍀";

    messageElement.classList.remove(
        "win",
        "lose",
        "draw"
    );

    historyList.innerHTML = "";
}


// ========================================
// EVENTOS DOS BOTÕES
// ========================================

choiceButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const playerChoice =
                button.dataset.choice;

            playRound(playerChoice);
        }
    );

});


// ========================================
// BOTÃO REINICIAR
// ========================================

resetButton.addEventListener(
    "click",
    resetGame
);
