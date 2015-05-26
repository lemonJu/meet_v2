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

function ajax(url, params, success, error,method,data) {
	error = error || null;
	method = method || "GET";
	data = data || null;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			success.call(xhr, xhr.responseText);
		}
	}
	xhr.onerror = error;
	xhr.open(method, url);
	xhr.withCredentials = true;
	if(method.toUpperCase()=='POST'){
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
		xhr.send(params,data);
	}
	xhr.send(params);
}