const seed = require('./seed');
const BoardController = require('./controllers/boardController');


document.addEventListener('DOMContentLoaded',() => {
   const boardState = seed.createBoardState();
   const rootElem = document.getElementById('board');
   const controller = new BoardController(rootElem, boardState);
   controller.renderBoard();

   document.addEventListener('keydown', e => controller.onKeyDown(e.key));
});
