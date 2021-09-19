module.exports = class EventBus {
   constructor() {
      this.subscribers = [];
   }

   subscribe(sub) {
      this.subscribers.push(sub);
   }

   publish(e) {
      console.info('Event published:', e.name);
      this.subscribers.forEach(sub => sub.onEvent(e));
   };
};
