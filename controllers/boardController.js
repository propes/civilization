const EventBus = require('../events/eventBus');
const Board = require('../models/board');
const BoardDOM = require('../dom/boardDOM');

module.exports = class BoardController {
   constructor(boardElem, state) {
      const events = new EventBus();
      this.board = new Board(state, events);
      this.dom = new BoardDOM(boardElem, events);
   }

   onKeyDown(key) {
      switch (key) {
         case 'ArrowUp':
            this.board.moveSelectedUnitUp();
            break;
         case 'ArrowDown':
            this.board.moveSelectedUnitDown();
            break;
         case 'ArrowLeft':
            this.board.moveSelectedUnitLeft();
            break;
         case 'ArrowRight':
            this.board.moveSelectedUnitRight();
            break;
         case 'Home':
            this.board.moveSelectedUnitUpAndLeft();
            break;
         case 'PageUp':
            this.board.moveSelectedUnitUpAndRight();
            break;
         case 'End':
            this.board.moveSelectedUnitDownAndLeft();
            break;
         case 'PageDown':
            this.board.moveSelectedUnitDownAndRight();
            break;
         case 'b':
            this.board.buildCity();
            break;
      }
   }

   renderBoard() {
      this.renderTiles();
      this.renderUnits();
   }

   renderTiles() {
      this.board.getTiles().forEach(tile => {
         this.dom.createTileElement(tile);
      });
   }

   renderUnits() {
      const units = this.board.getUnits();
      Object.values(units).forEach(unit => {
         this.dom.createUnitElement(unit);
      })
   }
}
