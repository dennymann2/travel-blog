import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * ThreeDBackground - Premium 3D animated background using Three.js
 * Creates animated geometric shapes with lighting and camera controls
 * Performance optimized for mobile and low-end devices
 */
export function ThreeDBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile/touch device
    const isTouchDevice = () => {
      return (
        (typeof window !== "undefined" &&
          ("ontouchstart" in window ||
            navigator.maxTouchPoints > 0)) ||
        window.innerWidth < 768
      );
    };

    setIsMobile(isTouchDevice());

    const handleResize = () => {
      setIsMobile(isTouchDevice());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current || isMobile) return; // Skip 3D on mobile for performance

    // Scene setup
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    ) as any;
    camera.position.z = 5;

    // Renderer with optimized settings
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      precision: "lowp", // Lower precision for mobile
      powerPreference: "high-performance",
    }) as any;
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xf59e0b, 0.8) as any;
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff6b35, 0.6) as any;
    pointLight.position.set(-5, 3, 5);
    scene.add(pointLight);

    // Create animated geometries - simplified for performance
    const meshes: any[] = [];

    const geometry1 = new THREE.IcosahedronGeometry(1, 3); // Reduced from 4 to 3
    const material1 = new THREE.MeshPhongMaterial({
      color: 0xf59e0b,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.3,
      wireframe: true,
      flatShading: true, // Better performance
    });
    const mesh1 = new THREE.Mesh(geometry1, material1) as any;
    mesh1.position.set(-3, 0, 0);
    mesh1.castShadow = true;
    mesh1.receiveShadow = true;
    scene.add(mesh1);
    meshes.push(mesh1);

    const geometry2 = new THREE.TorusGeometry(1.5, 0.4, 8, 50); // Reduced segments
    const material2 = new THREE.MeshPhongMaterial({
      color: 0xff6b35,
      emissive: 0xff6b35,
      emissiveIntensity: 0.2,
      flatShading: true,
    });
    const mesh2 = new THREE.Mesh(geometry2, material2) as any;
    mesh2.position.set(3, 0, -1);
    mesh2.castShadow = true;
    mesh2.receiveShadow = true;
    scene.add(mesh2);
    meshes.push(mesh2);

    const geometry3 = new THREE.OctahedronGeometry(1, 2); // Reduced from 3 to 2
    const material3 = new THREE.MeshPhongMaterial({
      color: 0xfbbf24,
      emissive: 0xfbbf24,
      emissiveIntensity: 0.25,
      wireframe: false,
      flatShading: true,
    });
    const mesh3 = new THREE.Mesh(geometry3, material3) as any;
    mesh3.position.set(0, 2, -2);
    mesh3.castShadow = true;
    mesh3.receiveShadow = true;
    scene.add(mesh3);
    meshes.push(mesh3);

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let frameCount = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Optimized animation loop with frame skipping
    const animateScene = () => {
      requestAnimationFrame(animateScene);

      frameCount++;

      // Rotate meshes
      meshes.forEach((mesh) => {
        mesh.rotation.x += 0.002;
        mesh.rotation.y += 0.003;

        // Subtle float animation - slower for better performance
        mesh.position.y += Math.sin(Date.now() * 0.0002) * 0.0005;
      });

      // Update camera position - only every other frame for performance
      if (frameCount % 2 === 0) {
        camera.position.x = mouseX * 0.3; // Reduced sensitivity
        camera.position.y = mouseY * 0.3;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animateScene();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      const canvas = renderer.domElement as HTMLCanvasElement;
      if (containerRef.current && canvas.parentNode === containerRef.current) {
        containerRef.current.removeChild(canvas);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 opacity-40 pointer-events-none"
    />
  );
}
