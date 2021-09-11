const { MDCDialog } = require('@material/dialog');

module.exports = class NameCityDialog {
   constructor() {
      this.dialog = new MDCDialog(document.getElementById('nameCityDialog'));
      this.dialog.listen('MDCDialog:closing', (e) => {
         if (e.detail.action === "ok") {
            console.log(this.acceptAction);
            if (this.acceptAction) {
               this.acceptAction();
            }
         }
      });

      this.initializeTextInput();

      this.dialog.open();
   }

   initializeTextInput() {
      this.cityNameInput = document.getElementById('nameCityDialog_cityName');
      this.cityNameInput.value = 'Athens';
      this.cityNameInput.select();
   }

   getCityName() {
      return this.cityNameInput.value;
   }

   onAccept(action) {
      this.acceptAction = action;
   }
}