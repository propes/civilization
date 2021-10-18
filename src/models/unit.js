module.exports = class Unit {
   constructor(id, type, civ, row, col) {
      this.id = id;
      this.type = type;
      this.civ = civ;
      this.row = row;
      this.col = col;
      this.moves = 1;
      this.movesRemaining = 1;
      this.isActive = true;
   }

   get canMove() {
      return this.movesRemaining > 0;
   }

   resetMoves() {
      this.movesRemaining = this.moves;
   }

   checkUnitCanBeMoved() {
      if (!this.canMove) {
         throw Error(`Unit '${this.id}' cannont be moved. No moves remaining.`);
      }
   }

   moveUp() {
      this.checkUnitCanBeMoved();
      this.row -= 2;
      this.movesRemaining--;
   }

   moveDown() {
      this.checkUnitCanBeMoved();
      this.row += 2;
      this.movesRemaining--;
   }

   moveLeft() {
      this.checkUnitCanBeMoved();
      this.col -= 2;
      this.movesRemaining--;
   }

   moveRight() {
      this.checkUnitCanBeMoved();
      this.col += 2;
      this.movesRemaining--;
   }

   moveUpAndLeft() {
      this.checkUnitCanBeMoved();
      this.row--;
      this.col--;
      this.movesRemaining--;
   }

   moveUpAndRight() {
      this.checkUnitCanBeMoved();
      this.row--;
      this.col++;
      this.movesRemaining--;
   }

   moveDownAndLeft() {
      this.checkUnitCanBeMoved();
      this.row++;
      this.col--;
      this.movesRemaining--;
   }

   moveDownAndRight() {
      this.checkUnitCanBeMoved();
      this.row++;
      this.col++;
      this.movesRemaining--;
   }
}