const { JSDOM } = require('jsdom');

const BoardController = require('./boardController');

describe('when moving selected unit', () => {
   const testCases = [{
      before: { row: 2, col: 2 },
      after: { row: 0, col: 2 },
      key: 'ArrowUp'
   }, {
      before: { row: 2, col: 2 },
      after: { row: 4, col: 2 },
      key: 'ArrowDown'
   }, {
      before: { row: 2, col: 2 },
      after: { row: 2, col: 0 },
      key: 'ArrowLeft'
   }, {
      before: { row: 2, col: 2 },
      after: { row: 2, col: 4 },
      key: 'ArrowRight'
   }, {
      before: { row: 2, col: 2 },
      after: { row: 1, col: 1 },
      key: 'Home'
   }, {
      before: { row: 2, col: 2 },
      after: { row: 1, col: 3 },
      key: 'PageUp'
   }, {
      before: { row: 2, col: 2 },
      after: { row: 3, col: 1 },
      key: 'End'
   }, {
      before: { row: 2, col: 2 },
      after: { row: 3, col: 3 },
      key: 'PageDown'
   }]

   testCases.forEach(tc => {
      const boardState = {
         rowCount: 5,
         colCount: 5,
         tiles: [],
         units: {
            ['unitId']: {
               id: 'unitId',
               row: tc.before.row,
               col: tc.before.col
            }
         },
         selectedUnitId: 'unitId'
      };

      global.document = new JSDOM().window.document;
      const rootElem = document.createElement('div');

      it(`should move unit from [${tc.before.row}, ${tc.before.col}] to [${tc.after.row}, ${tc.after.col}] when '${tc.key}' is pressed`, () => {
         const controller = new BoardController(rootElem, boardState);
         controller.renderBoard();

         controller.onKeyDown(tc.key);

         expect(controller.dom.units['unitId'].row).toBe(tc.after.row);
         expect(controller.dom.units['unitId'].col).toBe(tc.after.col);
      });
   });
});

describe('when moving selected unit', () => {
   const testCases = [{
      before: { row: 0, col: 2 },
      key: 'ArrowUp'
   }, {
      before: { row: 1, col: 1 },
      key: 'ArrowUp'
   }, {
      before: { row: 4, col: 2 },
      key: 'ArrowDown'
   }, {
      before: { row: 3, col: 3 },
      key: 'ArrowDown'
   }, {
      before: { row: 2, col: 0 },
      key: 'ArrowLeft'
   }, {
      before: { row: 1, col: 1 },
      key: 'ArrowLeft'
   }, {
      before: { row: 2, col: 4 },
      key: 'ArrowRight'
   }, {
      before: { row: 3, col: 3 },
      key: 'ArrowRight'
   }, {
      before: { row: 0, col: 0 },
      key: 'Home'
   }, {
      before: { row: 2, col: 0 },
      key: 'Home'
   }, {
      before: { row: 0, col: 2 },
      key: 'Home'
   }, {
      before: { row: 0, col: 4 },
      key: 'PageUp'
   }, {
      before: { row: 2, col: 4 },
      key: 'PageUp'
   }, {
      before: { row: 0, col: 2 },
      key: 'PageUp'
   }, {
      before: { row: 4, col: 0 },
      key: 'End'
   }, {
      before: { row: 2, col: 0 },
      key: 'End'
   }, {
      before: { row: 4, col: 2 },
      key: 'End'
   }, {
      before: { row: 4, col: 4 },
      key: 'PageDown'
   }, {
      before: { row: 2, col: 4 },
      key: 'PageDown'
   }, {
      before: { row: 4, col: 2 },
      key: 'PageDown'
   }]

   testCases.forEach(tc => {
      const boardState = {
         rowCount: 5,
         colCount: 5,
         tiles: [],
         units: {
            ['unitId']: {
               id: 'unitId',
               row: tc.before.row,
               col: tc.before.col
            }
         },
         selectedUnitId: 'unitId'
      };

      global.document = new JSDOM().window.document;
      const rootElem = document.createElement('div');

      it(`should not move unit when starting from [${tc.before.row}, ${tc.before.col}] and '${tc.key}' is pressed`, () => {
         const controller = new BoardController(rootElem, boardState);
         controller.renderBoard();

         controller.onKeyDown(tc.key);

         expect(controller.dom.units['unitId'].row).toBe(tc.before.row);
         expect(controller.dom.units['unitId'].col).toBe(tc.before.col);
      });
   });
});

describe('when "b" is pressed', () => {
   describe('when a settler is selected', () => {
      const boardState = {
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

      global.document = new JSDOM().window.document;
      const rootElem = document.createElement('div');

      it('should build a city', () => {
         const controller = new BoardController(rootElem, boardState);
         controller.renderBoard();
   
         controller.onKeyDown('b');

         expect(controller.dom.cities['fr-city-1'].row).toBe(2);
         expect(controller.dom.cities['fr-city-1'].col).toBe(2);
         expect(controller.dom.cities['fr-city-1'].civ).toBe('french');
      });

      it('should destroy the settler', () => {
         const controller = new BoardController(rootElem, boardState);
         controller.renderBoard();
   
         controller.onKeyDown('b');

         expect(controller.dom.units['unitId']).toBe(undefined);
      });
   })

   // it('should not build a city when a settler is not selected', () => {
   //    const boardState = {
   //       rowCount: 5,
   //       colCount: 5,
   //       tiles: [],
   //       units: {
   //          ['unitId']: {
   //             id: 'unitId',
   //             row: 2,
   //             col: 2
   //          }
   //       },
   //       selectedUnitId: 'unitId'
   //    };

   //    global.document = new JSDOM().window.document;
   //    const rootElem = document.createElement('div');

   //    const controller = new BoardController(rootElem, boardState);
   //    controller.renderBoard();

   //    controller.onKeyDown('b');

   //    expect(controller.dom.cities.length).toBe(0);
   // });
});