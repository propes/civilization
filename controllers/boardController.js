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
      this.board.tiles.forEach(tile => {
         const elem = new TileElement(tile);
         this.dom.addTile(elem);
      });
   }

   renderUnits() {
      for (let key in this.board.units) {
         const elem = new UnitElement(this.board.units[key]);
         this.dom.addUnit(elem);
      }
   }
}
