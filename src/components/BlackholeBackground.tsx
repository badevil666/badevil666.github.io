import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ── Shaders ──────────────────────────────────────────────────────────────────

const GLOW_VERT = `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 viewPos = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-viewPos.xyz);
    gl_Position = projectionMatrix * viewPos;
  }
`;

const GLOW_FRAG = `
  uniform vec3 glowColor;
  uniform float glowIntensity;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    float rim = 1.0 - max(dot(vNormal, vViewDir), 0.0);
    float alpha = pow(rim, 2.2) * glowIntensity;
    gl_FragColor = vec4(glowColor, alpha);
  }
`;

// ── Photon sphere rim glow ────────────────────────────────────────────────────

const PhotonSphere = ({
  radius,
  color,
  glowIntensity = 1.4,
}: {
  radius: number;
  color: string;
  glowIntensity?: number;
}) => {
  const uniforms = useMemo(
    () => ({
      glowColor: { value: new THREE.Color(color) },
      glowIntensity: { value: glowIntensity },
    }),
    [color, glowIntensity]
  );

  return (
    <mesh scale={[radius, radius, radius]}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={GLOW_VERT}
        fragmentShader={GLOW_FRAG}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.FrontSide}
      />
    </mesh>
  );
};

// ── Accretion disk (particle ring) ───────────────────────────────────────────

const AccretionDisk = ({
  innerRadius,
  outerRadius,
  tiltX = 0,
  innerColor,
  outerColor,
  particleCount = 3000,
  rotationSpeed = 0.4,
}: {
  innerRadius: number;
  outerRadius: number;
  tiltX?: number;
  innerColor: string;
  outerColor: string;
  particleCount?: number;
  rotationSpeed?: number;
}) => {
  const pointsRef = useRef<THREE.Points>(null!);

  const geometry = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const ic = new THREE.Color(innerColor);
    const oc = new THREE.Color(outerColor);
    const tc = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const t = Math.sqrt(Math.random()); // uniform-area distribution
      const r = innerRadius + t * (outerRadius - innerRadius);
      const h = (Math.random() - 0.5) * 0.05 * (r / innerRadius);

      positions[i * 3 + 0] = Math.cos(angle) * r;
      positions[i * 3 + 1] = h;
      positions[i * 3 + 2] = Math.sin(angle) * r;

      const ct = (r - innerRadius) / (outerRadius - innerRadius); // 0=inner,1=outer
      tc.lerpColors(ic, oc, ct);
      const brightness = 0.5 + 0.5 * (1 - ct); // hot inner edge
      colors[i * 3 + 0] = tc.r * brightness;
      colors[i * 3 + 1] = tc.g * brightness;
      colors[i * 3 + 2] = tc.b * brightness;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [innerRadius, outerRadius, innerColor, outerColor, particleCount]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <group rotation={[tiltX, 0, 0]}>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={0.02}
          vertexColors
          sizeAttenuation
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

// ── Gravitational wave rings radiating outward ────────────────────────────────

const GravWaves = () => {
  const NUM = 7;
  const PERIOD = 5;
  const meshRefs = useRef<THREE.Mesh[]>([]);

  const ringGeo = useMemo(() => new THREE.RingGeometry(0.98, 1.0, 96), []);

  const materials = useMemo(
    () =>
      Array.from(
        { length: NUM },
        () =>
          new THREE.MeshBasicMaterial({
            color: new THREE.Color('#7c3aed'),
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
      ),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = (t / PERIOD + i / NUM) % 1;
      mesh.scale.setScalar(1 + phase * 11);
      materials[i].opacity = (1 - phase) * 0.09;
    });
  });

  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {materials.map((mat, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) meshRefs.current[i] = el;
          }}
          geometry={ringGeo}
          material={mat}
        />
      ))}
    </group>
  );
};

// ── Binary black hole system ──────────────────────────────────────────────────

const BinarySystem = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const bh1Ref = useRef<THREE.Group>(null!);
  const bh2Ref = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Smooth inspiral: orbit tightens and speeds up, then resets
    const mergePhase = (Math.sin(t * 0.07) + 1) / 2; // 0→1 smooth oscillation
    const orbitRadius = THREE.MathUtils.lerp(3.1, 1.3, mergePhase);
    const orbitSpeed = THREE.MathUtils.lerp(0.18, 0.58, mergePhase);
    const angle = t * orbitSpeed;

    if (bh1Ref.current) {
      bh1Ref.current.position.x = Math.cos(angle) * orbitRadius;
      bh1Ref.current.position.z = Math.sin(angle) * orbitRadius;
    }
    if (bh2Ref.current) {
      bh2Ref.current.position.x = -Math.cos(angle) * orbitRadius;
      bh2Ref.current.position.z = -Math.sin(angle) * orbitRadius;
    }

    // Scroll-based tilt (Apple-style scrub)
    if (groupRef.current) {
      const sy = window.scrollY;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        sy * 0.0004,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        sy * 0.0015,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <GravWaves />

      {/* BH1 — purple */}
      <group ref={bh1Ref}>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="#050505" />
        </mesh>
        <PhotonSphere radius={0.78} color="#a855f7" glowIntensity={1.6} />
        <AccretionDisk
          innerRadius={0.85}
          outerRadius={2.1}
          tiltX={0.4}
          innerColor="#ffffff"
          outerColor="#a855f7"
          particleCount={2500}
          rotationSpeed={0.45}
        />
      </group>

      {/* BH2 — emerald */}
      <group ref={bh2Ref}>
        <mesh>
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshBasicMaterial color="#050505" />
        </mesh>
        <PhotonSphere radius={0.65} color="#10b981" glowIntensity={1.4} />
        <AccretionDisk
          innerRadius={0.72}
          outerRadius={1.8}
          tiltX={-0.35}
          innerColor="#ffffff"
          outerColor="#10b981"
          particleCount={2000}
          rotationSpeed={-0.55}
        />
      </group>
    </group>
  );
};

// ── Export ────────────────────────────────────────────────────────────────────

const BlackholeBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none w-full h-full opacity-65">
    {/* Vignette — keeps edges dark so content stays readable */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-obsidian/55 to-obsidian z-10 pointer-events-none" />
    <Canvas
      camera={{ position: [0, 4, 9], fov: 48 }}
      gl={{ antialias: true, alpha: true }}
    >
      <BinarySystem />
    </Canvas>
  </div>
);

export default BlackholeBackground;
