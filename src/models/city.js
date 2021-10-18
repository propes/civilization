module.exports = class City {
   constructor(name, civ, row, col) {
      this.id = `${civ}-city-${name.toLowerCase()}`;
      this.name = name;
      this.civ = civ;
      this.row = row;
      this.col = col;
      this.pop = 3;
      this.production = 5;
      this.buildItem = new BuildItem('warrior', 10);
   }

   build() {
      console.log(`Building ${this.buildItem.id}. Adding ${this.production} shields...`)
      this.buildItem.addShields(this.production);
      if (this.buildItem.isComplete) {
         console.log(`Build complete`)
         this.buildItem = new BuildItem('warrior', 10);
         this.onBuildComplete();
      }
   }

   onBuildComplete(callback) {
      this.onBuildComplete = callback;
   }
}

class BuildItem {
   constructor(id, shieldsToComplete) {
      this.id = id;
      this.shields = 0;
      this.shieldsToComplete = shieldsToComplete;
   }

   get isComplete() {
      return this.shields >= this.shieldsToComplete;
   }

   addShields(addShields) {
      this.shields += addShields;
   }
}