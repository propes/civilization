const Board = require('./models/board');
const BoardDOM = require('./dom/boardDOM');
const BoardController = require("./controllers/boardController");

document.addEventListener('DOMContentLoaded',() => {
   const board = new Board(15, 8);
   const dom = new BoardDOM();
   const controller = new BoardController(board, dom);

   controller.renderBoard();

   document.addEventListener("keydown", e => {
      if (e.key === "ArrowDown") {
         controller.moveSelectedUnitDown();
      }
   });
});
