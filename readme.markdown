Overview
========

A Node.js module for interacting with the Open311 API (version 2).  See Open311.org

Installation
============

npm install open311

Usage
=====

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


Output
======

	[
	    {
	        "token": "4e6cbd2a9dc2f112940000bc",
	        "status": "submitted",
	        "service_name": "Graffiti Removal",
	        "service_code": "4e39a3aad3e2c20ed800000c",
	        "requested_datetime": "2011-09-11T09:52:43-04:00",
	        "updated_datetime": "2011-09-11T09:52:43-04:00",
	        "lat": 39.3257703014457,
	        "long": -76.5906496206646,
	        "media_url": "http://311test.baltimorecity.gov/attachments/report/4e6cbd2a9dc2f112940000bc/photo/395284434.jpg"
	    }
	]