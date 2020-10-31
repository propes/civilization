const UnitElement = require('./unitElement');

describe('when creating an image', () => {
   const tileElem = new UnitElement({ type: 'settler', row: 0, col: 0});

   test('creates an img element', () => {
      expect(tileElem.elem.tagName).toBe('IMG');
   });
   
   test('with the expected image', () => {   
      expect(tileElem.elem.src).toMatch(/settler/);
   });
});

describe('when constructing', () => {
   const testData = [
      { row: 0, col: 0, top: -24, left: 0 }
   ];

   testData.forEach(testCase => {
      const tileElem = new UnitElement({ type: 'settler', row: testCase.row, col: testCase.col });

      test('has expected top property', () => {   
         expect(tileElem.top).toBe(testCase.top);
      });

      test('has expected left property', () => {   
         expect(tileElem.left).toBe(testCase.left);
      });
   })
});