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

// Create a new Open311 object.
var report = new Open311(options);

// Call getServiceRequest to get the status of a specific request.
report.getServiceRequest('json', '4e6cbd2a9dc2f112940000bc', function(error, data) {	
	util.puts(util.inspect(data));	
});
