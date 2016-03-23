/// <reference path="../../typings/tsd.d.ts" />
var TexCardBoard;
(function (TexCardBoard) {
    var CardBoard = (function () {
        function CardBoard(video) {
            var _this = this;
            this.video = video;
            this.contentWidth = 500;
            this.contentHeight = 400;
            this.init = function () {
                _this.renderer = new THREE.WebGLRenderer();
                _this.element = _this.renderer.domElement;
                _this.container = document.getElementById('example');
                _this.container.appendChild(_this.element);
                _this.effect = new THREE.StereoEffect(_this.renderer);
                _this.scene = new THREE.Scene();
                _this.camera = new THREE.PerspectiveCamera(90, 1, 0.001, 700);
                _this.camera.position.set(0, 0, -10);
                _this.camera.lookAt(new THREE.Vector3(0, 0, 0));
                _this.scene.add(_this.camera);
                _this.element.addEventListener('click', _this.fullscreen, false);
                var light = new THREE.AmbientLight(0xffffff);
                _this.scene.add(light);
                var texture = new THREE.VideoTexture(_this.video);
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
                var geometry = new THREE.PlaneGeometry(512, 512);
                _this.mesh = new THREE.Mesh(geometry, material);
                _this.mesh.rotation.x = -Math.PI;
                _this.mesh.position.set(0, -256, 600);
                //this.mesh.rotation.y +=  Math.PI / 3.0
                _this.scene.add(_this.mesh);
                var _axis = new THREE.AxisHelper(10);
                // ガイドの位置座標
                _axis.position.set(0, 0, 0);
                // ガイドをシーンへ追加
                _this.scene.add(_axis);
                window.addEventListener('resize', _this.resize, false);
                setTimeout(_this.resize, 1);
                document.addEventListener("webkitfullscreenchange", function () {
                    if (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) {
                        _this.contentWidth = screen.width;
                        _this.contentHeight = screen.height * window.devicePixelRatio;
                    }
                    else {
                        _this.contentWidth = 500;
                        _this.contentHeight = 400;
                    }
                }, false);
            };
            this.resize = function () {
                _this.camera.aspect = _this.contentWidth / _this.contentHeight;
                _this.camera.updateProjectionMatrix();
                _this.renderer.setSize(_this.contentWidth, _this.contentHeight);
                _this.effect.setSize(_this.contentWidth, _this.contentHeight);
            };
            this.update = function (dt) {
                _this.resize();
                _this.camera.updateProjectionMatrix();
            };
            this.render = function (t) {
                _this.effect.render(_this.scene, _this.camera);
            };
            this.animate = function () {
                requestAnimationFrame(_this.animate);
                _this.update(_this.clock.getDelta());
                _this.render(_this.clock.getDelta());
            };
            this.fullscreen = function () {
                if (_this.container.requestFullscreen) {
                    _this.container.requestFullscreen();
                }
                else if (_this.container.msRequestFullscreen) {
                    _this.container.msRequestFullscreen();
                }
                else if (_this.container.mozRequestFullScreen) {
                    _this.container.mozRequestFullScreen();
                }
                else if (_this.container.webkitRequestFullscreen) {
                    _this.container.webkitRequestFullscreen();
                }
            };
            console.log(THREE);
            this.clock = new THREE.Clock();
            console.log(this.clock);
            this.init();
            this.animate();
        }
        return CardBoard;
    })();
    TexCardBoard.CardBoard = CardBoard;
})(TexCardBoard || (TexCardBoard = {}));
//# sourceMappingURL=CardBoard.js.map