/// <reference path="../../typings/tsd.d.ts" />

module TexCardBoard{
  export class Orientation {
    alpha = 0;
    gamma = 0;
    type = "CardBoard";
  }

  export class AndroidDevice extends EventEmitter2{
    static OnDeviceOrientation = "onDeviceOrientation-AndroidDevice.ts";

    constructor(){
      super();
      var setOrientationControls = (e) => {
        if (!e.alpha) {
          return;
        }

        var message = new Orientation();
        var x = e.alpha;
        var y = e.gamma;
        if(y > 0){
          x = x - 180;
          y = 90 - y;
        } else{
          x = (x + 180) % 360 - 180;
          y = -90 - y;
        }

        document.getElementById('directions').innerHTML = x + "<br />" + y; // event.alphaで方角の値を取得

        message.alpha = x;
        message.gamma = y;

        this.emit(AndroidDevice.OnDeviceOrientation, message);
      };

      window.addEventListener('deviceorientation', setOrientationControls, true);
    }

    movingAverage(orientations: Orientation[]){

    }
    /*
    averageWithoutOffset(first: number, second: number): number{
      if(Math.abs(first - second) > 180){

      } else{

      }
    }
    */
  }
}


