
// Game Logic
let whichPlayer = 1 // 1

const GamePlay = (num) => {
    let player1Symbol = 'X'
    let player2Symbol = 'O'
    let player1Turn = true; // false
    let player2Turn = false; // true
    // Change player Turn 
    const ChangePlayer = () => {
        if (player1Turn === true){
            player1Turn = false
            player2Turn = true
            console.log('p1')
        }
        else{
            player1Turn = true
            player2Turn = false
            console.log('p2')
        }   
    }

    const CheckTurn = () => {
        // Which player puts the marker down
        if (player1Turn){ // yes 
            whichPlayer = 1 
            console.log('first')
        }
        else{
            whichPlayer = 2
            console.log('second')
            console.log(player1Turn)

        }
        return player1Turn ? player1Symbol : player2Symbol // yes
    };


    // Plays the game AND displays it on Screen
    const PlayGame = () => {
        // Selects Players positions
        const gameBoardId = document.querySelectorAll(`#id${num}p1`);
        let threeInRowCheck = []
        gameBoardId.forEach((boardId) => {
            threeInRowCheck.push(boardId)
        });

        return CheckTurn()

    }
    ChangePlayer()

    // // Display Game on Board
    // const DisplayGameOnBoard = () => {
    //     console.log('succ')
    // }

    
    // Final Winner else keep playing
    // if (CheckWinner()){
    //     return 'HOray'
    // }
    // else{
    //     return 'keep playing'
    // }

    return { PlayGame,ChangePlayer}

}

// Render GameBoard on Webpage
const GameBoardContents = () => {
    const gameBoardDiv = document.querySelectorAll(".place");

    // Event Listener for 3x3 Squares
    // get class last index un for loop 
    let idNum = 1; // !!!!!!!!!!!!!!
    gameBoardDiv.forEach((square) => {
        square.addEventListener("click", () => {
                for (let x = 0;x < 10;x++){
                    const classList = square.classList;
                    const secondClass = classList[1];
                    const classNumber = secondClass.slice(-1);
                    // if ID already exists dont add new one
                    if (square.id)
                        return;
                    // Adds ID with same Number as class | Can track player position
                    else{
                        square.setAttribute('id', `id${classNumber}p${whichPlayer}`);
                        square.textContent = GamePlay(x).PlayGame();
                        idNum++;
                        // GamePlay().DisplayGameOnBoard()

                    }
            }
            });
    });
};

GameBoardContents()








