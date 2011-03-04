/**
 * Gets a list of all service types.
 */
var sys = require('sys');
var Open311 = require('./lib/open311').Open311;

// Options for the City of Boston (see https://mayors24.cityofboston.gov:6443/open311/v2/apps).
var options = {
		'endpoint': 'mayors24.cityofboston.gov', 
		'service_path': '/open311/v2/', 
		'jurisdiction_id': 'cityofboston.gov', 
		'secure': true,
		'port': 6443
		};

var report = new Open311(options);
report.getServiceList('json');

report.addListener('responseCode', function(code) {
	sys.puts('Response code: ' + code);
});

report.addListener('responseBody', function(body) {
	var service_list = JSON.parse(body);
	sys.puts('Response body: ');
	sys.puts(body);
	sys.puts('');
    for(var i = 0; i < service_list.services.length; i++) {
        sys.puts('Service Name: ' + service_list.services[i].service_name);
        sys.puts('Service Code: ' + service_list.services[i].service_code);
        sys.puts('');
    }

	
});