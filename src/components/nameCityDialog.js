const { MDCDialog } = require('@material/dialog');

module.exports = class NameCityDialog {
   constructor() {
      this.dialog = new MDCDialog(document.getElementById('nameCityDialog'));
      this.dialog.listen('MDCDialog:closing', (e) => {
         switch (e.detail.action) {
            case "accept":
               if (this.acceptAction) {
                  this.acceptAction();
               }
               break;
            case "cancel":
            case "close":
               if (this.cancelAction) {
                  this.cancelAction();
               }
               break;
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

   onCancel(action) {
      this.cancelAction = action;
   }
}