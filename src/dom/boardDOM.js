const TileElement = require('../dom/tileElement');
const CityElement = require('../dom/cityElement');
const UnitElement = require('../dom/unitElement');
const NameCityDialog = require('../components/name-city-dialog');

module.exports = class BoardDOM {
   units = {};
   cities = {};

   constructor(boardElem, events) {
      this.boardElem = boardElem;
      this.tilesElem = document.createElement('div');
      this.tilesElem.id = 'tiles';
      this.boardElem.appendChild(this.tilesElem);

      this.citiesElem = document.createElement('div');
      this.citiesElem.id = 'cities';
      this.boardElem.appendChild(this.citiesElem);

      this.unitsElem = document.createElement('div');
      this.unitsElem.id = 'units';
      this.boardElem.appendChild(this.unitsElem);

      this.events = events;
      this.events.subscribe(this);
   }

   createTileElement(tile) {
      const tileElem = new TileElement(tile);
      this.tilesElem.appendChild(tileElem.elem);
   }

   createCityElement(city) {
      const cityElem = new CityElement(city);
      this.cities[city.id] = cityElem;
      this.citiesElem.appendChild(cityElem.elem);
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

   removeUnit(id) {
      this.units[id].elem.remove();
      delete this.units[id];
   }

   showCityNameDialog() {
      const dialog = new NameCityDialog();
      dialog.onAccept(() => {
         this.events.publish({
            name: 'buildCityAccepted',
            data: {
               cityName: dialog.getCityName()
            }
         });
      });
   }

   onEvent(e) {
      switch(e.name) {
         case 'buildCityRequested':
            this.showCityNameDialog(e.city);
            break;
         case 'cityBuilt':
            this.createCityElement(e.city);
            break;
         case 'unitMoved':
            this.moveUnit(e.data);
            break;
         case 'unitKilled':
            this.removeUnit(e.unitId);
            break;
      }
   }
}
