/// <reference path="../../typings/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TexCardBoard;
(function (TexCardBoard) {
    var Orientation = (function () {
        function Orientation() {
            this.alpha = 0;
            this.gamma = 0;
            this.type = "CardBoard";
        }
        return Orientation;
    })();
    TexCardBoard.Orientation = Orientation;
    var AndroidDevice = (function (_super) {
        __extends(AndroidDevice, _super);
        function AndroidDevice() {
            var _this = this;
            _super.call(this);
            var setOrientationControls = function (e) {
                if (!e.alpha) {
                    return;
                }
                var message = new Orientation();
                var x = e.alpha;
                var y = e.gamma;
                if (y > 0) {
                    y = 180 - y;
                }
                else {
                    x = (x + 180) % 360;
                    y = -y;
                }
                document.getElementById('directions').innerHTML = x + "<br />" + y; // event.alphaで方角の値を取得
                message.alpha = x;
                message.gamma = y;
                _this.emit(AndroidDevice.OnDeviceOrientation, message);
            };
            window.addEventListener('deviceorientation', setOrientationControls, true);
        }
        AndroidDevice.prototype.movingAverage = function (orientations) {
        };
        AndroidDevice.OnDeviceOrientation = "onDeviceOrientation-AndroidDevice.ts";
        return AndroidDevice;
    })(EventEmitter2);
    TexCardBoard.AndroidDevice = AndroidDevice;
})(TexCardBoard || (TexCardBoard = {}));
//# sourceMappingURL=AndroidDevice.js.map