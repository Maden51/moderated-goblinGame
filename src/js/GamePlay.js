export default class GamePlay {
  constructor() {
    this.boardSize = 4;
    this.container = null;
    this.boardEl = null;
    this.cells = [];
    this.goblin = null;
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
      <div class="board-container">
        <div data-id="board" class="board"></div>
      </div>`;

    this.boardEl = this.container.querySelector('[data-id=board]');
    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell', 'map-tile');
      this.boardEl.appendChild(cellEl);
    }
    this.cells = Array.from(this.boardEl.children);
  }

  randomSpawn(position) {
    this.goblin = document.querySelector('.goblin');
    const cellEl = Array.from(document.getElementsByClassName('cell'))[position];
    if (!this.goblin) {
      const newGoblinEl = document.createElement('div');
      newGoblinEl.classList.add('goblin');
      cellEl.appendChild(newGoblinEl);
      return;
    }

    cellEl.appendChild(this.goblin);
  }

  getNewPosition() {
    this.goblin = document.querySelector('.goblin');
    if (!this.goblin) {
      return Math.round(Math.random() * (this.boardSize ** 2 - 1));
    }
    const cellEl = Array.from(document.getElementsByClassName('cell')).indexOf(this.goblin.parentElement);
    this.position = cellEl;
    let newPosition = this.position;
    while (newPosition === this.position) {
      newPosition = Math.round(Math.random() * (this.boardSize ** 2 - 1));
    }
    return newPosition;
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('GamePlay not bind to DOM');
    }
  }
}
