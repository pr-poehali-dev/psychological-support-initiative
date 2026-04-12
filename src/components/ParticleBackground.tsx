import { useEffect, useRef } from "react";
import * as THREE from "three";

const WIDTH = 256;
const COUNT = WIDTH * WIDTH;

const gpgpuVert = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const gpgpuFrag = `
uniform sampler2D uPositions;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec4 pos = texture2D(uPositions, uv);

  float id = hash(uv);
  float t = uTime * (0.15 + id * 0.1);

  float wave =
    sin(pos.x * 1.8 + t * 1.1) * 0.018 +
    cos(pos.y * 2.2 + t * 0.9) * 0.014 +
    sin((pos.x + pos.y) * 1.4 + t * 1.3) * 0.012 +
    cos(pos.x * 3.1 - t * 0.7) * 0.007;

  float wave2 =
    cos(pos.y * 1.6 - t * 0.8) * 0.016 +
    sin(pos.x * 2.7 + t * 1.2) * 0.011 +
    cos((pos.x - pos.y) * 1.9 + t * 0.6) * 0.009;

  vec2 mouse = uMouse * 2.0 - 1.0;
  vec2 toMouse = vec2(pos.x, pos.y) - mouse;
  float mouseDist = length(toMouse);
  float mouseForce = smoothstep(0.8, 0.0, mouseDist) * 0.04;
  vec2 mouseDir = normalize(toMouse + 0.001) * mouseForce;

  pos.x += wave + mouseDir.x * 0.5;
  pos.y += wave2 + mouseDir.y * 0.5;

  pos.x = clamp(pos.x, -2.0, 2.0);
  pos.y = clamp(pos.y, -2.0, 2.0);

  pos.w = id;

  gl_FragColor = pos;
}
`;

const particleVert = `
uniform sampler2D uPositions;
uniform float uTime;
attribute vec2 aUv;
attribute float aId;
varying float vDepth;
varying float vBlink;
varying float vAlpha;

void main() {
  vec4 pos = texture2D(uPositions, aUv);
  vec3 p = vec3(pos.x, pos.y, pos.z);

  float depth = (p.z + 1.5) / 3.0;
  vDepth = depth;
  vBlink = sin(uTime * (1.2 + aId * 2.5) + aId * 6.28) * 0.5 + 0.5;
  vAlpha = 0.3 + vBlink * 0.5;

  float sz = mix(1.5, 5.0, depth);

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = sz * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const particleFrag = `
varying float vDepth;
varying float vBlink;
varying float vAlpha;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;

  float alpha = smoothstep(0.5, 0.0, d) * vAlpha;

  // Цвет частиц: тёплый sage-green с лёгким золотым отливом
  vec3 colNear = vec3(0.55, 0.78, 0.70); // мятно-зелёный
  vec3 colFar  = vec3(0.30, 0.52, 0.58); // глубокий морской
  vec3 col = mix(colFar, colNear, vDepth);
  col += vec3(0.08, 0.05, 0.0) * vBlink; // тёплое мерцание

  gl_FragColor = vec4(col, alpha);
}
`;

export default function ParticleBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Camera
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 3.5;

    // ── GPGPU setup ──────────────────────────────────────────────
    const gpgpuCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Initial positions texture
    const data = new Float32Array(COUNT * 4);
    for (let i = 0; i < COUNT; i++) {
      const x = ((i % WIDTH) / WIDTH) * 4 - 2;
      const y = (Math.floor(i / WIDTH) / WIDTH) * 4 - 2;
      const z = (Math.random() - 0.5) * 2;
      data[i * 4 + 0] = x;
      data[i * 4 + 1] = y;
      data[i * 4 + 2] = z;
      data[i * 4 + 3] = Math.random();
    }

    const dtTexture = new THREE.DataTexture(data, WIDTH, WIDTH, THREE.RGBAFormat, THREE.FloatType);
    dtTexture.needsUpdate = true;

    // Ping-pong render targets
    const rtA = new THREE.WebGLRenderTarget(WIDTH, WIDTH, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    });
    const rtB = rtA.clone();

    // Copy initial data into rtA
    const copyMat = new THREE.MeshBasicMaterial({ map: dtTexture });
    const copyQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), copyMat);
    const copyScene = new THREE.Scene();
    copyScene.add(copyQuad);
    renderer.setRenderTarget(rtA);
    renderer.render(copyScene, gpgpuCamera);
    renderer.setRenderTarget(null);

    // GPGPU sim material
    const simMat = new THREE.ShaderMaterial({
      vertexShader: gpgpuVert,
      fragmentShader: gpgpuFrag,
      uniforms: {
        uPositions: { value: rtA.texture },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(WIDTH, WIDTH) },
      },
    });
    const simQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simMat);
    const simScene = new THREE.Scene();
    simScene.add(simQuad);

    // ── Particle geometry ─────────────────────────────────────────
    const uvs = new Float32Array(COUNT * 2);
    const ids = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      uvs[i * 2 + 0] = (i % WIDTH) / WIDTH;
      uvs[i * 2 + 1] = Math.floor(i / WIDTH) / WIDTH;
      ids[i] = Math.random();
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));
    geo.setAttribute("aUv", new THREE.BufferAttribute(uvs, 2));
    geo.setAttribute("aId", new THREE.BufferAttribute(ids, 1));

    const partMat = new THREE.ShaderMaterial({
      vertexShader: particleVert,
      fragmentShader: particleFrag,
      uniforms: {
        uPositions: { value: rtA.texture },
        uTime: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geo, partMat);
    const scene = new THREE.Scene();
    scene.add(points);

    // ── Vignette post (fullscreen quad overlay) ───────────────────
    const vigMat = new THREE.ShaderMaterial({
      vertexShader: `void main(){gl_Position=vec4(position,1.0);}`,
      fragmentShader: `
        void main(){
          vec2 uv = gl_FragCoord.xy / vec2(${mount.clientWidth}.0, ${mount.clientHeight}.0);
          vec2 p = uv * 2.0 - 1.0;
          float v = smoothstep(0.5, 1.4, length(p));
          gl_FragColor = vec4(0.0, 0.0, 0.0, v * 0.65);
        }
      `,
      transparent: true,
      depthTest: false,
    });
    const vigQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), vigMat);
    const vigScene = new THREE.Scene();
    vigScene.add(vigQuad);

    // ── Mouse ─────────────────────────────────────────────────────
    const mouse = new THREE.Vector2(0.5, 0.5);
    const targetMouse = new THREE.Vector2(0.5, 0.5);
    const onMouseMove = (e: MouseEvent) => {
      targetMouse.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Resize ────────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop ────────────────────────────────────────────
    let raf: number;
    let ping = rtA;
    let pong = rtB;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      mouse.lerp(targetMouse, 0.04);

      // GPGPU step
      simMat.uniforms.uPositions.value = ping.texture;
      simMat.uniforms.uTime.value = t;
      simMat.uniforms.uMouse.value = mouse;

      renderer.setRenderTarget(pong);
      renderer.render(simScene, gpgpuCamera);
      renderer.setRenderTarget(null);

      // Swap
      const tmp = ping; ping = pong; pong = tmp;

      // Render particles
      partMat.uniforms.uPositions.value = ping.texture;
      partMat.uniforms.uTime.value = t;

      // Subtle camera drift on mouse
      camera.position.x += ((mouse.x - 0.5) * 0.3 - camera.position.x) * 0.03;
      camera.position.y += ((mouse.y - 0.5) * 0.3 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.autoClear = false;
      renderer.clear();
      renderer.render(scene, camera);
      renderer.render(vigScene, gpgpuCamera);
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      rtA.dispose();
      rtB.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        background: "linear-gradient(160deg, #0d1a1e 0%, #0e1f1a 40%, #0a1512 100%)",
      }}
    />
  );
}
