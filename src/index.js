const { MDCDialog } = require('@material/dialog');
const seed = require('./seed');
const BoardController = require('./controllers/boardController');


document.addEventListener('DOMContentLoaded',() => {
   const boardState = seed.createBoardState();
   const rootElem = document.getElementById('board');
   const controller = new BoardController(rootElem, boardState);
   controller.renderBoard();

   const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
   dialog.open();

   document.addEventListener('keydown', e => controller.onKeyDown(e.key));
});
