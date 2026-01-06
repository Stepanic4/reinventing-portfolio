window.onload = init;
console.warn = () => {};

function init() {
  const root = new THREERoot({
    createCameraControls: false,
    antialias: (window.devicePixelRatio === 1),
    fov: 80
  });

  root.renderer.setClearColor(0x000000, 0);
  root.renderer.setPixelRatio(window.devicePixelRatio || 1);
  root.camera.position.set(0, 0, 60);

  const width = 100;
  const height = 60;

  // --- 1. ЗАГРУЗКА ВСЕХ СЛАЙДОВ ---
  const l = new THREE.ImageLoader();
  l.setCrossOrigin('Anonymous');

  const slide1 = new Slide(width, height, 'out');
  slide1.setImage(l.load('https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1000&auto=format&fit=crop'));
  root.scene.add(slide1);

  const img2 = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop';
  const slide2_in = new Slide(width, height, 'in');
  slide2_in.setImage(l.load(img2));
  root.scene.add(slide2_in);

  const slide2_out = new Slide(width, height, 'out');
  slide2_out.setImage(l.load(img2));
  slide2_out.visible = false;
  root.scene.add(slide2_out);

  const slide3_in = new Slide(width, height, 'in');
  slide3_in.setImage(l.load('https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1000&auto=format&fit=crop'));
  slide3_in.visible = false;
  root.scene.add(slide3_in);

  // --- 2. НАСТРОЙКА ТАЙМЛАЙНА С ЖЕСТКИМ КОНТРОЛЕМ ВИДИМОСТИ ---
  const tl = new TimelineMax({
    repeat: -1,
    repeatDelay: 1.0,
    yoyo: true,
    onUpdate: function() {
      const time = tl.time();
      // Если время меньше 3 сек — показываем первую пару, скрываем вторую
      if (time < 3.0) {
        slide1.visible = true;
        slide2_in.visible = true;
        slide2_out.visible = false;
        slide3_in.visible = false;
      }
      // Если время больше 3 сек — скрываем первую пару, показываем вторую
      else {
        slide1.visible = false;
        slide2_in.visible = false;
        slide2_out.visible = true;
        slide3_in.visible = true;
      }
    }
  });

  // Переход 1: 0-3 сек
  tl.add(slide1.transition(), 0);
  tl.add(slide2_in.transition(), 0);

  // Переход 2: 3-6 сек
  tl.add(slide2_out.transition(), 3.0);
  tl.add(slide3_in.transition(), 3.0);

  createTweenScrubber(tl);
}

////////////////////
// КЛАССЫ (ОСТАЮТСЯ БЕЗ ИЗМЕНЕНИЙ)
////////////////////

function Slide(width, height, animationPhase) {
  const plane = new THREE.PlaneGeometry(width, height, width * 2, height * 2);
  THREE.BAS.Utils.separateFaces(plane);
  const geometry = new SlideGeometry(plane);
  geometry.bufferUVs();

  const aAnimation = geometry.createAttribute('aAnimation', 2);
  const aStartPosition = geometry.createAttribute('aStartPosition', 3);
  const aControl0 = geometry.createAttribute('aControl0', 3);
  const aControl1 = geometry.createAttribute('aControl1', 3);
  const aEndPosition = geometry.createAttribute('aEndPosition', 3);

  const minDuration = 0.8, maxDuration = 1.2, maxDelayX = 0.9, maxDelayY = 0.125, stretch = 0.11;
  this.totalDuration = maxDuration + maxDelayX + maxDelayY + stretch;

  const tempPoint = new THREE.Vector3();
  const getCtrl = (c, isFirst) => {
    const s = Math.sign(c.y);
    tempPoint.x = THREE.Math.randFloat(isFirst ? 0.1:0.3, isFirst ? 0.3:0.6) * 50;
    tempPoint.y = (isFirst ? s : -s) * THREE.Math.randFloat(isFirst ? 0.1:0.3, isFirst ? 0.3:0.6) * 70;
    tempPoint.z = THREE.Math.randFloatSpread(20);
    return tempPoint;
  };

  for (let i = 0, i2 = 0, i3 = 0; i < geometry.faceCount; i++, i2 += 6, i3 += 9) {
    const face = plane.faces[i];
    const centroid = THREE.BAS.Utils.computeCentroid(plane, face);
    const duration = THREE.Math.randFloat(minDuration, maxDuration);
    const delayX = THREE.Math.mapLinear(centroid.x, -width * 0.5, width * 0.5, 0.0, maxDelayX);
    let delayY = (animationPhase === 'in') ?
      THREE.Math.mapLinear(Math.abs(centroid.y), 0, height * 0.5, 0.0, maxDelayY) :
      THREE.Math.mapLinear(Math.abs(centroid.y), 0, height * 0.5, maxDelayY, 0.0);

    for (let v = 0; v < 6; v += 2) {
      aAnimation.array[i2 + v] = delayX + delayY + (Math.random() * stretch * duration);
      aAnimation.array[i2 + v + 1] = duration;
    }

    const c0 = (animationPhase === 'in') ? centroid.clone().sub(getCtrl(centroid, true)) : centroid.clone().add(getCtrl(centroid, true));
    const c1 = (animationPhase === 'in') ? centroid.clone().sub(getCtrl(centroid, false)) : centroid.clone().add(getCtrl(centroid, false));

    for (let v = 0; v < 9; v += 3) {
      aStartPosition.array[i3 + v] = centroid.x; aStartPosition.array[i3 + v + 1] = centroid.y; aStartPosition.array[i3 + v + 2] = 0;
      aControl0.array[i3 + v] = c0.x; aControl0.array[i3 + v + 1] = c0.y; aControl0.array[i3 + v + 2] = c0.z;
      aControl1.array[i3 + v] = c1.x; aControl1.array[i3 + v + 1] = c1.y; aControl1.array[i3 + v + 2] = c1.z;
      aEndPosition.array[i3 + v] = centroid.x; aEndPosition.array[i3 + v + 1] = centroid.y; aEndPosition.array[i3 + v + 2] = 0;
    }
  }

  const material = new THREE.BAS.BasicAnimationMaterial({
    shading: THREE.FlatShading, side: THREE.DoubleSide,
    uniforms: { uTime: { type: 'f', value: 0 } },
    shaderFunctions: [THREE.BAS.ShaderChunk['cubic_bezier'], THREE.BAS.ShaderChunk['ease_in_out_cubic']],
    shaderParameters: ['uniform float uTime;', 'attribute vec2 aAnimation;', 'attribute vec3 aStartPosition;', 'attribute vec3 aControl0;', 'attribute vec3 aControl1;', 'attribute vec3 aEndPosition;'],
    shaderVertexInit: ['float tDelay = aAnimation.x;', 'float tDuration = aAnimation.y;', 'float tTime = clamp(uTime - tDelay, 0.0, tDuration);', 'float tProgress = ease(tTime, 0.0, 1.0, tDuration);'],
    shaderTransformPosition: [(animationPhase === 'in' ? 'transformed *= tProgress;' : 'transformed *= 1.0 - tProgress;'), 'transformed += cubicBezier(aStartPosition, aControl0, aControl1, aEndPosition, tProgress);']
  }, { map: new THREE.Texture() });

  THREE.Mesh.call(this, geometry, material);
  this.frustumCulled = false;
}

Slide.prototype = Object.create(THREE.Mesh.prototype);
Slide.prototype.constructor = Slide;
Object.defineProperty(Slide.prototype, 'time', {
  get: function() { return this.material.uniforms['uTime'].value; },
  set: function(v) { this.material.uniforms['uTime'].value = v; }
});
Slide.prototype.setImage = function(image) { this.material.uniforms.map.value.image = image; this.material.uniforms.map.value.needsUpdate = true; };
Slide.prototype.transition = function() { return TweenMax.fromTo(this, 3.0, { time: 0.0 }, { time: this.totalDuration, ease: Power0.easeInOut }); };

function SlideGeometry(model) { THREE.BAS.ModelBufferGeometry.call(this, model); }
SlideGeometry.prototype = Object.create(THREE.BAS.ModelBufferGeometry.prototype);
SlideGeometry.prototype.constructor = SlideGeometry;
SlideGeometry.prototype.bufferPositions = function() {
  const positionBuffer = this.createAttribute('position', 3).array;
  for (let i = 0; i < this.faceCount; i++) {
    const face = this.modelGeometry.faces[i];
    const centroid = THREE.BAS.Utils.computeCentroid(this.modelGeometry, face);
    const vertices = [this.modelGeometry.vertices[face.a], this.modelGeometry.vertices[face.b], this.modelGeometry.vertices[face.c]];
    vertices.forEach((v, idx) => {
      const offset = (face[String.fromCharCode(97 + idx)]) * 3;
      positionBuffer[offset] = v.x - centroid.x;
      positionBuffer[offset + 1] = v.y - centroid.y;
      positionBuffer[offset + 2] = v.z - centroid.z;
    });
  }
};
function THREERoot(params) {
    // Находим наш контейнер
    const container = document.getElementById('three-container');

    this.renderer = new THREE.WebGLRenderer({ antialias: params.antialias, alpha: true });
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));

    // Вставляем холст именно в контейнер
    container.appendChild(this.renderer.domElement);

    // Камера теперь берет размеры контейнера
    this.camera = new THREE.PerspectiveCamera(params.fov, container.clientWidth / container.clientHeight, 1, 10000);
    this.scene = new THREE.Scene();

    this.resize = () => {
        if (!container) return;

        // Вместо фиксированных или старых значений берем текущую ширину родителя
        const currentWidth = container.clientWidth;

        // Чтобы на мобилках высота не была огромной (600px),
        // делаем её пропорциональной ширине (например, 16:9)
        const currentHeight = currentWidth < 768 ? currentWidth * 0.6 : container.clientHeight;

        this.camera.aspect = currentWidth / currentHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(currentWidth, currentHeight);
    };

    this.tick = () => {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.tick);
    };

    this.resize();
    this.tick();
    window.addEventListener('resize', this.resize, false);
}

function createTweenScrubber(tween, seekSpeed = 0.001) {
  let _cx = 0; let mouseDown = false;
  const seek = (dx) => { const p = THREE.Math.clamp((tween.progress() + (dx * seekSpeed)), 0, 1); tween.progress(p); };
  window.addEventListener('mousedown', (e) => { mouseDown = true; _cx = e.clientX; TweenMax.to(tween, 1, { timeScale: 0 }); });
  window.addEventListener('mouseup', () => { mouseDown = false; TweenMax.to(tween, 1, { timeScale: 1 }); });
  window.addEventListener('mousemove', (e) => { if (mouseDown) { seek(e.clientX - _cx); _cx = e.clientX; } });
}