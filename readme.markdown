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


Output
======

Service Name: Graffiti Removal
Service Code: 4e39a3aad3e2c20ed800000c
------
Service Name: Pothole
Service Code: 4e39a3abd3e2c20ed8000016
------
Service Name: Sign Missing or Damaged
Service Code: 4e39a3abd3e2c20ed8000021
------
Service Name: City Employee Praise
Service Code: 4e4edcac21ecf30e5000000f
------
Service Name: Aggressive Animal
Service Code: 4e39a3abd3e2c20ed8000025
------
Service Name: Dirty Alley or Street
Service Code: 4e39a3aad3e2c20ed800000a
------
Service Name: Street Light Out
Service Code: 4e39a3abd3e2c20ed800001a
------
Service Name: Traffic Signal Repair
Service Code: 4e39a3abd3e2c20ed8000023
------
Service Name: City Employee Complaint
Service Code: 4e39a3aad3e2c20ed8000007
------
Service Name: Dead Animal Pickup
Service Code: 4e39a3abd3e2c20ed8000026
------
Service Name: Park Cleaning or Mowing
Service Code: 4e39a3aad3e2c20ed800000e
------
Service Name: Damaged Sidewalk
Service Code: 4e39a3abd3e2c20ed8000013
------
Service Name: Abandoned Vehicle
Service Code: 4e39a3abd3e2c20ed800001d
------
Service Name: Food Facility Complaint
Service Code: 4e39a3abd3e2c20ed8000027
------
Service Name: Trash, High Grass, or Weeds
Service Code: 4e39a3abd3e2c20ed8000010
------
Service Name: Downed Tree or Limb
Service Code: 4e39a3abd3e2c20ed8000014
------
Service Name: Parking Complaint
Service Code: 4e39a3abd3e2c20ed800001f
------
Service Name: Other
Service Code: 4e39a3abd3e2c20ed8000029
------
Service Name: Flooded Street
Service Code: 4e39a3abd3e2c20ed8000019
------
Service Name: Storm Drain or Inlet
Service Code: 4e39a3abd3e2c20ed8000017
------
Service Name: Water Leak (Exterior)
Service Code: 4e39a3abd3e2c20ed800001b
------
