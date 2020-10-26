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
      this.board.units.forEach(unit => {
         const elem = new UnitElement(unit);
         this.dom.addUnit(elem);
      });
   }
}
