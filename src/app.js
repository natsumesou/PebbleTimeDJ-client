/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Accel = require('ui/accel');
var request = require('request');

var FILTER_TYPES = [
  "low pass",
  "high pass",
  "band pass",
];
var currentType = FILTER_TYPES[0];

var items = [];
for(var i in FILTER_TYPES) {
  items.push({title: FILTER_TYPES[i]});
}
  
var main = new UI.Menu({
  backgroundColor: 'black',
  textColor: 'blue',
  highlightBackgroundColor: 'blue',
  highlightTextColor: 'black',
  sections: [{
    title: 'filter type',
    items: items,
  }]
});
main.show();
             
main.on('select', function(e) {
  currentType = FILTER_TYPES[e.itemIndex];
});

Accel.init();

Accel.on("tap", function(e) {
  switch(e.axis) {
    case "x":
      request.skipMusic();
      break;
    case "y":
      var value = 0;
      if (e.direction > 0) {
        value = 0.2;
      } else {
        value = -0.2;
      }
      request.filter(currentType, value);
      break;
    case "z":
      var volume = 0;
      if (e.direction > 0) {
        volume = 0.2;
      } else {
        volume = -0.2;
      }
      request.volume(volume);
      break;
  }
});
