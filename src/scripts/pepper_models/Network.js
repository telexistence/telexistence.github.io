/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="./PeerIo.d.ts" />
/// <reference path="./AndroidDevice.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TexCardBoard;
(function (TexCardBoard) {
    var OrientationManager = (function () {
        function OrientationManager() {
            var _this = this;
            this.offset_ = 0;
            this.data = [];
            for (var i = 0; i < 4; i++) {
                var orientation = new TexCardBoard.Orientation();
                orientation.alpha = 0;
                orientation.gamma = 0;
                this.data.push(orientation);
            }
            var button = document.getElementById('calibration');
            button.addEventListener('click', function () {
                //calibration
                _this.offset_ = _this.data[3].alpha - 180;
            });
        }
        OrientationManager.prototype.push = function (orientation) {
            this.data = this.data.slice(1);
            this.data.push(orientation);
        };
        OrientationManager.prototype.averageNum = function (a, b) {
            if (Math.abs(a - b) < 180)
                return (a + b) / 2;
            else
                return (a + b + 360) / 2;
        };
        OrientationManager.prototype.averageOrientation = function (a, b) {
            var orientation = new TexCardBoard.Orientation();
            orientation.alpha = this.averageNum(a.alpha, b.alpha);
            orientation.gamma = this.averageNum(a.gamma, b.gamma);
            return orientation;
        };
        OrientationManager.prototype.average = function () {
            var fis = this.averageOrientation(this.data[0], this.data[1]);
            var snd = this.averageOrientation(this.data[2], this.data[3]);
            var avg = this.averageOrientation(fis, snd);
            avg.alpha = (avg.alpha - this.offset_ + 360) % 360;
            avg.alpha -= 180;
            return avg;
        };
        OrientationManager.prototype.tail = function () {
            var orientation = new TexCardBoard.Orientation();
            orientation.alpha = this.data[3].alpha;
            orientation.gamma = this.data[3].gamma;
            orientation.alpha = (orientation.alpha - this.offset_ + 360) % 360;
            orientation.alpha -= 180;
            document.getElementById('debug').innerHTML =
                orientation.alpha
                    + "<br />"
                    + orientation.gamma
                    + "<br/>"
                    + this.offset_; // event.alphaで方角の値を取得
            return orientation;
        };
        return OrientationManager;
    })();
    var Network = (function (_super) {
        __extends(Network, _super);
        function Network(prefix) {
            var _this = this;
            _super.call(this);
            this.orientationManager_ = new OrientationManager();
            this.transmit_ = function () {
                var orientation = _this.orientationManager_.tail();
                if (_this.peerIo_) {
                    _this.peerIo_.broadcast(JSON.stringify(orientation));
                }
            };
            navigator.mediaDevices.enumerateDevices().then(function (devices) {
                console.log(devices);
                var find = _.find(devices, function (device) {
                    return device.label === "Speakerphone";
                });
                if (find) {
                    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                    navigator.getUserMedia({
                        audio: {
                            optional: [{ sourceId: find.deviceId }]
                        },
                        video: false
                    }, function (stream) {
                        console.log("getusermedia");
                        _this.init(prefix, stream);
                    }, function (err) {
                        console.log(err);
                    });
                }
                else {
                    document.getElementById('log').innerHTML = "<h1>bluetooth not connected</h1>";
                }
                console.log("find");
                console.log(find);
            }, function (err) {
                console.log(err);
            });
        }
        Network.prototype.init = function (prefix, stream) {
            var _this = this;
            var peer = new Peer({
                config: { "iceServers": [
                        { "urls": "stun:stun.skyway.io:3478" }
                    ] },
                host: 'robo.paas.jp-e1.cloudn-service.com',
                port: 443,
                secure: true,
                key: 'DEl4XWDPustUHICCl8cZ',
                debug: 0 });
            peer.listAllPeers(function (peers) {
                console.log("listallpeers");
                console.log(peers);
                var filterd = _.filter(peers, function (peer) {
                    console.log(peer);
                    console.log(prefix);
                    return peer.indexOf(prefix) === 0;
                });
                var sorted = filterd.sort();
                console.log(sorted[sorted.length - 1]);
                _this.peerIo_.addDataNeighbour(sorted[sorted.length - 1]);
            });
            this.peerIo_ = new PeerIo.PeerIo(peer);
            this.peerIo_.addDefaultStream(stream);
            this.peerIo_.on(PeerIo.OnRecvData, function (peerId, message) {
            });
            this.peerIo_.on(PeerIo.OnDataLinkUp, function (peerId) {
                console.log("establish data link with " + peerId);
                var message = {};
                message.peerId = peer.id;
                message.type = "callbackRequest";
                console.log("send");
                _this.peerIo_.send(peerId, JSON.stringify(message));
            });
            this.peerIo_.on(PeerIo.OnStartVideo, function (peerId, stream) {
                console.log(stream);
                _this.emit(Network.onVideo, stream);
            });
            setInterval(this.transmit_, 1000 / 30);
        };
        Network.prototype.append = function (data) {
            this.orientationManager_.push(data);
        };
        Network.onVideo = "onVideo-in-network.ts";
        return Network;
    })(EventEmitter2);
    TexCardBoard.Network = Network;
})(TexCardBoard || (TexCardBoard = {}));
//# sourceMappingURL=Network.js.map