/**
 * Node-Open311: A Node.js module for interacting with the Open311 API.
 * 
 * @copyright 2011 Mark J. Headd (http://www.voiceingov.org)
 * @author Mark Headd
 * 
 */

// Include required modules.
var EventEmitter = require('events').EventEmitter;
var http = require('http');
var https = require('https');

Open311 = function(options) {
	this.endpoint = options.endpoint;
	this.service_path = options.service_path;
	this.jurisdiction_id = options.jurisdiction_id;
	this.secure = options.secure || false;
	this.port = options.port || 80;
	this.responseBody;
};

Open311.prototype = new EventEmitter;

Open311.prototype.getServiceList = function(format) {
	var path = this.service_path + 'services.' + format + '?jurisdiction_id='
			+ this.jurisdiction_id;
	this.makeApiCall('GET', path);
};

Open311.prototype.getServiceDefinition = function(format, service_code) {
	var path = this.service_path + 'services/' + service_code + '.' + format
			+ '?jurisdiction_id=' + this.jurisdiction_id;
	this.makeApiCall('GET', path);
};

Open311.prototype.postSericeRequest = function(format, service_code, api_key,
		parameters) {
	var path = this.service_path + 'requests/' + format + '?api_key=' + api_key
			+ '&jurisdiction_id=' + this.jurisdiction_id;
	for (item in parameters) {
		params += '&' + item + '=' + encodeURI(parameters[item]);
	}
	path = path + params;
	this.makeApiCall('POST', path);
};

Open311.prototype.getRequestIdFromToken = function(format, token_id) {
	var path = this.service_path + 'tokens/' + token_ + id + '.' + format
			+ '?jurisdiction_id=' + this.jurisdiction_id;
	this.makeApiCall('GET', path);
};

Open311.prototype.getServiceRequestList = function(format, parameters) {
	var path = this.service_path + 'requests/' + format + '?jurisdiction_id='
			+ this.jurisdiction_id;
	for (item in parameters) {
		params += '&' + item + '=' + encodeURI(parameters[item]);
	}
	path = path + params;
	this.makeApiCall('GET', path);
};

Open311.prototype.getServiceRequest = function(format, service_request_id) {
	var path = this.service_path + 'requests/' + service_request_id + '.'
			+ format + '?jurisdiction_id=' + this.jurisdiction_id;
	this.makeApiCall('GET', path);
};

Open311.prototype.makeApiCall = function(method, path) {

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

	if (this.secure) {
		var open311 = https.request(options, function(response) {
			response.setEncoding('utf8');
			self.emit('responseCode', response.statusCode);
			response.on('data', function(data) {
				self.emit('responseBody', data);
			});
		});
		open311.end();
	}

	else {
		var open311 = http.request(options, function(response) {
			response.setEncoding('utf8');
			self.emit('responseCode', response.statusCode);
			response.on('data', function(data) {
				self.emit('responseBody', data);
			});
		});
		open311.end();
	}

};

exports.Open311 = Open311;
