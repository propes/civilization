const { TestScheduler } = require("jest");

const TileElement = require('./tileElement');

describe('when creating an image', () => {
   const tileElem = new TileElement('grassland1', 0, 0);
   const domElem = tileElem.create(document);

   test('creates an img element', () => {
      expect(domElem.tagName).toBe('IMG');
   });
   
   test('with the expected image', () => {   
      expect(domElem.src).toMatch(/grassland1/);
   });
});

describe('when constructing', () => {
   const testData = [
      { row: 0, col: 0, top: 0, left: 0 },
      { row: 0, col: 1, top: 0, left: 64 },
      { row: 0, col: 2, top: 0, left: 128 },
      { row: 1, col: 0, top: 16, left: 32 },
      { row: 1, col: 1, top: 16, left: 96 },
      { row: 1, col: 2, top: 16, left: 160 },
      { row: 2, col: 0, top: 32, left: 0 },
      { row: 2, col: 1, top: 32, left: 64 },
      { row: 2, col: 2, top: 32, left: 128 },
   ];
   
   testData.forEach(testCase => {
      const tileElem = new TileElement('grassland1', testCase.row, testCase.col);
   
      test('has expected top property', () => {   
         expect(tileElem.top).toBe(testCase.top);
      });

      test('has expected left property', () => {   
         expect(tileElem.left).toBe(testCase.left);
      });
   })
});