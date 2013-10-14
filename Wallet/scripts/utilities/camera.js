var app = app || {};
app.utilities = app.utilities || {};

(function (a) {
    function takePicture() {
        var promise = new RSVP.Promise(function (successHandler, errorHandler) {
            navigator.camera.getPicture(function (data) {
                uploadPicture(data)
                    .then(function (url) {
                        successHandler(url);
                    }, function (error) {
                        errorHandler(error);
                    });

            }, function (error) {
                errorHandler(error);
            }, {
                quality: 50,
                destinationType: navigator.camera.DestinationType.DATA_URL
            });
        });

        return promise;
    }
    
    function uploadPicture(imageData) {
        return RSVP.Promise(function (success) {
            var fd = new FormData();
            fd.append("image", imageData);
            fd.append("type", "base64");
            fd.append("key", "6528448c258cff474ca9701c5bab6927");
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://api.imgur.com/2/upload.json");

            xhr.onload = function () {
                var imgUrl = JSON.parse(xhr.responseText).upload.links.imgur_page + ".jpg";
                success(imgUrl);
            };

            xhr.send(fd);
        });
    };

    a.camera = {
        takePicture: takePicture
    };
}(app.utilities));