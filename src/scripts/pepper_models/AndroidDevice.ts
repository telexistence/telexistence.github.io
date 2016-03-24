/// <reference path="../../typings/tsd.d.ts" />

module TexCardBoard{
  export class Orientation {
    alpha = 0;
    beta = 0;
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
        message.alpha = e.alpha;
        message.beta = e.beta;
        message.gamma = e.gamma;
        this.emit(AndroidDevice.OnDeviceOrientation, message);
      };

      window.addEventListener('deviceorientation', setOrientationControls, true);
    }
  }
}


