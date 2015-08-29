
var MainBox = React.createClass({
	render: function () {
		return (
			<div className="mainBox">
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
		        	this.setState({data: data});
		        }.bind(this),
		        error: function (x,s,e) {
		            console.error(s,e);
		        }.bind(this)
		    });
		}.bind(this));
	},
	getInitialState: function () {
		return {data: {}};
	},
	componentDidMount: function () {
		this.loadReverseGeolocationFromServer();
	},
	render: function(){
		return (
		<div className="addressWrapper">
			<div className="locationAddress">
				<h3>{this.state.data.location}</h3>
			</div>
		</div>
		);
	}
});

var CallButton = React.createClass({
	render: function(){
		return (
			<div className="callButton">
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
			<div className="locationCords">
				<h3>Latitude: </h3><p>{this.state.latitude}</p>
				<h3>Longitude: </h3><p>{this.state.longitude}</p>
			</div>
		);
	}
});
React.render(
  <MainBox />,
  document.getElementById('content')
);