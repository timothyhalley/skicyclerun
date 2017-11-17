var ApiBuilder = require('claudia-api-builder');
var api = new ApiBuilder();
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
var Sharp = require('sharp');
var BUCKET = process.env.BUCKET;
var URL = process.env.URL;
var S3 = new AWS.S3({
  signatureVersion: 'v4',
});

module.exports = api;

exports.handler = function(event, context, callback) {
  const key = event.queryStringParameters.key;

  const match = key.match(/(\d+)x(\d+)\/(.*)/);
  const width = parseInt(match[1], 10);
  const height = parseInt(match[2], 10);
  const originalKey = match[3];

  S3.getObject({Bucket: BUCKET, Key: originalKey}).promise()
    .then(data => Sharp(data.Body)
      .resize(width, height)
      .toFormat('png')
      .toBuffer()
    )
    .then(buffer => S3.putObject({
        Body: buffer,
        Bucket: BUCKET,
        ContentType: 'image/png',
        Key: key,
      }).promise()
    )
    .then(() => callback(null, {
        statusCode: '301',
        headers: {'location': `${URL}/${key}`},
        body: '',
      })
    )
    .catch(err => callback(err))
};
