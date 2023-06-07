let gameArray = [];
let gameArray2player = [];

let p1Name = "Player 1";
let p2Name = "Player 2";

const GameBoardContents = () => {
    let player1Turn = true;
    let player2Turn = false;

    const GameLogic = (whichPlayer, array) => {
        // Adds game id and which player to gameArray
        for (let x = 1; x < 10; x++) {
            const gameBoardPlayerPosition = document.querySelector(
                `#id${x}p${whichPlayer}`
            );
            if (gameBoardPlayerPosition == null) {
                continue;
            }
            // So it doesnt add Duplicates in array
            else if (array.includes(gameBoardPlayerPosition.id)) {
                continue;
            } else {
                array.push(gameBoardPlayerPosition.id);
            }
        }
    };

    // FindS Winner
    const FindWinner = (playerWhoWon, array, name1, name2) => {
        // Tie Display
        const tieText = document.querySelector(".tie-score");
        const player1Score = document.querySelector(".player1-score");
        const player2Score = document.querySelector(".player2-score");
        const prevValueTie = tieText.textContent;
        const prevValueP1 = player1Score.textContent;
        const prevValueP2 = player2Score.textContent;
        let DrawOnNine = 1;
        let winCombos = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7],
        ];
        let arrayToCompare = [];

        // Pushes players markers ID to arrayToCompare
        array.forEach((placedId) => {
            const compareToWinCombos = placedId.slice(2, 3);
            arrayToCompare.push(Number(compareToWinCombos));
        });
        // Checks if anyone WON with arrayToCompare and WinCombos
        winCombos.forEach((oneWinCombo) => {
            if (oneWinCombo.every((val) => arrayToCompare.includes(val))) {
                document.querySelector(".board *").style.pointerEvents = "none";
                if (playerWhoWon === 1) {
                    const crossLine = document.querySelector(".cross-line");
                    const AddLine = (className) => {
                        crossLine.classList.add(className);
                    };

                    switch (oneWinCombo.toString()) {
                        case "1,4,7":
                            AddLine("left");
                            break;
                        case "2,5,8":
                            AddLine("middle");
                            break;
                        case "3,6,9":
                            AddLine("right");
                            break;
                        case "1,5,9":
                            AddLine("left-to-right");
                            break;
                        case "3,5,7":
                            AddLine("right-to-left");
                            break;
                        case "1,2,3":
                            AddLine("first");
                            break;
                        case "4,5,6":
                            AddLine("second");
                            break;
                        case "7,8,9":
                            AddLine("third");
                            break;
                    }

                    player1Score.textContent = Number(prevValueP1) + 1;
                } else {
                    const crossLine = document.querySelector(".cross-line");
                    const AddLine = (className) => {
                        crossLine.classList.add(className);
                    };
                    player2Score.textContent = Number(prevValueP2) + 1;
                    switch (oneWinCombo.toString()) {
                        case "1,4,7":
                            AddLine("left");
                            break;
                        case "2,5,8":
                            AddLine("middle");
                            break;
                        case "3,6,9":
                            AddLine("right");
                            break;
                        case "1,5,9":
                            AddLine("left-to-right");
                            break;
                        case "3,5,7":
                            AddLine("right-to-left");
                            break;
                        case "1,2,3":
                            AddLine("first");
                            break;
                        case "4,5,6":
                            AddLine("second");
                            break;
                        case "7,8,9":
                            AddLine("third");
                            break;
                    }
                }
            } else {
                DrawOnNine += 1;
            }
        });
        if (
            gameArray.length + gameArray2player.length === 9 &&
            DrawOnNine === 9
        ) {
            // SHOW DRAW ON SCREEN
            tieText.textContent = Number(prevValueTie) + 1;
            document.querySelector(".board *").style.pointerEvents = "none";
        }
    };
    // Resets ALL values of Game
    const resetGame = () => {
        // Remove Winner Outline
        const outline = document.querySelector(".cross-line");
        if (outline) {
            const classes = outline.classList;
            for (let i = classes.length - 1; i >= 0; i--) {
                const className = classes[i];
                if (className !== "cross-line") {
                    outline.classList.remove(className);
                }
            }
        }
        gameArray = [];
        gameArray2player = [];
        player1Turn = true;
        player2Turn = false;
        const gameBoardDiv = document.querySelectorAll(".place");
        gameBoardDiv.forEach((square) => {
            square.removeAttribute("id");
            square.textContent = "";
            square.classList.remove("x");
            square.classList.remove("circle");
        });
        const winnerText = document.querySelector("#game-result");
        winnerText.textContent = "";
        document.querySelector(".board *").style.pointerEvents = "auto";
    };

    return { GameLogic, FindWinner, resetGame };
};

// Render GameBoard on Webpage
const GamePlay = () => {
    const gameBoardDiv = document.querySelectorAll(".place");
    let whichPlayer = 1;
    // Event Listener for 3x3 Squares
    gameBoardDiv.forEach((square) => {
        square.addEventListener("click", () => {
            for (let x = 0; x < 10; x++) {
                let name1 = p1Name;
                let name2 = p2Name;
                const classList = square.classList;
                const secondClass = classList[1];
                const classNumber = secondClass.slice(-1);

                // if ID already exists dont add new one
                if (square.id) {
                    return;
                } else {
                    // Adds ID with same Number as class | Can track player position
                    square.setAttribute(
                        "id",
                        `id${classNumber}p${whichPlayer}`
                    );
                    square.classList.add("markers-style");

                    // Display Figure on Board
                    const ChangePlayer = () => {
                        if (whichPlayer == 1) {
                            square.classList.add("x");
                        } else {
                            square.classList.add("circle");
                        }
                    };
                    ChangePlayer();

                    const { GameLogic, FindWinner } = GameBoardContents();

                    if (whichPlayer === 1) {
                        GameLogic(whichPlayer, gameArray);
                        FindWinner(whichPlayer, gameArray, name1, name2);
                    } else {
                        GameLogic(whichPlayer, gameArray2player);
                        FindWinner(whichPlayer, gameArray2player, name1, name2);
                    }
                    whichPlayer === 1 ? (whichPlayer = 2) : (whichPlayer = 1);
                }
            }
        });
    });
};

// Start game
GamePlay();

// Reset game Button
const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", () => {
    GameBoardContents().resetGame();
});
