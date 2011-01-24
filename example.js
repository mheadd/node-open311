/**
 * Gets a list of all service types.
 */
var sys = require('sys');

var Open311 = require('./lib/open311').Open311;

// San Francisco example.
//var report = new Open311('open311.sfgov.org', '/dev/V2/', 'sfgov.org', true);
//report.getServiceList('xml');

// Washington DC example.
var report = new Open311('api.dc.gov', '/open311/v2_dev/', 'dc.gov', false);
report.getServiceList('json');

report.addListener('responseCode', function(code) {
	sys.puts('Response code: ' + code);
});

report.addListener('responseBody', function(body) {
	var service_list = JSON.parse(body);
	for(var i = 0; i < service_list.length; i++) {
		sys.puts('Service Code: ' + service_list[i].service_code);
		sys.puts('Service Name: ' + service_list[i].service_name);
	}
	
});