const TILE_WIDTH = 64;
const TILE_HEIGHT = 32;
const TOP_OFFSET = 24;

const cssTemplate = 'position: absolute; top: {top}px; left: {left}px';

module.exports = class UnitElement {
   constructor(unit) {
      this.id = unit.id;
      this.type = unit.type;
      this.row = unit.row;
      this.col = unit.col;
   }

   createElement() {
      const elem = document.createElement('img');
      elem.id = this.id;
      elem.src = `./images/units/${this.type}.gif`;
      elem.style = this.css;
      return elem;
   }

   get top() {
      return this.row * TILE_HEIGHT / 2 - TOP_OFFSET;
   }

   get left() {
      if (this.row % 2 === 0) {
         return this.col * TILE_WIDTH;
      }

      return this.col * TILE_WIDTH + TILE_WIDTH / 2;
   }

   get css() {
      return cssTemplate
         .replace('{top}', this.top)
         .replace('{left}', this.left);
   }

   moveToLocation(row, col) {
      this.row = row;
      this.col = col;
      const elem = document.getElementById(this.id);
      elem.style = this.css;
   }
}