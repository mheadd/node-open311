/**
 * 
 */
var util = require('util');
var Open311 = require('./lib/open311').Open311;

// Options for the City of Baltimore (see http://311test.baltimorecity.gov/open311).
var options = {
        'endpoint': '311test.baltimorecity.gov',
        'service_path': '/open311/v2/',
        'jurisdiction_id': 'baltimorecity.gov'
        };

// Create a new Open311 object.
var report = new Open311(options);

// Call serviceDiscovery to get details of the Open311 implmentation.
report.serviceDiscovery('json', function(error, data) {
	if(error) {
		util.puts('WARNING: ' + data);
	}
	else {
		util.puts(data);
	}	
});