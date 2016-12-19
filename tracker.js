// Licensed under the Apache 2.0 License. See footer for details.

'use strict';

var path = require('path'),
    https = require('https'),
    cwd = process.cwd();

var HTTPPost = function(body, callback) {

    // An object of options to indicate where to post to
    var b = JSON.stringify(body);
    console.log(b);
    var post_options = {
      host: 'deployment-tracker.mybluemix.net',
      port: 443,
      path: '/api/v1/track',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(b)
      }
    };

    // Set up the request
    var post_req = https.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        //console.log('Response: ', res.statusCode, chunk);
      });
      res.on('end', callback);
    });

    // post the data
    post_req.write(new Buffer(b, 'utf8'));
    post_req.end();
};

function track() {
    var pkg = null;
    try {
      pkg = require(path.join(cwd, 'package.json'));
    }
    catch (ex) {
      // package.json could not be loaded from the cwd
    }

    if (pkg) {
      var event = {
        date_sent: new Date().toJSON()
      };
      if (pkg.version) {
        event.code_version = pkg.version;
      }
      if (pkg.repository) {
        if (typeof pkg.repository === 'string') {
          event.repository_url = pkg.repository;
        } else if (pkg.repository.url) {
          event.repository_url = pkg.repository.url;
        }
      }
      if (pkg.name) {
        event.application_name = pkg.name;
      }
      if (pkg.version) {
        event.application_version = pkg.version;
      }
      event.platform = process.platform;
      event.runtime = 'electron';

      HTTPPost(event, function() {
        console.log('Uploaded stats');
      });
    }
};

module.exports.track = track;
