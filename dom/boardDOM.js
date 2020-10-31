const TileElement = require('../dom/tileElement');
const UnitElement = require('../dom/unitElement');

module.exports = class BoardDOM {
   units = {};

   constructor(boardElem, events) {
      this.boardElem = boardElem;
      this.tilesElem = document.createElement('div');
      this.tilesElem.id = 'tiles';
      this.boardElem.appendChild(this.tilesElem);

      this.unitsElem = document.createElement('div');
      this.unitsElem.id = 'units';
      this.boardElem.appendChild(this.unitsElem);

      events.subscribe(this);
   }

   createTileElement(tile) {
      const tileElem = new TileElement(tile);
      this.tilesElem.appendChild(tileElem.elem);
   }

   createUnitElement(unit) {
      const unitElem = new UnitElement(unit);
      this.units[unit.id] = unitElem;
      this.unitsElem.appendChild(unitElem.elem);
   }

   moveUnit(e) {
      const unit = this.units[e.id];
      unit.moveToLocation(e.newLocation.row, e.newLocation.col);
   }

   onEvent(e) {
      switch(e.name) {
         case 'unitMoved':
            this.moveUnit(e.data);
      }
   }
}
