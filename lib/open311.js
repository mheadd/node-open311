/**
 * Node-Open311: A Node.js module for interacting with the Open311 API.
 * 
 * @copyright 2011 Mark J. Headd (http://www.voiceingov.org)
 * @author Mark J. Headd
 * 
 */

// Include required Node.js modules.
var http = require('http');
var https = require('https');

/**
 * Class constructor
 * @constructor
 * @param options Open311 settings.
 */
Open311 = function(options) {
	this.endpoint = options.endpoint;
	this.service_path = options.service_path;
	this.jurisdiction_id = options.jurisdiction_id;
	this.secure = options.secure || false;
	this.port = options.port || 80;
	this.responseBody = "";
};

/**
 * Service discovery.
 * @param format json|xml
 * @param callback Function to be executed on response from API.
 * @see http://wiki.open311.org/Service_Discovery
 */
Open311.prototype.serviceDiscovery = function(format, callback) {
	var path = this.service_path + 'discovery.' + format;
	this.makeAPICall('GET', path, callback);
};

/**
 * Get a list of service requests.
 * @param format json|xml
 * @param callback Function to be executed on response from API.
 * @see http://wiki.open311.org/GeoReport_v2#GET_Service_List
 */
Open311.prototype.getServiceList = function(format, callback) {
	var path = this.service_path + 'services.' + format + '?jurisdiction_id='
			+ this.jurisdiction_id;
	this.makeAPICall('GET', path, callback);
};

/**
 * Get the attributes associated with a specific service code.
 * @param format json|xml
 * @param service_code The service code to be looked up.
 * @param callback Function to be executed on response from API.
 * @see http://wiki.open311.org/GeoReport_v2#GET_Service_Definition
 */
Open311.prototype.getServiceDefinition = function(format, service_code, callback) {
	var path = this.service_path + 'services/' + service_code + '.' + format
			+ '?jurisdiction_id=' + this.jurisdiction_id;
	this.makeAPICall('GET', path, callback);
};

/**
 * Create a new service request.
 * @param format json|xml
 * @param service_code The service code to use when creating the request.
 * @param api_key Open311 API key.
 * @param parameters An object with parameters used to create the request.
 * @param callback Function to be executed on response from API.
 * @see http://wiki.open311.org/GeoReport_v2#POST_Service_Request
 */
Open311.prototype.postSericeRequest = function(format, service_code, api_key, parameters, callback) {
	var path = this.service_path + 'requests/' + format + '?api_key=' + api_key
			+ '&jurisdiction_id=' + this.jurisdiction_id;
	var params = '';
	for (item in parameters) {
		params += '&' + item + '=' + encodeURI(parameters[item]);
	}
	path = path + params;
	this.makeAPICall('POST', path, callback);
};

/**
 * Get a service request ID from a temporary token.
 * @param format json|xml
 * @param token_id The temporary token ID.
 * @param callback Function to be executed on response from API.
 * @see http://wiki.open311.org/GeoReport_v2#GET_request_id_from_a_token
 */
Open311.prototype.getRequestIdFromToken = function(format, token_id, callback) {
	var path = this.service_path + 'tokens/' + token_ + id + '.' + format
			+ '?jurisdiction_id=' + this.jurisdiction_id;
	this.makeAPICall('GET', path, callback);
};

/**
 * Get the status of multiple service requests.
 * @param format json|xml
 * @param parameters Optional arguments used when querying service requests.
 * @param callback Function to be executed on response from API.
 * @see http://wiki.open311.org/GeoReport_v2#GET_Service_Requests
 */
Open311.prototype.getServiceRequestList = function(format, parameters, callback) {
	var path = this.service_path + 'requests/' + format + '?jurisdiction_id=' + this.jurisdiction_id;
	var params = '';
	for (item in parameters) {
		params += '&' + item + '=' + encodeURI(parameters[item]);
	}
	path = path + params;
	this.makeAPICall('GET', path, callback);
};

/**
 * Get the status of a specific service request.
 * @param format json|xml
 * @param service_request_id The service request ID to query.
 * @param callback Function to be executed on response from API.
 * @see http://wiki.open311.org/GeoReport_v2#GET_Service_Request
 */
Open311.prototype.getServiceRequest = function(format, service_request_id, callback) {
	var path = this.service_path + 'requests/' + service_request_id + '.'
			+ format + '?jurisdiction_id=' + this.jurisdiction_id;
	this.makeAPICall('GET', path, callback);
};

/**
 * Utility method for making an HTTP request to the Open311 API. 
 * @param format json|xml
 * @param path The URI to send the HTTP request to.
 * @param callback Function to be executed on response from API.
 */
Open311.prototype.makeAPICall = function(method, path, callback) {

	var self = this;

	var content_type = method == 'POST' ? 'application/x-www-form-urlencoded' : 'text/plain';
	var request_headers = {
		'Content-Type' : content_type
	};
	var options = {
		host : this.endpoint,
		port : this.port,
		path : path,
		method : method,
		headers : request_headers
	};
	
	// Determine if SSL is used.
	if (this.secure) {
		var open311 = https.request(options, function(response){
			getResponse(response);
		});
		open311.end();
	}

	else {
		var open311 = http.request(options, function(response){
			getResponse(response);
		});
		open311.end();
	}
	
	// Simple utilty function to get HTTP response.
	function getResponse(response) {
		if (response.statusCode == 404) {
			callback(true, 'There was an error connecting to the Open311 API: ' + response.statusCode);
		}
		else {
			response.setEncoding('utf8');
			response.on('data', function(chunk) {
				self.responseBody += chunk;
			});
			response.on('end', function() {
				callback(false, self.responseBody);
			});	
		}
	}

};

exports.Open311 = Open311;