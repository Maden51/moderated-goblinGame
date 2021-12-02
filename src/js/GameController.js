/* eslint-disable no-alert */

export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.scores = 0;
    this.misses = 0;
    this.noClick = 0;
    this.charIndex = -1;
    this.id = null;
  }

  init() {
    this.gamePlay.drawBoard();
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.updateScores();

    this.id = setInterval(() => {
      this.misses += this.noClick;
      this.updateScores();
      const lose = this.checkLose();
      if (lose === false) {
        this.findGoblin();
        let num = Math.floor(Math.random() * this.gamePlay.cells.length);
        if (num === this.charIndex && this.charIndex >= 2) {
          num = this.charIndex / 2;
        } else if (num === this.charIndex && this.charIndex < 2) {
          num = this.charIndex + 2;
        }
        this.goblin(num);
      }
    }, 1000);
  }

  onCellClick(index) {
    this.noClick = 0;
    if (index === this.charIndex) {
      this.scores += 1;
    } else {
      this.misses += 1;
    }
    this.checkLose();
    this.updateScores();
  }

  updateScores() {
    const scores = document.querySelector('.scores');
    const misses = document.querySelector('.misses');
    scores.innerText = `Scores: ${this.scores}`;
    misses.innerText = `Misses: ${this.misses}`;
  }

  checkLose() {
    if (this.misses === 5) {
      clearInterval(this.id);
      alert('You have lost');
      this.gamePlay.cellClickListeners = [];
      return true;
    }
    return false;
  }

  findGoblin() {
    this.charIndex = this.gamePlay.cells.findIndex((item) => item.className.includes('goblin'));
  }

  goblin(num) {
    if (this.charIndex !== -1) {
      this.gamePlay.cells[this.charIndex].classList.remove('goblin');
    }
    const goblinCell = this.gamePlay.cells[num];
    goblinCell.classList.add('goblin');
    this.charIndex = num;
    this.noClick = 1;
  }
}
