/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./pepper_models/CardBoard.ts" />
/// <reference path="./pepper_models/Network.ts" />
/// <reference path="./pepper_models/AndroidDevice.ts" />

module TexCardBoard{
  export class Controller{
    private network: Network;
    private android: AndroidDevice;

    constructor(){
      var query = getQueryString();
      if(!query){
        query = {
          id: "oculus",
          prefix: "pepper_",
          target: "robot"
        };
      }
      var peerId = query['prefix'];


      navigator.mediaDevices.enumerateDevices().then((devices)=>{
        console.log(devices);
      }, (err)=>{
        console.log(err);
      });

      this.network = new Network(peerId);
      this.android = new AndroidDevice();
      this.android.on(AndroidDevice.OnDeviceOrientation, (e)=>{
        this.network.append(e);
      });
      this.network.on(Network.onVideo, (stream)=>{
        var video = <HTMLVideoElement>document.getElementById('video');
        video.src = window.URL.createObjectURL(stream);
        var cardboard = new CardBoard(video);
        cardboard.on(CardBoard.OnOrientation, (item)=>{
          this.network.append(item);
        });
      });
    }
  }
}

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

window.onload = ()=>{


  var tex = new TexCardBoard.Controller();
};

