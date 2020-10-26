module.exports = {
   subscribers: [],

   subscribe(sub) {
      this.subscribers.push(sub);
   },

   publish(e) {
      this.subscribers.forEach(sub => sub.onEvent(e));
   }
};
