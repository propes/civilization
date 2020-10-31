module.exports = function EventBus() {
   const subscribers = [];

   this.subscribe = function(sub) {
      subscribers.push(sub);
   };

   this.publish = function(e) {
      subscribers.forEach(sub => sub.onEvent(e));
   };
};
