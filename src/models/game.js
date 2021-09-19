const Board = require('./board');
const Turn = require('./turn');

module.exports = class Game {
   constructor(state, events) {
      this.civs = [];
      this.turns = [];

      const initialBoard = new Board(state, events);
      this.turns.push(new Turn(initialBoard));
      this.turnCount = 1;
   }

   get currentTurn() {
      return this.turns[this.turns.length - 1];
   }

   get board() {
      return this.currentTurn.board;
   }

   get canGoToNextTurn() {
      return this.currentTurn.board.haveAllUnitsMoved;
   }

   nextTurn() {
      if (!this.canGoToNextTurn) {
         throw new Error('Cannot go to next turn. Not all units have moved.');
      }
      this.turnCount++;
      const boardCopy = this.board.copy();
      boardCopy.resetUnitMoves();
      const newTurn = new Turn(boardCopy, this.turnCount);
      this.turns.push(newTurn);
   }
}
