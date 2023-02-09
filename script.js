let gameArray = [];
let gameArray2player = [];

const GameBoardContents = () => {
    let player1Turn = true; 
    let player2Turn = false; 

	const GameLogic = (whichPlayer,array) =>{
		// Adds game id and which player to gameArray
		for (let x = 1; x < 10; x++){
			const gameBoardPlayerPosition = document.querySelector(`#id${x}p${whichPlayer}`);
			if (gameBoardPlayerPosition == null){
				continue
			}
			// So it doesnt add Duplicates in array 
			else if (array.includes(gameBoardPlayerPosition.id)){
				continue;
			}
			else{
				array.push(gameBoardPlayerPosition.id)
		}
		}
	}

	// FindS Winner 
	const FindWinner = (playerWhoWon,array,name1,name2) =>{
		// Tie Display
		const winnerText = document.querySelector('#game-result')
		if (gameArray.length + gameArray2player.length === 9){
			winnerText.textContent = `Tie`
		}
		else{
		let winCombos = [
			[1, 2, 3],[4, 5, 6],[7, 8, 9],[1, 4, 7],[2, 5, 8],[3, 6, 9],[1, 5, 9],[3, 5, 7],
		];
		let arrayToCompare = [];

		// Pushes players markers ID to arrayToCompare
		array.forEach((placedId) => {
			const compareToWinCombos = placedId.slice(2,3)
			arrayToCompare.push(Number(compareToWinCombos))
	});
		// Checks if anyone WON with arrayToCompare and WinCombos
		winCombos.forEach((oneWinCombo) => {
			if (oneWinCombo.every(val => arrayToCompare.includes(val))){
				if (playerWhoWon === 1){
				winnerText.textContent = `Congrats ${name1}`
				}
				else{
					winnerText.textContent = `Congrats ${name2}`
				}
				document.getElementById("gameboard").style.pointerEvents = "none";
				
			}
		});
	}
	}
	// Resets ALL values of Game
	const resetGame = () => {
		gameArray = [];
		gameArray2player = [];
		player1Turn = true; 
		player2Turn = false;
		const gameBoardDiv = document.querySelectorAll(".place");
		gameBoardDiv.forEach((square) => {
			square.removeAttribute('id');
			square.textContent = '';
			square.classList.remove('x')
			square.classList.remove('circle')
		});
		const winnerText = document.querySelector('#game-result');
		winnerText.textContent = '';
		document.getElementById("gameboard").style.pointerEvents = "auto";
	};

    return { GameLogic ,FindWinner, resetGame}
}

// Render GameBoard on Webpage
const GamePlay = (name1,name2) => {
    const gameBoardDiv = document.querySelectorAll(".place");
	let whichPlayer = 1
    // Event Listener for 3x3 Squares
    gameBoardDiv.forEach((square) => {
        square.addEventListener("click", () => {
                for (let x = 0;x < 10;x++){
                    const classList = square.classList;
                    const secondClass = classList[1];
                    const classNumber = secondClass.slice(-1);

                    // if ID already exists dont add new one
                    if (square.id){
                        return;
					}
                    else{
						// Adds ID with same Number as class | Can track player position
                        square.setAttribute('id', `id${classNumber}p${whichPlayer}`);
						square.classList.add("markers-style");

						// Display Figure on Board
						const ChangePlayer = () => {
							if (whichPlayer == 1){
								square.classList.add('x')
							}
							else{
								square.classList.add('circle')
						}
						};
						ChangePlayer()


						const { GameLogic, FindWinner } = GameBoardContents();

						if (whichPlayer === 1){
							GameLogic(whichPlayer,gameArray)
							FindWinner(whichPlayer,gameArray,name1,name2)
						}
						else{
							GameLogic(whichPlayer,gameArray2player)
							FindWinner(whichPlayer,gameArray2player,name1,name2)
						}
						whichPlayer === 1? whichPlayer = 2 : whichPlayer = 1
                    }
            }
            });
    });
};


// EVENT LISTENERS

let p1Name = ''
let p2Name = ''
// Names Submit
const getNames = document.querySelector('#player-form')
const getPlayer1Input = document.querySelector('#player1')
const getPlayer2Input = document.querySelector('#player2')

getNames.addEventListener('submit', function(event) {
	event.preventDefault();
	const player1Name = document.querySelector('#player1').value
	const player2Name = document.querySelector('#player2').value
	p1Name = player1Name
	p2Name = player2Name
	getPlayer1Input.value = ''
	getPlayer2Input.value = ''
});

// Start game Button
const startButton = document.querySelector('#start-button');
		startButton.addEventListener("click", () => {
			GamePlay(p1Name,p2Name)
		});
// Reset game Button
const restartButton = document.querySelector('#restart-button');
restartButton.addEventListener("click", () => {
	GameBoardContents().resetGame()
});

