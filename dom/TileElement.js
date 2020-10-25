module.exports = class TileElement {
   constructor(type, row, col) {
      this.type = type;
      this.row = row;
      this.col = col;
   }

   create(document) {
      const tileElem = document.createElement('img');
      tileElem.src = `./images/terrain/${this.type}.gif`;
      tileElem.style = `position: absolute; top: ${this.top}px; left: ${this.left}px`;
      return tileElem;
   }

   get top() {
      return this.row;
   }

   get left() {
      return this.col;
   }
}
