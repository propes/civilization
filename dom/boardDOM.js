module.exports = class BoardDOM {
   constructor(document) {
      this.document = document;
      this.elem = document.getElementById('board');
   }

   addTile(tile) {
      const tileElem = tile.createElement();
      this.elem.appendChild(tileElem);
   }

   addUnit(unit) {
      const unitElem = unit.createElement();
      this.elem.appendChild(unitElem);
   }
}
