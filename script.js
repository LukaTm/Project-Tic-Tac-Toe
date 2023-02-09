let gameArray = [];
let gameArray2player = [];

const GamePlay = () => {
    let player1Symbol = 'X'
    let player2Symbol = 'O'
    let player1Turn = true; 
    let player2Turn = false; 

    // Return symbol Based on whichPlayer turn
    const ChangePlayer = (whichPlayer) => {
		if (whichPlayer == 1){
			return player1Symbol;
		}
		else{
			return player2Symbol;
	}
    };

	const GameLogic = (whichPlayer,array) =>{
		let winCombos = [
			[1, 2, 3],[4, 5, 6],[7, 8, 9],[1, 4, 7],[2, 5, 8],[3, 6, 9],[1, 5, 9],[3, 5, 7],
		];
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
	const FindWinner = (playerWhoWon,array) =>{
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
				console.log(playerWhoWon)

			}
		});
	}

    // Plays the game AND displays it on Screen
    return { ChangePlayer ,GameLogic ,FindWinner}
}

// Render GameBoard on Webpage
const GameBoardContents = () => {
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

						// Change player turn 
						const { ChangePlayer, GameLogic, FindWinner} = GamePlay();
                        square.textContent = ChangePlayer(whichPlayer)

						if (whichPlayer === 1){
							GameLogic(whichPlayer,gameArray)
							FindWinner(whichPlayer,gameArray)
						}
						else{
							GameLogic(whichPlayer,gameArray2player)
							FindWinner(whichPlayer,gameArray2player)
						}
						whichPlayer === 1? whichPlayer = 2 : whichPlayer = 1
                    }
            }
            });
    });
};

GameBoardContents()