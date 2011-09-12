/**
 * Gets a list of all service types.
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

// Call getServiceList method and pass it return format and callback method.
report.getServiceList('json', function(error, data) {
	if(error) {
		util.puts('WARNING: ' + data);
	}
	else {
		var services = JSON.parse(data);
		for(var i = 0; i < services.length; i++) {
	        util.puts('Service Name: ' + services[i].service_name);
	        util.puts('Service Code: ' + services[i].service_code);
	        util.puts('------');
	    }
	}	
});
