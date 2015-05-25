var REMOTEURL = 'http://reloney123.oicp.net:3000';

item = (function(){
	var ls = window.localStorage;
	return {
		get: function(key) {
			return ls.getItem(key)
		},
		set: function(key, value) {
			return ls.setItem(key, value)
		}
	}
})()

function ajax(url, params, success, error) {
	error = error || null;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			success.call(xhr);
		}
	}
	xhr.onerror = error;
	xhr.open("GET", url);
	xhr.withCredentials = true;
	xhr.send(params);
}
