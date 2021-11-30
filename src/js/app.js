import GamePlay from './GamePlay';

const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.querySelector('#game-container'));
gamePlay.drawBoard();
setInterval(() => { gamePlay.randomSpawn(gamePlay.getNewPosition()); }, 1000);
