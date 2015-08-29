
var HeaderLink = React.createClass({
	render: function(){
		return (
			<ul className="headerlink">
				<li onclick='#'>MAP</li>
				<li onclick='#'>CALL</li>
				<li onclick='#'>HOSPITALS</li>
			</ul>
		);
	}
});

var BlueBand = React.createClass({
	render: function(){
		return(
			<div className="blueBand">
			</div>
		);
	}
});
var MainBox = React.createClass({
	render: function(){
		return (
			<div className="mainBox">
				<div className="headerBox">
					<HeaderLink />
				</div>
				<BlueBand />
				<h3>Tell Responder</h3>
				<Address />
				<CallButton />
				<GeoLocate />
			</div>
		);
	}
});

var Address = React.createClass({
	render: function(){
		return (
		<div className="addressWrapper">
		<div className="speechArrow">
			<img src="../images/speechArrow.svg"></img>
		</div>
		<div className="locationAddress">
			<h3>I am at 233 VARIABLE st</h3>
		</div>
		</div>
		);
	}
});

var CallButton = React.createClass({
	render: function(){
		return (
			<div className="callButton">
				<div className="phoneIcon">
					<img src="../images/phoneIcon.svg"></img>
				</div>
				<h1>911</h1>
			</div>
		);
	}
});
	

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
			<div className="locationCords">
				<h3>Latitude: </h3><p>latitude</p>
				<h3>Longitude: </h3><p>longitude</p>
			</div>
		);
	}
});
React.render(
  <MainBox />,
  document.getElementById('content')
);