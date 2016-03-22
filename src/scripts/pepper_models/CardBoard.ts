/// <reference path="../../typings/tsd.d.ts" />

module TexCardBoard {
  export class CardBoard {
    private camera:THREE.PerspectiveCamera;
    private scene:THREE.Scene;
    private renderer:THREE.WebGLRenderer;
    private element:HTMLElement;
    private container:HTMLDivElement;
    private contentWidth = 500;
    private contentHeight = 400;
    private clock:THREE.Clock;
    private effect;
    private mesh:THREE.Mesh;

    constructor(private video: HTMLVideoElement) {
      console.log(THREE);
      this.clock = new THREE.Clock();
      console.log(this.clock);
      this.init();
      this.animate();
    }

    init = ()=> {
      this.renderer = new THREE.WebGLRenderer();
      this.element = this.renderer.domElement;
      this.container = <HTMLDivElement>document.getElementById('example');
      this.container.appendChild(this.element);

      this.effect = new (<any>THREE).StereoEffect(this.renderer);

      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(90, 1, 0.001, 700);
      this.camera.position.set(0, 0, -10);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.scene.add(this.camera);


      this.element.addEventListener('click', this.fullscreen, false);

      var light = new THREE.AmbientLight(0xffffff);
      this.scene.add(light);

      var texture = new THREE.VideoTexture( this.video );
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.format = THREE.RGBFormat;

      var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 20,
        shading: THREE.FlatShading,
        map: texture
      });

      var geometry = new THREE.PlaneGeometry(1000, 1000);

      this.mesh = new THREE.Mesh(geometry, material);
      this.mesh.rotation.x = -Math.PI;
      this.mesh.position.set(0, -100, 500);
      //this.mesh.rotation.y +=  Math.PI / 3.0
      this.scene.add(this.mesh);

      var _axis = new THREE.AxisHelper(10);
      // ガイドの位置座標
      _axis.position.set(0, 0, 0);
      // ガイドをシーンへ追加
      this.scene.add(_axis);

      window.addEventListener('resize', this.resize, false);
      setTimeout(this.resize, 1);

      document.addEventListener("webkitfullscreenchange", ()=> {
        if (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) {
          this.contentWidth = screen.width;
          this.contentHeight = screen.height * window.devicePixelRatio;
        }
        else {
          this.contentWidth = 500;
          this.contentHeight = 400;
        }
      }, false);
    };

    resize = ()=> {
      this.camera.aspect = this.contentWidth / this.contentHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(this.contentWidth, this.contentHeight);
      this.effect.setSize(this.contentWidth, this.contentHeight);
    };

    update = (dt)=> {
      this.resize();
      this.camera.updateProjectionMatrix();
    };

    render = (t)=> {
      this.effect.render(this.scene, this.camera);
    };

    animate = ()=> {
      requestAnimationFrame(this.animate);

      this.update(this.clock.getDelta());
      this.render(this.clock.getDelta());
    };

    fullscreen = ()=> {
      if (this.container.requestFullscreen) {
        this.container.requestFullscreen();
      } else if ((<any>this.container).msRequestFullscreen) {
        (<any>this.container).msRequestFullscreen();
      } else if ((<any>this.container).mozRequestFullScreen) {
        (<any>this.container).mozRequestFullScreen();
      } else if ((<any>this.container).webkitRequestFullscreen) {
        (<any>this.container).webkitRequestFullscreen();
      }
    }
  }
}
