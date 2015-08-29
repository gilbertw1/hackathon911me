"use strict";

var express = require('express');
var router = express.Router();

var https = require('https');
var util = require('util');
var q = require('q');
var apiAccess = require('../apiAccess.json');

router.get('/reverseGeocode', function (request, response) {
    var latitude = '-73.989',
        longitude = '40.733';

    var location;
    try {
        location = reverseGeocode(latitude, longitude).resolve();
    } catch (err) {
        throw err;
    }

    response.send(JSON.stringify({
        description: location
    }));
});

var reverseGeocode = function (latitude, longitude) {
    var deferred = q.defer();
    var apiPath = util.format(
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
                if (rawData.features !== 'undefined' &&
                        Array.isArray(rawData.features) &&
                        rawData.length > 0) {
                    deferred.resolve(rawData[0].place_name);
                }
            } catch (err) {
                throw err;
            }
        });
    });

    return deferred.promise;
};

module.exports = router;