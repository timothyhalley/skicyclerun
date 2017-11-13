var ApiBuilder = require('claudia-api-builder');
var api = new ApiBuilder();

module.exports = api;

api.get('/hello', function() {
  return 'this is a load of crap';
});
