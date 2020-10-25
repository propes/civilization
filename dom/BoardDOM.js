module.exports = class BoardDOM {
   constructor(document) {
      this.document = document;
      this.elem = document.getElementById('board');
   }

   addTile(tile) {
      const tileElem = tile.create(this.document);
      this.elem.appendChild(tileElem);
   }
}
