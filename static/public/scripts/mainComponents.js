
// var MainBox = React.createClass({


// })





var GeoLocate = React.createClass({
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
	setLocation: function() {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		console.log(latitude);
		console.log(longitude);
	},
	render: function() {
		return (
			<div className="geoWrapper">
				<h3>Latitude: </h3><p>latitude</p>
				<h3>Longitude: </h3><p>longitude</p>
			</div>
		);
	}
});
React.render(
  <GeoLocate />,
  document.getElementById('content')
);