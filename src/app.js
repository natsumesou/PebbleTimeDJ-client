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
var FILTER_VALUE = 0.2;

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
        value = FILTER_VALUE;
      } else {
        value = - FILTER_VALUE;
      }
      request.filter(currentType, value);
      break;
    case "z":
      var speed = 0;
      if (e.direction > 0) {
        speed = FILTER_VALUE;
      } else {
        speed = - FILTER_VALUE;
      }
      request.speed(speed);
      break;
  }
});
