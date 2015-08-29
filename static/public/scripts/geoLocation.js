
var Locator = {
	getLocation: function() {
		if (navigator.geolocation) {
			var location = this;
				navigator.geolocation.getCurrentPosition(function(position) {
					app.position = position;
					console.log("location set");
				});
			} 
		else {
			console.error("Geolocation no enabled");
		}
	},
	start: function() {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		console.log(latitude);
		console.log(longitude);
	}
};