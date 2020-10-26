const events = require('../events/eventBus');

module.exports = class BoardDOM {
   units = {};

   constructor() {
      this.elem = document.getElementById('board');
      events.subscribe(this);
   }

   addTile(tile) {
      const tileElem = tile.createElement();
      this.elem.appendChild(tileElem);
   }

   addUnit(unit) {
      this.units[unit.id] = unit;
      const unitElem = unit.createElement();
      this.elem.appendChild(unitElem);
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
