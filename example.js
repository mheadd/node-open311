/**
 * Gets a list of all service types.
 */
var sys = require('sys');
var Open311 = require('./lib/open311').Open311;

// Options for the City of Boston (see https://mayors24.cityofboston.gov:6443/api/open311/v2/apps/).
var options = {
        'endpoint': 'mayors24.cityofboston.gov',
        'service_path': '/api/open311/v2/',
        'jurisdiction_id': 'cityofboston.gov',
        'secure': true,
        'port': 6443
        };

// Variable to hold the response code from the Open311 API.
var responseCode;

var report = new Open311(options);
report.getServiceList('json');

report.addListener('responseCode', function(code) {
    responseCode = code;
    sys.puts('Response code: ' + responseCode);
});

report.addListener('responseBody', function(body) {
  if(responseCode == '200') {
    var service_list = JSON.parse(body);
    for(var i = 0; i < service_list.length; i++) {
        sys.puts('Service Name: ' + service_list[i].service_name);
        sys.puts('Service Code: ' + service_list[i].service_code);
        sys.puts('');
    }
  }
});
