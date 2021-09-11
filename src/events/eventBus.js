module.exports = function EventBus() {
   const subscribers = [];

   this.subscribe = function(sub) {
      subscribers.push(sub);
   };

   this.publish = function(e) {
      console.info('Event published:', e.name);
      subscribers.forEach(sub => sub.onEvent(e));
   };
};
