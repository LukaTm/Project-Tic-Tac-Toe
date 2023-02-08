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


// Render GameBoard on Webpage
const GameBoardContents = () => {
    const gameBoardDiv = document.querySelector("#gameboard");
    gameBoardDiv.textContent = Gameboard.getGameboard()
}

GameBoardContents()



