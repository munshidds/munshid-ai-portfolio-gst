"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeBackgroundProps {
  activeSection: string;
}

export default function ThreeBackground({ activeSection }: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Control target background color based on section
  const getSectionColors = (section: string) => {
    switch (section) {
      case "hero":
        return {
          bg: new THREE.Color("#180d0a"), // Deep Coral/Terracotta base
          fog: new THREE.Color("#2d1510"),
          meshColorPrimary: new THREE.Color("#e87a5d"), // Soft Terracotta
          meshColorSecondary: new THREE.Color("#ffd4c2"),
        };
      case "expertise":
        return {
          bg: new THREE.Color("#080514"), // Deep Tech Indigo/Lavender base
          fog: new THREE.Color("#1a103c"),
          meshColorPrimary: new THREE.Color("#a78bfa"), // Soft Lavender/Purple
          meshColorSecondary: new THREE.Color("#c3b1e1"),
        };
      case "projects":
      case "contact":
      default:
        return {
          bg: new THREE.Color("#050505"), // Matte Deep Charcoal/Black
          fog: new THREE.Color("#121212"),
          meshColorPrimary: new THREE.Color("#f59e0b"), // Warm Amber/Gold
          meshColorSecondary: new THREE.Color("#d97706"),
        };
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Initialize Scene, Camera, Renderer
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const colors = getSectionColors(activeSection);
    scene.background = colors.bg;
    scene.fog = new THREE.FogExp2(colors.fog.getHex(), 0.05);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 15;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Add Ambient and Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x312e81, 1.2); // Blue hue fill
    dirLight2.position.set(-10, -5, -5);
    scene.add(dirLight2);

    // 3. Create Complex Abstract Generative Meshes
    // Floating Spheres, Toruses, Pill shapes
    const meshes: THREE.Mesh[] = [];

    // Mesh 1: Large Torus Knot (Main AI node core)
    const knotGeom = new THREE.TorusKnotGeometry(2.5, 0.7, 100, 16);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: colors.meshColorPrimary,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.3, // Glassic/iridescent gloss feel
      thickness: 0.5,
    });
    const knotMesh = new THREE.Mesh(knotGeom, knotMat);
    knotMesh.position.set(4, 2, -2);
    scene.add(knotMesh);
    meshes.push(knotMesh);

    // Mesh 2: Drifting Sphere
    const sphereGeom = new THREE.SphereGeometry(1.5, 64, 64);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: colors.meshColorSecondary,
      roughness: 0.4,
      metalness: 0.2,
    });
    const sphereMesh = new THREE.Mesh(sphereGeom, sphereMat);
    sphereMesh.position.set(-5, -3, 2);
    scene.add(sphereMesh);
    meshes.push(sphereMesh);

    // Mesh 3: Elegant Torus
    const torusGeom = new THREE.TorusGeometry(1.8, 0.4, 32, 100);
    const torusMat = new THREE.MeshPhysicalMaterial({
      color: colors.meshColorPrimary,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: false,
    });
    const torusMesh = new THREE.Mesh(torusGeom, torusMat);
    torusMesh.position.set(-6, 4, -4);
    torusMesh.rotation.set(Math.PI / 4, Math.PI / 6, 0);
    scene.add(torusMesh);
    meshes.push(torusMesh);

    // Mesh 4: Small secondary floating node (Icon connection)
    const coneGeom = new THREE.ConeGeometry(1, 2, 4);
    const coneMat = new THREE.MeshStandardMaterial({
      color: colors.meshColorSecondary,
      roughness: 0.5,
      metalness: 0.1,
    });
    const coneMesh = new THREE.Mesh(coneGeom, coneMat);
    coneMesh.position.set(6, -4, -1);
    scene.add(coneMesh);
    meshes.push(coneMesh);

    meshesRef.current = meshes;

    // 4. Connective Particle Dust (Neural Network Connections)
    const particleCount = 1200;
    const particlesGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sways = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Circle domain distribution
      const radius = 10 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);

      sways[i / 3] = Math.random() * 100; // Seed for wave animation
    }

    particlesGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xcccccc,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particlesGeom, particlesMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 5. Track Mouse Parallax
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 6. Handle Window Resizing
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 7. Animation Code Render Loop
    let animationFrameId = 0;
    const startTime = Date.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = (Date.now() - startTime) / 1000;

      // Smooth interpolating factor for mouse parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Parallax camera displacement
      camera.position.x = mouseRef.current.x * 2.5;
      camera.position.y = mouseRef.current.y * 2.5;
      camera.lookAt(0, 0, 0);

      // Rotate primary floating visual shapes
      if (meshes[0]) {
        meshes[0].rotation.x = elapsed * 0.12;
        meshes[0].rotation.y = elapsed * 0.15;
        // Float movement
        meshes[0].position.y = 2 + Math.sin(elapsed * 0.8) * 0.4;
      }
      if (meshes[1]) {
        meshes[1].rotation.x = elapsed * -0.1;
        meshes[1].rotation.z = elapsed * 0.08;
        meshes[1].position.y = -3 + Math.cos(elapsed * 0.7) * 0.3;
      }
      if (meshes[2]) {
        meshes[2].rotation.y = elapsed * 0.2;
        meshes[2].rotation.x = elapsed * 0.1;
        meshes[2].position.y = 4 + Math.sin(elapsed * 0.5) * 0.5;
      }
      if (meshes[3]) {
        meshes[3].rotation.y = -elapsed * 0.3;
        meshes[3].position.y = -4 + Math.cos(elapsed * 0.9) * 0.4;
      }

      // Rotate and sway particle net
      if (particles) {
        particles.rotation.y = elapsed * 0.03;
        particles.rotation.z = elapsed * 0.01;

        const posAttr = particles.geometry.attributes.position;
        if (posAttr) {
          const positionsArr = posAttr.array as Float32Array;
          for (let i = 0; i < particleCount; i++) {
            const seed = sways[i];
            positionsArr[i * 3 + 1] += Math.sin(elapsed + seed) * 0.003; // Slight drift
          }
          posAttr.needsUpdate = true;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup code
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (rendererRef.current && rendererRef.current.domElement) {
        containerRef.current?.removeChild(rendererRef.current.domElement);
      }

      // Dispose resources
      knotGeom.dispose();
      knotMat.dispose();
      sphereGeom.dispose();
      sphereMat.dispose();
      torusGeom.dispose();
      torusMat.dispose();
      coneGeom.dispose();
      coneMat.dispose();
      particlesGeom.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  // Effect to handle dynamic content section color morphing transitions
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const colors = getSectionColors(activeSection);

    // Standard linear interpolation (lerp) speed for smooth color morphing
    let frameId = 0;
    const transitionDuration = 1000; // ms
    const start = Date.now();

    const initialBg = scene.background ? (scene.background as THREE.Color).clone() : new THREE.Color("#000000");
    const initialFog = scene.fog ? (scene.fog as THREE.FogExp2).color.clone() : new THREE.Color("#000000");

    const mesh1 = meshesRef.current[0];
    const mesh2 = meshesRef.current[1];
    const mesh3 = meshesRef.current[2];
    const mesh4 = meshesRef.current[3];

    const initialMeshPrimary = mesh1 ? ((mesh1.material as THREE.MeshStandardMaterial).color).clone() : new THREE.Color("#ffffff");
    const initialMeshSecondary = mesh2 ? ((mesh2.material as THREE.MeshStandardMaterial).color).clone() : new THREE.Color("#ffffff");

    const lerpColors = () => {
      const now = Date.now();
      const progress = Math.min((now - start) / transitionDuration, 1);

      // Perform Color lerp
      const currentBg = initialBg.clone().lerp(colors.bg, progress);
      const currentFog = initialFog.clone().lerp(colors.fog, progress);
      const currentMeshPrimary = initialMeshPrimary.clone().lerp(colors.meshColorPrimary, progress);
      const currentMeshSecondary = initialMeshSecondary.clone().lerp(colors.meshColorSecondary, progress);

      scene.background = currentBg;
      if (scene.fog) {
        (scene.fog as THREE.FogExp2).color.copy(currentFog);
      }

      // Morph mesh colors smoothly
      if (mesh1) {
        (mesh1.material as THREE.MeshPhysicalMaterial).color.copy(currentMeshPrimary);
      }
      if (mesh2) {
        (mesh2.material as THREE.MeshStandardMaterial).color.copy(currentMeshSecondary);
      }
      if (mesh3) {
        (mesh3.material as THREE.MeshPhysicalMaterial).color.copy(currentMeshPrimary);
      }
      if (mesh4) {
        (mesh4.material as THREE.MeshStandardMaterial).color.copy(currentMeshSecondary);
      }

      if (progress < 1) {
        frameId = requestAnimationFrame(lerpColors);
      }
    };

    lerpColors();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [activeSection]);

  return (
    <div
      ref={containerRef}
      id="three-canvas"
      className="fixed inset-0 w-full h-full -z-10 overflow-hidden transition-all duration-1000"
      style={{ pointerEvents: "none" }}
    />
  );
}
