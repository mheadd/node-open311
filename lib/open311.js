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


Open311 = function(endpoint, service_path, jurisdiction_id, secure) {
	this.endpoint = endpoint;
	this.service_path = service_path;
	this.jurisdiction_id = jurisdiction_id;
	this.secure = secure;
	this.responseBody;
};

Open311.prototype = new EventEmitter;

Open311.prototype.getServiceList = function(format) {
	var path = this.service_path + 'services.' + format + '?jurisdiction_id=' + this.jurisdiction_id;
	this.makeApiCall('GET', path);	
};

Open311.prototype.getServiceDefinition = function(format, service_code) {
	var path = this.service_path + 'services/' + service_code + '.' + format + '?jurisdiction_id=' + this.jurisdiction_id;
	this.makeApiCall('GET', path);	
};

Open311.prototype.postSericeRequest = function(format, service_code, api_key, parameters) {
	var path = this.service_path + 'requests/' + format + '?api_key=' + api_key + '&jurisdiction_id=' + this.jurisdiction_id;	
	for(item in parameters) {
		params += '&' + item + '=' + encodeURI(parameters[item]);
	}
	path = path + params;
	this.makeApiCall('POST', path);	
};

Open311.prototype.getRequestIdFromToken = function(format, token_id) {
	var path = this.service_path + 'tokens/' + token_+id + '.' + format + '?jurisdiction_id=' + this.jurisdiction_id;
	this.makeApiCall('GET', path);	
};

Open311.prototype.getServiceRequestList = function(format, parameters) {
	var path = this.service_path + 'requests/' + format + '?jurisdiction_id=' + this.jurisdiction_id;
	for(item in parameters) {
		params += '&' + item + '=' + encodeURI(parameters[item]);
	}
	path = path + params;
	this.makeApiCall('GET', path);	
};

Open311.prototype.getServiceRequest = function(format, service_request_id) {
	var path = this.service_path + 'requests/' + service_request_id + '.' + format + '?jurisdiction_id=' + this.jurisdiction_id;
	this.makeApiCall('GET', path);	
};

Open311.prototype.makeApiCall =  function(method, path) {
	
	var self = this;
		
	var content_type = method == 'POST' ? 'application/x-www-form-urlencoded' : 'text/plain';
	var headers = {'host': this.endpoint, 'Content-Type' : content_type};
	var port = this.secure ? 443 : 80;
	var open311 = http.createClient(port, this.endpoint, this.secure);
	var request = open311.request(method, path, headers);

	request.end();

	request.on('response', function (response) {
	  response.setEncoding('utf8');
	  self.emit('responseCode', response.statusCode);
	  response.addListener('data', function (chunk) {
		  if(typeof(this.responseBody) == 'undefined') { this.responseBody = ''; }
		  this.responseBody += chunk;
	  });
	  response.addListener('end', function() {
		  self.emit('responseBody', this.responseBody);
	  });
	});
	
};

exports.Open311 = Open311;
