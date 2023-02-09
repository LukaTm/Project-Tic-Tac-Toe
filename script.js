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
    return { ChangePlayer }
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
                    if (square.id)
                        return;
                    else{
						// Adds ID with same Number as class | Can track player position
                        square.setAttribute('id', `id${classNumber}p${whichPlayer}`);

						// Change player turn 
						const { ChangePlayer } = GamePlay();
                        square.textContent = ChangePlayer(whichPlayer)
						whichPlayer === 1? whichPlayer = 2 : whichPlayer = 1

                    }
            }
            });
    });
};

GameBoardContents()