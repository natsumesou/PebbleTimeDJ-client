var ajax = require('ajax');

var request = {
  url: "http://natsu.me/pebble-dj",
  skipMusic: function() {
    this._request("skip");
  },
  filter: function(type, value) {
    var data = {
      type: type,
      value: value,
    };
    this._request("filter", data);
  },
  volume: function(volume) {
    var data = {
      volume: volume,
    };
    this._request("volume", data);
  },
  _request: function(type, data) {
    data = data || {};
    data.type = type;
    
    ajax({
      url: this.url,
      method: "post",
      data: data,
      cache: false,
    },
    function(error, status, request) {
      console.log('The ajax request failed: ' + error);
    });
  }
};


this.exports = request;