/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./pepper_models/CardBoard.ts" />
/// <reference path="./pepper_models/Network.ts" />
/// <reference path="./pepper_models/AndroidDevice.ts" />
var TexCardBoard;
(function (TexCardBoard) {
    var Controller = (function () {
        function Controller() {
            var _this = this;
            var query = getQueryString();
            if (!query) {
                query = {
                    id: "oculus",
                    prefix: "pepper_",
                    target: "robot"
                };
            }
            var peerId = query['prefix'];
            this.network = new TexCardBoard.Network(peerId);
            this.android = new TexCardBoard.AndroidDevice();
            this.android.on(TexCardBoard.AndroidDevice.OnDeviceOrientation, function (e) {
                _this.network.append(e);
            });
            this.network.on(TexCardBoard.Network.onVideo, function (stream) {
                var video = document.getElementById('video');
                video.src = window.URL.createObjectURL(stream);
                var cardboard = new TexCardBoard.CardBoard(video);
                cardboard.on(TexCardBoard.CardBoard.OnOrientation, function (item) {
                    _this.network.append(item);
                });
            });
        }
        return Controller;
    })();
    TexCardBoard.Controller = Controller;
})(TexCardBoard || (TexCardBoard = {}));
function getQueryString() {
    if (1 < document.location.search.length) {
        var query = document.location.search.substring(1);
        var parameters = query.split('&');
        var result = new Object();
        for (var i = 0; i < parameters.length; i++) {
            var element = parameters[i].split('=');
            var paramName = decodeURIComponent(element[0]);
            var paramValue = decodeURIComponent(element[1]);
            result[paramName] = decodeURIComponent(paramValue);
        }
        return result;
    }
    return null;
}
window.onload = function () {
    var tex = new TexCardBoard.Controller();
};
//# sourceMappingURL=pepper.js.map