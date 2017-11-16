var ApiBuilder = require('claudia-api-builder');
var api = new ApiBuilder();

module.exports = api;

api.get('/greet', function(request) {
  var superb = require('superb');
  return request.queryString.name + ', this is a load of crap and not really too fun bozo! Ya think! --> ' + superb();
});
