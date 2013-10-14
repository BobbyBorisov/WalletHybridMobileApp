var app = app || {};
app.utilities = app.utilities || {};

(function (a) {
    if (typeof (Number.prototype.toRad) === "undefined") {
        Number.prototype.toRad = function() {
            return this * Math.PI / 180;
        };
    }

    function getPosition() {
        return RSVP.Promise(function (success, error) {
            var options = {
                enableHighAccuracy: true
            };

            navigator.geolocation.getCurrentPosition(function (position) {
                success(position);
            }, function (e) {
                error(e);
            }, options);
        });
    }

    function calculateDistance(lat1, lon1, lat2, lon2) {
        var R = 6371;
        var dLat = (lat2 - lat1).toRad();
        var dLon = (lon2 - lon1).toRad();
        var firstLat = parseFloat(lat1).toRad();
        var secondLat = parseFloat(lat2).toRad();

        var a = Math.sin(dLat/2)*Math.sin(dLat/2) +
                       Math.sin(dLon/2)*Math.sin(dLon/2)*Math.cos(firstLat)*Math.cos(secondLat);
        var c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R*c;
    }

    a.geolocation = {
        calculateDistance: calculateDistance,
        getPosition: getPosition
    };
}(app.utilities));