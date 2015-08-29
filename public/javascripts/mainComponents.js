
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
	render: function () {
		return (
			<div className="mainBox">
				<div className="headerBox">
					<HeaderLink />
				</div>
				<BlueBand />
				<h3>Tell Responder</h3>
				<Address url="reverseGeocode"/>
				<CallButton />
				<GeoLocate />
			</div>
		);
	}
});

var Address = React.createClass({
	loadReverseGeolocationFromServer: function () {
		navigator.geolocation.getCurrentPosition(function (position) {
		    $.ajax({
		        url: this.props.url,
		        dataType: 'json',
		        method: 'GET',
		        data: {
		            'latitude': position.coords.latitude,
		            'longitude': position.coords.longitude
		        },
		        success: function (data) {
		        	this.setState({
		        		location: "I am at " + data.location + "."
		        	});
		        }.bind(this),
		        error: function (x,s,e) {
		            console.error(s,e);
		        }.bind(this)
		    });
		}.bind(this));
	},
	getInitialState: function () {
		return {
			location: "Getting your location..."
		};
	},
	componentDidMount: function () {
		this.loadReverseGeolocationFromServer();
	},
	render: function(){
		return (
		<div className="addressWrapper">
			<div className="speechArrow">
				<img src="../images/speechArrow.svg"></img>
			</div>
			<div className="locationAddress">
				<h3>{this.state.location}</h3>
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
	loadCoordinates: function () {
		navigator.geolocation.getCurrentPosition(function (position) {
			var latitude = Math.round(position.coords.latitude * 10000) / 10000,
				longitude = Math.round(position.coords.longitude * 10000) / 10000;

			this.setState({
				latitude: latitude,
				longitude: longitude
			});
		}.bind(this));
	},
	getInitialState: function () {
		return {
			latitude: 'Loading',
			longitude: 'Loading'
		};
	},
	componentDidMount: function () {
		this.loadCoordinates();
	},
	render: function() {
		return (
			<ul className="locationCords">
				<li>Latitude: {this.state.latitude}</li>
				<li>Longitude: {this.state.longitude}</li>
			</ul>
		);
	}
});
React.render(
  <MainBox />,
  document.getElementById('content')
);