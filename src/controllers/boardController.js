const EventBus = require('../events/eventBus');
const Game = require('../models/game');
const BoardDOM = require('../dom/boardDOM');

module.exports = class BoardController {
   constructor(boardElem, state) {
      this.events = new EventBus();
      this.game = new Game(state, this.events);
      this.dom = new BoardDOM(boardElem, this.events);
      this.ignoreKeyDown = false;

      this.events.subscribe(this);
   }

   onKeyDown(key) {
      if (this.ignoreKeyDown) return;

      switch (key) {
         case 'ArrowUp':
            this.game.board.moveSelectedUnitUp();
            break;
         case 'ArrowDown':
            this.game.board.moveSelectedUnitDown();
            break;
         case 'ArrowLeft':
            this.game.board.moveSelectedUnitLeft();
            break;
         case 'ArrowRight':
            this.game.board.moveSelectedUnitRight();
            break;
         case 'Home':
            this.game.board.moveSelectedUnitUpAndLeft();
            break;
         case 'PageUp':
            this.game.board.moveSelectedUnitUpAndRight();
            break;
         case 'End':
            this.game.board.moveSelectedUnitDownAndLeft();
            break;
         case 'PageDown':
            this.game.board.moveSelectedUnitDownAndRight();
            break;
         case 'b':
            this.game.board.requestBuildCity();
            break;
         case 'Enter':
            if (this.game.haveAllUnitsMoved) {
               this.game.completeTurn();
            }
            break;
      }
   }

   onEvent(e) {
      switch(e.name) {
         case 'buildCityRequested':
            this.ignoreKeyDown = true;
            break;

         case 'buildCityCancelled':
            this.ignoreKeyDown = false;
            break;
            
         case 'buildCityAccepted':
            this.game.board.buildCity(e.data.cityName);
            this.ignoreKeyDown = false;
            break;

         case 'allUnitsMoved':
            console.log("Press Enter to go to next turn...");
            break;
      }
   }

   renderBoard() {
      this.renderTiles();
      this.renderUnits();
   }

   renderTiles() {
      this.game.board.tiles.forEach(tile => {
         this.dom.createTileElement(tile);
      });
   }

   renderUnits() {
      const units = this.game.board.units;
      Object.values(units).forEach(unit => {
         this.dom.createUnitElement(unit);
      })
   }
}
