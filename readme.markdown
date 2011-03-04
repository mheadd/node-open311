Overview
========

A Node.js module for interacting with the Open311 API (version 2).  See Open311.org

Installation
============

npm install open311

Usage
=====

	var sys = require('sys');
	var Open311 = require('open311').Open311;
	
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
		sys.puts('');
	});
	
	report.addListener('responseBody', function(body) {
		var service_list = JSON.parse(body);
	    for(var i = 0; i < service_list.services.length; i++) {
	        sys.puts('Service Name: ' + service_list.services[i].service_name);
	        sys.puts('Service Code: ' + service_list.services[i].service_code);
	        sys.puts('');
	    }
		
	});


Output
======

	Response code: 200
	
	Service Name: Other
	Service Code: miscellaneous-report
	
	Service Name: Graffiti
	Service Code: graffiti-report
	
	Service Name: Pothole
	Service Code: pothole-report
	
	Service Name: Streetlight
	Service Code: broken-streetlight-report
	
	Service Name: Roadway Plowing/Sanding
	Service Code: snow-plow-report
	
	Service Name: Unshoveled Sidewalk
	Service Code: unshoveled-sidewalk-report

