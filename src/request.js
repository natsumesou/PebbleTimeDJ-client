var ajax = require('ajax');

var request = {
  url: "http://dj.natsu.me/control",
  skipMusic: function() {
    this._request("skip");
  },
  filter: function(type, value) {
    var data = {
      filterType: type,
      value: value,
    };
    this._request("filter", data);
  },
  speed: function(speed) {
    var data = {
      value: speed,
    };
    this._request("speed", data);
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