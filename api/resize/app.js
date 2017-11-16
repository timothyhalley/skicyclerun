var ApiBuilder = require('claudia-api-builder');
var api = new ApiBuilder();

module.exports = api;

const AWS = require('aws-sdk');
const S3 = new AWS.S3({
  signatureVersion: 'v4',
});

const Sharp = require('sharp');

api.get('/greet', function(request) {
  var superb = require('superb');
  return request.queryString.name + ', this is a load of crap and not really too fun bozo! Ya think! --> ' + superb();
});
