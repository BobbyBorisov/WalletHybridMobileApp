/// <reference path="require.js" />
/// <reference path="jquery-2.0.3.js" />
/// <reference path="rsvp.min.js" />
var app = app || {};

app.requester = (function ($) {

	function getJSON(serviceUrl, headers) {
		var promise = new RSVP.Promise(function (resolve, reject) {
			jQuery.ajax({
				url: serviceUrl,
				type: "GET",
                headers:headers,
				dataType: "json",
				success: function (data) {
					resolve(data);
				},
				error: function (err) {
					reject(err);
				}
			});
		});

		return promise;
	}

	function deleteJSON(serviceUrl, headers) {
	    var promise = new RSVP.Promise(function (resolve, reject) {
	        jQuery.ajax({
	            url: serviceUrl,
	            type: "DELETE",
	            headers: headers,
	            dataType: "json",
	            success: function (data) {
	                resolve(data);
	            },
	            error: function (err) {
	                reject(err);
	            }
	        });
	    });

	    return promise;
	}

	function postJSON(serviceUrl, data, headers) {
		var promise = new RSVP.Promise(function (resolve, reject) {
			jQuery.ajax({
				url: serviceUrl,
				dataType: "json",
				type: "POST",
				contentType: "application/json",
				headers: headers,
				data: JSON.stringify(data),
				success: function (data) {
					resolve(data);
				},
				error: function (err) {
					reject(err);
				}
			});
		});
		return promise;
	}

	function putJSON(serviceUrl, data, headers) {
	    var promise = new RSVP.Promise(function (resolve, reject) {
	        jQuery.ajax({
	            url: serviceUrl,
	            dataType: "json",
	            type: "PUT",
	            contentType: "application/json",
	            headers: headers,
	            data: JSON.stringify(data),
	            success: function (data) {
	                resolve(data);
	            },
	            error: function (err) {
	                if (err.status === 200) {	                   
	                    resolve(err);
	                }
	                else {
	                    reject(err);
	                    console.log("ERROR", err);
	                }
//work around
	            }
	        });
	    });
	    return promise;
	}

	return {
		getJSON: getJSON,
		postJSON: postJSON,
		putJSON: putJSON,
		deleteJSON: deleteJSON
	}
}(jQuery));