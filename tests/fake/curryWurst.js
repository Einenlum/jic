module.exports = function(sausage, ketchup, curry, nop) {
  return {
    eat: function() {
      return `Yummy! I mean... I guess... I mean... yeah. Could be worse. I still wonder why it is still a popular dish in there. Anyway. I'm composed of a ${sausage.identify()} with ${ketchup.identify()} and ${curry.identify()}.`;
    },
    returnNop: function() {
      return nop;
    }
  };
};
