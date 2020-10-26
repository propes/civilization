const TileElement = require('../dom/tileElement');
const UnitElement = require('../dom/unitElement');

module.exports = class BoardController {
   constructor(board, dom) {
      this.board = board;
      this.dom = dom;
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

   moveSelectedUnitDown() {
      this.board.moveSelectedUnitDown();
   }
}
