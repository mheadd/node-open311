/**
 * 
 */
var util = require('util');
var Open311 = require('./lib/open311').Open311;

//Options for the City of Baltimore (see http://311test.baltimorecity.gov/open311).
var options = {
        'endpoint': '311test.baltimorecity.gov',
        'service_path': '/open311/v2/',
        'jurisdiction_id': 'baltimorecity.gov'
        };

var parameters = {
		'address_string':'210 East Centre Street, Baltimore, MD',
		'media_url':'http://twitpic.com/1n6s2k'
};

// Create a new Open311 object.
var report = new Open311(options);
report.postSericeRequest('json', '4e39a3abd3e2c20ed8000016', 'your-api-key-here', parameters, function(error, data) {
	util.puts(util.inspect(data));
});
