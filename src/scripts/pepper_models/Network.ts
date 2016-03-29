/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="./PeerIo.d.ts" />
/// <reference path="./AndroidDevice.ts" />

module TexCardBoard{
  import JSONLoader = THREE.JSONLoader;
  import OrbitControls = THREE.OrbitControls;

  class OrientationManager{
    private data: Orientation[];
    private offset_ = 0;

    constructor(){
      this.data = [];
      for(var i = 0; i < 4; i++){
        var orientation = new Orientation();
        orientation.alpha = 0;
        orientation.gamma = 0;
        this.data.push(orientation);
      }

      var button = document.getElementById('calibration');
      button.addEventListener('click', ()=>{
        //calibration
        this.offset_ = this.average().alpha;
      });
    }

    push(orientation: Orientation){
      this.data = this.data.slice(1);
      this.data.push(orientation);
    }

    private averageNum(a: number, b: number): number{
      if(Math.abs(a - b) < 180) return (a + b) / 2;
      else return (a + b + 360) / 2;
    }

    private averageOrientation(a: Orientation, b: Orientation): Orientation{
      var orientation = new Orientation();
      orientation.alpha = this.averageNum(a.alpha, b.alpha);
      orientation.gamma = this.averageNum(a.gamma, b.gamma);
      return orientation;
    }

    average(): Orientation{
      var fis = this.averageOrientation(this.data[0], this.data[1]);
      var snd = this.averageOrientation(this.data[2], this.data[3]);
      var avg = this.averageOrientation(fis, snd);
      avg.alpha = (avg.alpha - this.offset_ + 360) % 360;
      avg.alpha -= 180;
      avg.gamma -= 90;
      return avg;
    }

    tail(): Orientation{
      var orientation = JSON.parse(JSON.stringify(this.data[3]));
      orientation.gamma -= 90;
      orientation.alpha = (this.data[4].alpha - this.offset_ + 360) % 360;
      orientation.alpha -= 180;
      return orientation;
    }
  }

  export class Network extends EventEmitter2{
    static onVideo = "onVideo-in-network.ts";
    private peerIo_;
    private orientationManager_ = new OrientationManager();

    constructor(prefix: string){
      super();

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

      setInterval(this.transmit_, 100);
    }

    append(data: Orientation){
      this.orientationManager_.push(data);
    }

    private transmit_ = ()=>{
      var orientation = this.orientationManager_.tail();
      console.log("orientation");
      console.log(orientation);
      if(this.peerIo_) {
        this.peerIo_.broadcast(JSON.stringify(orientation));
      }
    };
  }
}

