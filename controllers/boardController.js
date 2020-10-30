const TileElement = require('../dom/tileElement');
const UnitElement = require('../dom/unitElement');

module.exports = class BoardController {
   constructor(board, dom) {
      this.board = board;
      this.dom = dom;

      document.addEventListener("keydown", e => {
         switch (e.key) {
            case "ArrowUp":
               this.board.moveSelectedUnitUp();
               break;
            case "ArrowDown":
               this.board.moveSelectedUnitDown();
               break;
            case "ArrowLeft":
               this.board.moveSelectedUnitLeft();
               break;
            case "ArrowRight":
               this.board.moveSelectedUnitRight();
               break;
         }
      });
   }

   renderBoard() {
      this.renderTiles();
      this.renderUnits();
   }

   renderTiles() {
      this.board.getTiles().forEach(tile => {
         const elem = new TileElement(tile);
         this.dom.addTile(elem);
      });
   }

   renderUnits() {
      const units = this.board.getUnits();
      Object.values(units).forEach(unit => {
         const elem = new UnitElement(unit);
         this.dom.addUnit(elem);
      })
   }
}
