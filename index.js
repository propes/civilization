const BoardDOM = require('./dom/BoardDOM');
const TileElement = require('./dom/TileElement');

document.addEventListener('DOMContentLoaded',() => {
   const dom = new BoardDOM(document);
   const tile = new TileElement("grassland1", 0, 0);
   dom.addTile(tile);
});
