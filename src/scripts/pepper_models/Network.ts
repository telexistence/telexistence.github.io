/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="./PeerIo.d.ts" />
/// <reference path="./AndroidDevice.ts" />

module TexCardBoard{
  import JSONLoader = THREE.JSONLoader;
  export class Network extends EventEmitter2{
    static onVideo = "onVideo-in-network.ts";
    private peerIo_;
    private data: Orientation[];
    private sendData: Orientation;

    constructor(prefix: string){
      super();
      this.data = [];
      for(var i = 0; i < 5; i++) this.data.push(new Orientation());

      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      navigator.getUserMedia({
        audio: true,
        video: false
      }, (stream)=>{
        console.log("getusermedia");
        this.init(prefix, stream);
      }, (err)=>{
        console.log(err);
      });
    }

    init(prefix: string, stream: MediaStream){
      var peer = new Peer({
        config: {"iceServers":[
          {"urls": "stun:stun.skyway.io:3478"}
        ]},
        host: 'robo.paas.jp-e1.cloudn-service.com',
        port: 443,
        secure: true,
        key: 'DEl4XWDPustUHICCl8cZ',
        debug: 0});

      peer.listAllPeers((peers)=>{
        console.log("listallpeers");
        console.log(peers);
        var filterd = _.filter(peers, (peer)=>{
          console.log(peer);
          console.log(prefix);
          return peer.indexOf(prefix) === 0;
        });
        var sorted = filterd.sort();
        console.log(sorted[sorted.length-1]);
        this.peerIo_.addDataNeighbour(sorted[sorted.length-1]);
      });

      this.peerIo_ = new PeerIo.PeerIo(peer);
      this.peerIo_.addDefaultStream(stream);

      this.peerIo_.on(PeerIo.OnRecvData, (peerId: string, message: string)=>{
      });

      this.peerIo_.on(PeerIo.OnDataLinkUp, (peerId)=>{
        console.log("establish data link with " + peerId);
        var message: any = {};
        message.peerId = peer.id;
        message.type = "callbackRequest";
        console.log("send");
        this.peerIo_.send(peerId, JSON.stringify(message));
      });

      this.peerIo_.on(PeerIo.OnStartVideo, (peerId, stream)=>{
        console.log(stream);
        this.emit(Network.onVideo, stream);
      });

      //setInterval(this.transmit_, 100);
    }

    append(data: Orientation){
      /*
      this.data.push(data);
      this.data = this.data.slice(1, this.data.length);
      this.sendData = new Orientation();
      for(var i = 0; i < 5; i++){
        this.sendData.alpha += this.data[i].alpha;
        this.sendData.beta += this.data[i].beta;
        this.sendData.gamma += this.data[i].gamma;
      }

      this.sendData.alpha /= 5.0;
      this.sendData.beta /= 5.0;
      this.sendData.gamma /= 5.0;
      */
    //  this.sendData = data;
      if(this.peerIo_) {
        this.peerIo_.broadcast(JSON.stringify(data));
      }
    }

    private transmit_ = ()=>{
      if(this.peerIo_) {
        this.peerIo_.broadcast(JSON.stringify(this.sendData));
      }
    };
  }
}

