google.maps.event.addDomListener(window, 'load', function () {
    new google.maps.Map(
        document.getElementById('map'),
        {
            center: new google.maps.LatLng(32.9002652, -79.9162589),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    );
});