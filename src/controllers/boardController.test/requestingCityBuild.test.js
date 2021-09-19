const { JSDOM } = require('jsdom');
const BoardController = require('../boardController');
const EventBus = require('../../events/eventBus');
const Settler = require('../../models/settler');

jest.mock('../../events/eventBus');

describe('when "b" is pressed', () => {
   describe('and a settler is selected', () => {
      let boardState;
      global.document = new JSDOM().window.document;
      const rootElem = document.createElement('div');

      beforeEach(() => {
         EventBus.mockClear();
         boardState = {
            rowCount: 5,
            colCount: 5,
            tiles: [],
            cities: {},
            units: {
               ['unitId']: new Settler('unitId', 'french', 2, 2)
            },
            selectedUnitId: 'unitId'
         };
      });

      it('should request a city build', () => {
         const controller = new BoardController(rootElem, boardState);
   
         controller.onKeyDown('b');

         const mockBus = EventBus.mock.instances[0];
         const event = mockBus.publish.mock.calls[0][0];
         expect(event.name).toBe('buildCityRequested');
      });
   })

   describe('and no unit is selected', () => {
      let boardState;
      global.document = new JSDOM().window.document;
      const rootElem = document.createElement('div');

      beforeEach(() => {
         EventBus.mockClear();
         boardState = {
            rowCount: 5,
            colCount: 5,
            tiles: [],
            cities: {},
            units: [],
            selectedUnitId: undefined
         };
      });

      it('should not request a city build', () => {
         const controller = new BoardController(rootElem, boardState);
   
         controller.onKeyDown('b');

         const mockBus = EventBus.mock.instances[0];
         expect(mockBus.publish).toHaveBeenCalledTimes(0);
      });
   })

   describe('and a settler is not selected', () => {
      let boardState;
      global.document = new JSDOM().window.document;
      const rootElem = document.createElement('div');

      beforeEach(() => {
         EventBus.mockClear();
         boardState = {
            rowCount: 5,
            colCount: 5,
            tiles: [],
            cities: {},
            units: {
               ['unitId']: {
                  id: 'unitId',
                  type: 'warrior',
                  civ: 'french',
                  row: 2,
                  col: 2
               }
            },
            selectedUnitId: 'unitId'
         };
      });

      it('should not request a city build', () => {
         const controller = new BoardController(rootElem, boardState);
   
         controller.onKeyDown('b');

         const mockBus = EventBus.mock.instances[0];
         expect(mockBus.publish).toHaveBeenCalledTimes(0);
      });
   })
});

// describe('when "buildCityAccepted" event is published', () => {
//    describe('and a settler is selected', () => {
//       it('should build a city', () => {
//          const controller = new BoardController(rootElem, boardState);

//          controller.onKeyDown('b');

//          expect(controller.dom.cities['fr-city-1'].row).toBe(2);
//          expect(controller.dom.cities['fr-city-1'].col).toBe(2);
//          expect(controller.dom.cities['fr-city-1'].civ).toBe('french');
//       });
//    });
// });

// it('should build a city', () => {
//    const controller = new BoardController(rootElem, boardState);
//    controller.renderBoard();

//    controller.onKeyDown('b');

//    expect(controller.dom.cities['fr-city-1'].row).toBe(2);
//    expect(controller.dom.cities['fr-city-1'].col).toBe(2);
//    expect(controller.dom.cities['fr-city-1'].civ).toBe('french');
// });

// it('should destroy the settler', () => {
//    const controller = new BoardController(rootElem, boardState);
//    controller.renderBoard();

//    controller.onKeyDown('b');

//    expect(controller.dom.units['unitId']).toBe(undefined);
// });

// it('should clear the selected unit', () => {
//    const controller = new BoardController(rootElem, boardState);
//    controller.renderBoard();

//    controller.onKeyDown('b');

//    expect(boardState.selectedUnitId).toBe(null);
// });
