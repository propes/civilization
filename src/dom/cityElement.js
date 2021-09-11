const TILE_WIDTH = 64;
const TILE_HEIGHT = 32;
const TOP_OFFSET = 16;

module.exports = class CityElement {
   constructor(city) {
      this.id = city.id;
      this.name = city.name;
      this.civ = city.civ;
      this.pop = city.pop;
      this.row = city.row;
      this.col = city.col;
      this.createElement();
   }

   createElement() {
      this.elem = document.createElement('div');
      this.elem.id = this.id;
      this.elem.style.position = 'absolute';
      this.elem.style.top = this.top + 'px';
      this.elem.style.left = this.left + 'px';

      const icon = document.createElement('img');
      icon.src = `./images/cities/stone2.gif`;

      const title = document.createElement('div');
      title.innerHTML = this.name;
      title.classList.add('city-icon');
      title.style.color = '#FFF';

      const popBadge = document.createElement('div');
      popBadge.innerHTML = this.pop;
      popBadge.classList.add('pop-badge');

      this.elem.appendChild(icon);
      this.elem.appendChild(title);
      this.elem.appendChild(popBadge);
   }

   get top() {
      return this.row * TILE_HEIGHT / 2 - TOP_OFFSET;
   }

   get left() {
      return this.col * TILE_WIDTH / 2;
   }
}