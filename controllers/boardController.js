const TileElement = require('../dom/tileElement');

module.exports = class BoardController {
   constructor(board, dom) {
      this.board = board;
      this.dom = dom;
   }

   renderBoard() {
      this.board.tiles.forEach(tile => {
         const tileElem = new TileElement(tile.type, tile.row, tile.col);
         this.dom.addTile(tileElem);
      });
   }
}
