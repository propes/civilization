const { JSDOM } = require('jsdom');
const BoardController = require('../boardController');

describe('when "buildCityAccepted" event is published', () => {
   let boardState;
   global.document = new JSDOM().window.document;
   const rootElem = document.createElement('div');

   describe('and a settler is selected', () => {
      beforeEach(() => {
         boardState = {
            rowCount: 5,
            colCount: 5,
            tiles: [],
            cities: {},
            units: {
               ['unitId']: {
                  id: 'unitId',
                  type: 'settler',
                  civ: 'french',
                  row: 2,
                  col: 2
               }
            },
            selectedUnitId: 'unitId'
         };
      });

      it('should build a city', () => {
         const controller = new BoardController(rootElem, boardState);
         controller.renderBoard();

         controller.events.publish({
            name: 'buildCityAccepted',
            data: {
               cityName: 'Paris'
            }
         });

         expect(controller.dom.cities['fr-city-paris'].row).toBe(2);
         expect(controller.dom.cities['fr-city-paris'].col).toBe(2);
         expect(controller.dom.cities['fr-city-paris'].civ).toBe('french');
      });

      it('should destroy the settler', () => {
         const controller = new BoardController(rootElem, boardState);
         controller.renderBoard();

         controller.events.publish({
            name: 'buildCityAccepted',
            data: {
               cityName: 'Paris'
            }
         });

         expect(controller.dom.units['unitId']).toBe(undefined);
      });

      it('should clear the selected unit', () => {
         const controller = new BoardController(rootElem, boardState);
         controller.renderBoard();

         controller.events.publish({
            name: 'buildCityAccepted',
            data: {
               cityName: 'Paris'
            }
         });

         expect(boardState.selectedUnitId).toBe(null);
      });
   });
});
