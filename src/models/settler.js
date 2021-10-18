const Unit = require('./unit');

module.exports = class Settler extends Unit {
   constructor(id, civ, row, col) {
      super(id, 'settler', civ, row, col);
      this.hasBuiltCity = false;
   }

   buildCity() {
      this.isActive = false;
      this.hasBuiltCity = true;
      this.movesRemaining = 0;
   }
}