import { useEffect } from "react";
import * as THREE from "three";

/**
 * The site's signature 3D element: a flowing particle "current" bending
 * through space along a spline, with glowing waypoint nodes marking each
 * recurring event/track. Fully mounts/tears down with the hero section.
 */
export default function Scene3D({ mount }) {
  useEffect(() => {
    const el = mount.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 0.6, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    const curvePoints = [];
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      const x = (t - 0.5) * 14;
      const y = Math.sin(t * Math.PI * 2.1) * 1.4;
      const z = Math.cos(t * Math.PI * 1.4) * 2.2 - 1;
      curvePoints.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(curvePoints);

    const tubeGeo = new THREE.TubeGeometry(curve, 200, 0.045, 8, false);
    const tubeMat = new THREE.MeshBasicMaterial({ color: 0x1fcbb2, transparent: true, opacity: 0.14 });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    scene.add(tube);

    const PARTICLE_COUNT = 260;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const offsets = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) offsets[i] = Math.random();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x4be3cf,
      size: 0.055,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    const nodeTs = [0.08, 0.36, 0.62, 0.9];
    const nodes = nodeTs.map((t) => {
      const geo = new THREE.SphereGeometry(0.09, 16, 16);
      const mat = new THREE.MeshBasicMaterial({ color: 0xffb238 });
      const meshNode = new THREE.Mesh(geo, mat);
      const p = curve.getPointAt(t);
      meshNode.position.copy(p);
      scene.add(meshNode);

      const glowGeo = new THREE.SphereGeometry(0.22, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({ color: 0xffb238, transparent: true, opacity: 0.18 });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      glow.position.copy(p);
      scene.add(glow);
      return { mesh: meshNode, glow };
    });

    const starGeo = new THREE.BufferGeometry();
    const STAR_COUNT = 300;
    const starPos = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 30;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xdce7e2, size: 0.02, transparent: true, opacity: 0.35 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    const group = new THREE.Group();
    group.add(tube, particles, ...nodes.map((n) => n.mesh), ...nodes.map((n) => n.glow));
    scene.add(group);

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    el.addEventListener("mousemove", onMouseMove);

    let raf;
    const clock = new THREE.Clock();
    const animate = () => {
      const dt = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      const posAttr = particleGeo.attributes.position;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        offsets[i] += dt * 0.045;
        if (offsets[i] > 1) offsets[i] -= 1;
        const p = curve.getPointAt(offsets[i]);
        posAttr.setXYZ(i, p.x, p.y, p.z);
      }
      posAttr.needsUpdate = true;

      nodes.forEach((n, i) => {
        const s = 1 + Math.sin(elapsed * 1.6 + i) * 0.18;
        n.glow.scale.setScalar(s);
      });

      group.rotation.y += dt * 0.03;
      camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.02;
      camera.position.y += (0.6 - mouseY * 0.6 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, -1);

      stars.rotation.y += dt * 0.005;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      el.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      tubeGeo.dispose();
      tubeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      nodes.forEach((n) => {
        n.mesh.geometry.dispose();
        n.mesh.material.dispose();
        n.glow.geometry.dispose();
        n.glow.material.dispose();
      });
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
    };
  }, [mount]);

  return null;
}
