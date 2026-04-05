import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Tesseract = () => {
  const outerRef = useRef<THREE.LineSegments>(null!);
  const innerRef = useRef<THREE.LineSegments>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);

  useFrame((state, delta) => {
    // Sci-fi continuous rotation
    if (outerRef.current && innerRef.current && groupRef.current && linesRef.current) {
      // Base continuous slow animation
      outerRef.current.rotation.x += delta * 0.05;
      outerRef.current.rotation.y += delta * 0.05;
      
      innerRef.current.rotation.x -= delta * 0.05;
      innerRef.current.rotation.y -= delta * 0.05;

      // Scroll-based dynamic rotation (Apple-style 3D scrub)
      const targetRotationY = window.scrollY * 0.005;
      const targetRotationX = window.scrollY * 0.002;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.08);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.08);

      // Float effect on the whole group
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  // Create connecting lines manually to give the 4D / hypercube look
  const d1 = 2; // Outer size
  const d2 = 1; // Inner size
  const points = [];
  
  // 8 corners of outer cube
  const outerCorners = [
    [-d1, -d1, -d1], [d1, -d1, -d1], [d1, d1, -d1], [-d1, d1, -d1],
    [-d1, -d1, d1], [d1, -d1, d1], [d1, d1, d1], [-d1, d1, d1]
  ];
  // 8 corners of inner cube
  const innerCorners = [
    [-d2, -d2, -d2], [d2, -d2, -d2], [d2, d2, -d2], [-d2, d2, -d2],
    [-d2, -d2, d2], [d2, -d2, d2], [d2, d2, d2], [-d2, d2, d2]
  ];

  for (let i = 0; i < 8; i++) {
    points.push(new THREE.Vector3(...outerCorners[i]));
    points.push(new THREE.Vector3(...innerCorners[i]));
  }
  const linesGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <group ref={groupRef}>
      <lineSegments ref={outerRef}>
        <edgesGeometry args={[new THREE.BoxGeometry(d1 * 2, d1 * 2, d1 * 2)]} />
        <lineBasicMaterial color="#a855f7" transparent opacity={0.15} />
      </lineSegments>
      
      <lineSegments ref={innerRef}>
        <edgesGeometry args={[new THREE.BoxGeometry(d2 * 2, d2 * 2, d2 * 2)]} />
        <lineBasicMaterial color="#10b981" transparent opacity={0.4} />
      </lineSegments>

      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial color="#d4af37" transparent opacity={0.2} />
      </lineSegments>

      <pointLight position={[0, 0, 0]} color="#a855f7" intensity={50} distance={10} visible={true} />
    </group>
  );
};

const TesseractBackground = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none w-full h-full opacity-60 flex justify-center items-center">
            {/* Soft radial overlay to focus the center tesseract */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-obsidian/70 to-obsidian z-10" />
            <Canvas camera={{ position: [0, 0, 7], fov: 50 }} gl={{ antialias: true, alpha: true }}>
                <ambientLight intensity={0.5} />
                <Tesseract />
            </Canvas>
        </div>
    );
};

export default TesseractBackground;
