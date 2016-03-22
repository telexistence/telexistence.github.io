/// <reference path="../../typings/tsd.d.ts" />

module TexCardBoard{
  export class AndroidDevice extends EventEmitter2{
    static OnDeviceOrientation = 'onDeviceOrientation-Android';
    constructor(){
      super();
      var setOrientationControls = (e) => {
        if (!e.alpha) {
          return;
        }

        var message: any = {};
        message.alpha = e.alpha;
        message.beta = e.beta;
        message.gamma = e.gamma;
        this.emit('orientation', message);
      };

      window.addEventListener(AndroidDevice.OnDeviceOrientation, setOrientationControls, true);
    }
  }
}


