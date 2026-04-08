'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * union のヒーロー背景:
 *  - 多数の小さな結晶（ノード）が緩やかなリング状に集合し、
 *    近接ノード同士がラインで結ばれてネットワークを形成する。
 *  - 「個（小さなアプリ・現場・人）が結合して一つになる = union」を象徴。
 *  - 業界非依存・抽象的・DX的トーン。
 */
export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ========== Renderer / Scene / Camera ==========
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ========== Lights (tuned for white background) ==========
    scene.add(new THREE.AmbientLight(0xffffff, 0.85));

    const keyLight = new THREE.DirectionalLight(0x00b8d4, 1.1);
    keyLight.position.set(6, 8, 10);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x3b6cff, 0.5);
    rimLight.position.set(-7, -3, -5);
    scene.add(rimLight);

    // ========== Node positions (loose ring distribution) ==========
    const NODE_COUNT = 140;
    const positions: THREE.Vector3[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const t = (i / NODE_COUNT) * Math.PI * 2 + Math.random() * 0.4;
      const ringRadius = 5.2 + (Math.random() - 0.5) * 2.6;
      const tubeOffset = (Math.random() - 0.5) * 1.6;
      const tubeAngle = Math.random() * Math.PI * 2;

      const x = Math.cos(t) * ringRadius + Math.cos(tubeAngle) * tubeOffset;
      const y = Math.sin(t) * ringRadius * 0.55 + Math.sin(tubeAngle) * tubeOffset;
      const z = (Math.random() - 0.5) * 4.2;

      positions.push(new THREE.Vector3(x, y, z));
    }

    // ========== Instanced low-poly crystals ==========
    const nodeGeo = new THREE.IcosahedronGeometry(0.13, 0);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x0a4a6b,
      emissive: 0x00536b,
      emissiveIntensity: 0.25,
      roughness: 0.4,
      metalness: 0.6,
      flatShading: true,
    });
    const nodes = new THREE.InstancedMesh(nodeGeo, nodeMat, NODE_COUNT);

    const dummy = new THREE.Object3D();
    const baseScales: number[] = [];
    const phaseOffsets: number[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const p = positions[i];
      const s = 0.6 + Math.random() * 1.7;
      baseScales.push(s);
      phaseOffsets.push(Math.random() * Math.PI * 2);

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      nodes.setMatrixAt(i, dummy.matrix);
    }
    nodes.instanceMatrix.needsUpdate = true;

    // ========== Connection lines ==========
    const linePositions: number[] = [];
    const CONNECT_DIST = 1.85;
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (positions[i].distanceTo(positions[j]) < CONNECT_DIST) {
          linePositions.push(
            positions[i].x, positions[i].y, positions[i].z,
            positions[j].x, positions[j].y, positions[j].z,
          );
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3),
    );
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x0096b8,
      transparent: true,
      opacity: 0.32,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);

    // ========== Group ==========
    const group = new THREE.Group();
    group.add(nodes);
    group.add(lines);
    group.rotation.x = -0.18;
    scene.add(group);

    // ========== Animation loop ==========
    const clock = new THREE.Clock();
    let frameId = 0;

    const tick = () => {
      const t = clock.getElapsedTime();

      // Whole-group slow rotation + breathing tilt
      group.rotation.y = t * 0.08;
      group.rotation.x = -0.18 + Math.sin(t * 0.3) * 0.05;

      // Per-node breathing
      for (let i = 0; i < NODE_COUNT; i++) {
        const p = positions[i];
        const breathe = 1 + Math.sin(t * 1.4 + phaseOffsets[i]) * 0.18;
        dummy.position.set(p.x, p.y, p.z);
        dummy.rotation.set(t * 0.2 + phaseOffsets[i], t * 0.15, 0);
        dummy.scale.setScalar(baseScales[i] * breathe);
        dummy.updateMatrix();
        nodes.setMatrixAt(i, dummy.matrix);
      }
      nodes.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };
    tick();

    // ========== Resize ==========
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ========== Cleanup ==========
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      nodeGeo.dispose();
      nodeMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="hero-canvas" aria-hidden="true" />;
}
