/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="./PeerIo.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TexCardBoard;
(function (TexCardBoard) {
    var Network = (function (_super) {
        __extends(Network, _super);
        function Network(prefix) {
            var _this = this;
            _super.call(this);
            console.log("prefix");
            console.log(prefix);
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            navigator.getUserMedia({
                audio: true,
                video: false
            }, function (stream) {
                console.log("getusermedia");
                _this.init(prefix, stream);
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
        };
        Network.prototype.send = function (data) {
            if (this.peerIo_)
                this.peerIo_.broadcast(JSON.stringify(data));
        };
        Network.onVideo = "onVideo-in-network.ts";
        return Network;
    })(EventEmitter2);
    TexCardBoard.Network = Network;
})(TexCardBoard || (TexCardBoard = {}));
//# sourceMappingURL=Network.js.map