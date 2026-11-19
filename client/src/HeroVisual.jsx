import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls, RoundedBox, Torus } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";

const traces = [
  [[-1.6, 0.6], [-0.62, 0.6]], [[-1.55, 0.38], [-0.62, 0.38]],
  [[-1.52, 0.15], [-0.62, 0.15]], [[0.38, 0.68], [1.38, 0.68]],
  [[0.38, 0.43], [1.46, 0.43]], [[0.4, 0.17], [1.46, 0.17]],
  [[-0.8, -0.46], [-0.8, -1.42]], [[-0.56, -0.48], [-0.56, -1.42]],
  [[0.75, -0.44], [1.58, -0.44]], [[0.75, -0.7], [1.58, -0.7]],
  [[-1.5, -0.94], [-0.93, -0.94]], [[-0.27, 0.95], [-0.27, 1.45]],
  [[0.02, 0.96], [0.02, 1.43]], [[1.52, 0.95], [1.88, 0.95]]
];

function CopperTrace({ start, end }) {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  return (
    <mesh
      position={[(start[0] + end[0]) / 2, (start[1] + end[1]) / 2, 0.078]}
      rotation={[0, 0, Math.atan2(dy, dx)]}
    >
      <boxGeometry args={[Math.hypot(dx, dy), 0.015, 0.007]} />
      <meshStandardMaterial color="#b98436" metalness={0.58} roughness={0.42} />
    </mesh>
  );
}

function Port({ position, size, label, tone = "#bfc7c9", dual = false }) {
  return (
    <group position={position}>
      <RoundedBox args={size} radius={0.035} smoothness={3}>
        <meshStandardMaterial color={tone} metalness={0.72} roughness={0.3} />
      </RoundedBox>
      {(dual ? [-0.18, 0.18] : [0]).map((offset) => (
        <group key={offset} position={[0, offset, size[2] / 2 + 0.008]}>
          <RoundedBox args={[size[0] * 0.62, dual ? size[1] * 0.32 : size[1] * 0.52, 0.012]} radius={0.018} smoothness={2}>
            <meshStandardMaterial color="#121719" metalness={0.2} roughness={0.52} />
          </RoundedBox>
          <mesh position={[0, 0, 0.008]}>
            <boxGeometry args={[size[0] * 0.42, 0.018, 0.008]} />
            <meshStandardMaterial color="#879091" metalness={0.72} roughness={0.3} />
          </mesh>
        </group>
      ))}
      <Html position={[0, -size[1] / 2 - 0.1, size[2] / 2]} distanceFactor={8} className="board-port-label">
        <span>{label}</span>
      </Html>
    </group>
  );
}

function RaspberryPi({ reduceMotion }) {
  const group = useRef(null);

  useFrame((state, delta) => {
    if (!group.current || reduceMotion) return;
    const targetY = 0.32 + state.clock.elapsedTime * 0.055 + state.pointer.x * 0.17;
    const targetX = -0.4 - state.pointer.y * 0.09;
    group.current.rotation.y += (targetY - group.current.rotation.y) * delta * 1.25;
    group.current.rotation.x += (targetX - group.current.rotation.x) * delta * 1.25;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.05;
  });

  const hotspot = (position, label) => (
    <Html position={position} distanceFactor={6.4} className="board-hotspot" occlude>
      <span className="board-hotspot-label">{label}</span>
    </Html>
  );

  return (
    <group ref={group} rotation={[-0.42, 0.32, -0.1]} scale={0.78}>
      <Torus args={[2.22, 0.012, 8, 120]} rotation={[Math.PI / 2.7, 0, 0]}>
        <meshBasicMaterial color="#54e3ff" transparent opacity={0.26} />
      </Torus>
      <Torus args={[2.48, 0.008, 8, 120]} rotation={[0.2, Math.PI / 2.8, 0.12]}>
        <meshBasicMaterial color="#8071ff" transparent opacity={0.2} />
      </Torus>

      <RoundedBox args={[4.7, 3.25, 0.14]} radius={0.08} smoothness={5}>
        <meshStandardMaterial color="#0b713d" metalness={0.25} roughness={0.48} />
      </RoundedBox>
      <RoundedBox args={[4.64, 3.19, 0.035]} radius={0.07} smoothness={4} position={[0, 0, -0.08]}>
        <meshStandardMaterial color="#07552f" metalness={0.2} roughness={0.55} />
      </RoundedBox>

      {traces.map(([start, end], index) => <CopperTrace key={index} start={start} end={end} />)}

      <RoundedBox args={[0.98, 0.86, 0.1]} radius={0.035} smoothness={3} position={[-0.08, 0.18, 0.15]}>
        <meshStandardMaterial color="#9ca5a3" metalness={0.55} roughness={0.38} />
      </RoundedBox>
      <RoundedBox args={[0.82, 0.72, 0.11]} radius={0.024} smoothness={3} position={[-0.08, 0.18, 0.22]}>
        <meshStandardMaterial color="#121516" metalness={0.12} roughness={0.48} />
      </RoundedBox>
      <mesh position={[-0.08, 0.18, 0.278]}>
        <boxGeometry args={[0.36, 0.026, 0.005]} />
        <meshStandardMaterial color="#687170" metalness={0.34} roughness={0.45} />
      </mesh>
      {[-0.18, -0.08, 0.02].map((x) => (
        <mesh key={x} position={[x, 0.085, 0.279]}>
          <boxGeometry args={[0.014, 0.014, 0.005]} />
          <meshStandardMaterial color="#737c7b" metalness={0.28} roughness={0.5} />
        </mesh>
      ))}

      <RoundedBox args={[0.76, 0.5, 0.08]} radius={0.025} smoothness={3} position={[-1.03, 0.56, 0.14]}>
        <meshStandardMaterial color="#aeb6b0" metalness={0.48} roughness={0.38} />
      </RoundedBox>
      <RoundedBox args={[0.64, 0.4, 0.1]} radius={0.02} smoothness={2} position={[-1.03, 0.56, 0.2]}>
        <meshStandardMaterial color="#171a1a" metalness={0.12} roughness={0.52} />
      </RoundedBox>
      <mesh position={[-1.03, 0.56, 0.252]}>
        <boxGeometry args={[0.25, 0.018, 0.005]} />
        <meshStandardMaterial color="#727a77" metalness={0.3} roughness={0.5} />
      </mesh>
      <RoundedBox args={[0.34, 0.3, 0.07]} radius={0.018} smoothness={2} position={[0.82, 0.91, 0.13]}>
        <meshStandardMaterial color="#171b1b" roughness={0.68} />
      </RoundedBox>
      <RoundedBox args={[0.32, 0.27, 0.07]} radius={0.018} smoothness={2} position={[1.3, 0.9, 0.13]}>
        <meshStandardMaterial color="#191c1c" roughness={0.68} />
      </RoundedBox>

      {Array.from({ length: 42 }, (_, index) => {
        const x = -1.48 + (index % 14) * 0.22;
        const y = -0.62 - Math.floor(index / 14) * 0.23;
        const capacitor = index % 4 === 0;
        return (
          <RoundedBox
            key={index}
            args={[capacitor ? 0.082 : 0.12, capacitor ? 0.082 : 0.055, 0.04]}
            radius={0.008}
            smoothness={2}
            position={[x, y, 0.11]}
          >
            <meshStandardMaterial
              color={capacitor ? "#c8c0a0" : "#b9a15f"}
              metalness={capacitor ? 0.2 : 0.45}
              roughness={capacitor ? 0.4 : 0.32}
            />
          </RoundedBox>
        );
      })}

      {[-1.45, -1.13, -0.81, -0.49, -0.17, 0.15, 0.47, 0.79, 1.11, 1.43].map((x) => (
        <group key={x} position={[x, 1.02, 0]}>
          <mesh position={[0, 0, 0.11]}>
            <boxGeometry args={[0.12, 0.18, 0.12]} />
            <meshStandardMaterial color="#181b1a" roughness={0.72} />
          </mesh>
          <mesh position={[0, 0, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.72, 10]} />
            <meshStandardMaterial color="#cba342" metalness={0.82} roughness={0.23} />
          </mesh>
          <mesh position={[0, 0, 0.61]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.027, 0.027, 0.025, 10]} />
            <meshStandardMaterial color="#f0c85c" metalness={0.84} roughness={0.2} />
          </mesh>
        </group>
      ))}
      {[-1.65, -1.41, -1.17, -0.93, -0.69, -0.45, -0.21, 0.03].map((x) => (
        <mesh key={x} position={[x, -1.18, 0.14]}>
          <cylinderGeometry args={[0.05, 0.05, 0.12, 12]} />
          <meshStandardMaterial color="#c4cbd0" metalness={0.8} roughness={0.18} />
        </mesh>
      ))}

      <Port position={[2.16, 0.56, 0.2]} size={[0.64, 0.76, 0.4]} label="USB" dual />
      <Port position={[2.16, -0.28, 0.2]} size={[0.64, 0.76, 0.4]} label="USB" dual />
      <Port position={[2.16, -0.82, 0.2]} size={[0.78, 0.66, 0.44]} label="LAN" tone="#aab4b8" />
      <Port position={[-2.13, -0.48, 0.18]} size={[0.56, 0.42, 0.32]} label="HDMI" />
      <Port position={[-2.13, -1.08, 0.18]} size={[0.44, 0.32, 0.3]} label="PWR" />
      <mesh position={[-2.13, 0.25, 0.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.18, 0.4, 24]} />
        <meshStandardMaterial color="#252b2d" metalness={0.62} roughness={0.32} />
      </mesh>
      <mesh position={[-2.13, 0.25, 0.41]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.105, 0.105, 0.012, 24]} />
        <meshStandardMaterial color="#090c0d" metalness={0.2} roughness={0.55} />
      </mesh>

      {[[-2.04, -1.28], [2.04, -1.28], [-2.04, 1.28], [2.04, 1.28]].map((position, index) => (
        <group key={index} position={[position[0], position[1], 0.084]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.014, 24]} />
            <meshStandardMaterial color="#c7a841" metalness={0.72} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.009]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.078, 0.078, 0.018, 24]} />
            <meshBasicMaterial color="#073b25" />
          </mesh>
        </group>
      ))}
      {traces.map(([start], index) => (
        <mesh key={`pad-${index}`} position={[start[0], start[1], 0.082]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.008, 12]} />
          <meshStandardMaterial color="#c39b45" metalness={0.74} roughness={0.34} />
        </mesh>
      ))}

      {hotspot([-0.08, 0.18, 0.42], "CPU / SoC")}
      {hotspot([0.1, 1.3, 0.42], "40-pin GPIO")}
      {hotspot([2.16, -0.82, 0.58], "Ethernet")}
      {hotspot([2.16, 0.72, 0.56], "USB")}
      {hotspot([-2.13, -1.08, 0.5], "Micro-USB power")}
    </group>
  );
}

export default function HeroVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="hero-visual" aria-label="Interactive 3D Raspberry Pi Model B single-board computer reconstruction">
      <div className="visual-label label-top"><span className="signal-dot" /> SIGNAL / ONLINE</div>
      <Canvas dpr={[1, 1.35]} camera={{ position: [0, 0, 6.8], fov: 36 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.82} />
        <pointLight position={[4, 3, 5]} intensity={36} color="#7cecff" />
        <pointLight position={[-4, -2, 2]} intensity={24} color="#6e61ff" />
        <spotLight position={[0, 5, 4]} intensity={22} angle={0.4} penumbra={1} />
        <Suspense fallback={null}><RaspberryPi reduceMotion={reduce} /></Suspense>
        {!reduce && <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.28} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.6} />}
      </Canvas>
      <div className="visual-label label-bottom">ENGINEERING / 01<span>+</span>IDEAS</div>
      <span className="visual-ring ring-a" /><span className="visual-ring ring-b" />
    </div>
  );
}
