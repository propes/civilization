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
      this.createElement();
   }

   createElement() {
      this.elem = document.createElement('img');
      this.elem.id = this.id;
      this.elem.src = `./images/units/${this.type}.gif`;
      this.elem.style = this.css;
   }

   get top() {
      return this.row * TILE_HEIGHT / 2 - TOP_OFFSET;
   }

   get left() {
      return this.col * TILE_WIDTH / 2;
   }

   get css() {
      return cssTemplate
         .replace('{top}', this.top)
         .replace('{left}', this.left);
   }

   moveToLocation(row, col) {
      this.row = row;
      this.col = col;;
      this.elem.style = this.css;
   }
}