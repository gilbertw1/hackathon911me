"use strict";

var express = require('express');
var router = express.Router();

var https = require('https');
var util = require('util');
var q = require('q');
var apiAccess = require('../apiAccess.json');

router.get('/', function (request, response) {
    var latitude = request.query.latitude !== undefined ? request.query.latitude : '0',
        longitude = request.query.longitude !== undefined ? request.query.longitude : '0';

    try {
        reverseGeocode(latitude, longitude).then(function (location) {
            response.send(JSON.stringify({
                location: location
            }));
        });

    } catch (err) {
        throw err;
    }
});

var reverseGeocode = function (latitude, longitude) {
    var deferred = q.defer(),
        apiPath = util.format(
            'https://api.mapbox.com/v4/geocode/mapbox.places/%s,%s.json?access_token=%s',
            longitude,
            latitude,
            apiAccess.mapbox.publicToken
        );

    https.get(apiPath, function (response) {
        var data = '';
        response.on('data', function (chunk) {
            data += chunk;
        });

        response.on('end', function () {
            try {
                var rawData = JSON.parse(data);
                if (rawData.features !== undefined &&
                        Array.isArray(rawData.features) &&
                        rawData.features.length > 0) {
                    deferred.resolve(rawData.features[0].place_name);
                }
            } catch (err) {
                throw err;
            }
        });
    });

    return deferred.promise;
};

module.exports = router;