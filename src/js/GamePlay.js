export default class GamePlay {
  constructor() {
    this.boardSize = 4;
    this.container = null;
    this.boardEl = null;
    this.cells = [];
    this.cellClickListeners = [];
    this.newGameListeners = [];
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  drawBoard() {
    this.checkBinding();
    this.container.innerHTML = `
      <div class="controls">
        <button data-id="action-restart" class="btn">New Game</button>
      </div>
      <div class="board-container">
        <div data-id="board" class="board"></div>
      </div>
      <div class="scoresbox">
        <div class="scores">Scores: </div>
        <div class="misses">Misses: </div>
      </div>
      <div class="cursor"></div>
      `;

    this.newGameEl = this.container.querySelector('[data-id=action-restart]');
    this.newGameEl.addEventListener('click', (e) => this.onNewGameClick(e));
    this.boardEl = this.container.querySelector('[data-id=board]');
    const cursor = document.querySelector('.cursor');
    const board = document.querySelector('.board');
    const mouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
    };
    board.addEventListener('mousemove', mouseMove);
    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell');
      cellEl.addEventListener('click', (e) => this.onCellClick(e));
      this.boardEl.appendChild(cellEl);
    }
    this.cells = Array.from(this.boardEl.children);
  }

  addNewGameListener(callback) {
    this.newGameListeners.push(callback);
  }

  addCellClickListener(callback) {
    this.cellClickListeners.push(callback);
  }

  onNewGameClick(e) {
    e.preventDefault();
    this.newGameListeners.forEach((obj) => obj.call(null));
  }

  onCellClick(e) {
    const index = this.cells.indexOf(e.currentTarget);
    this.cellClickListeners.forEach((obj) => obj.call(null, index));
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('GamePlay not bind to DOM');
    }
  }
}
