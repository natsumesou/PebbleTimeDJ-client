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
];
var index = 0;
var FILTER_VALUE = 0.1;
var SPEED_VALUE = 0.1;
var DURATION = 1;

var items = [
  {title: "low pass +"},
  {title: "low pass -"},
  {title: "high pass +"},
  {title: "high pass -"},
  {title: "next music"},
  {title: "speed up"},
  {title: "speed down"},
];

var main = new UI.Menu({
  backgroundColor: 'black',
  textColor: 'blue',
  highlightBackgroundColor: 'blue',
  highlightTextColor: 'black',
  sections: [{
    title: 'DJ controller',
    items: items,
  }]
});
main.show();
             
main.on('select', function(e) {
  index = e.itemIndex;
});

Accel.init();
Accel.on("tap", function(e) {
  if(index === 0) {
    request.filter(FILTER_TYPES[0], -FILTER_VALUE, DURATION);
  } else if(index === 1) {
    request.filter(FILTER_TYPES[0], FILTER_VALUE, DURATION);
  } else if(index === 2) {
    request.filter(FILTER_TYPES[1], FILTER_VALUE, DURATION);
  } else if(index === 3) {
    request.filter(FILTER_TYPES[1], -FILTER_VALUE, DURATION);
  } else if(index === 4) {
    request.skipMusic();
  } else if(index === 5) {
    request.speed(SPEED_VALUE, 5);
  } else if(index === 6) {
    request.speed(-SPEED_VALUE, 5);
  }
});
