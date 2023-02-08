const Gameboard = (function() {
  let gameboard = ['X','X','X','O','O','O'];

  const setGameboard = function(newGameboard) {
    gameboard = newGameboard;
  };

  const getGameboard = function() {
    return gameboard;
  };

  return {
    setGameboard,
    getGameboard
  };
})();

// Game Logic

const GamePlay = () => {

};

// Render GameBoard on Webpage
const GameBoardContents = () => {
    const gameBoardDiv = document.querySelectorAll(".place");
    gameBoardDiv.textContent = Gameboard.getGameboard()
    
    // Event Listener for 3x3 Squares
    gameBoardDiv.forEach((square) => {
        square.addEventListener("click", () => {
            
        });

    });
}
GameBoardContents()






