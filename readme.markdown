Overview
========

A Node.js module for interacting with the Open311 API (version 2).  See Open311.org

Installation
============

npm install open311

Usage
=====
<pre>
var sys = require('sys');
var Open311 = require('open311').Open311;

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
</pre>

Output
======

<pre>
Response code: 200
Service Code: S0276
Service Name: Parking Meter Request
</pre>