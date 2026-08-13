import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

const SphereObject = () => {
  const sphere = useRef();

  useFrame((state) => {
    const { x, y } = state.pointer;

    sphere.current.rotation.y = x * 2;
    sphere.current.rotation.x = -y * 2;
  });

  return (
    <Sphere ref={sphere} args={[1, 100, 200]} scale={2.4}>
      <MeshDistortMaterial
        color="#DB8B9B"
        distort={0.5}
        speed={2}
      />
    </Sphere>
  );
};

const Test3d = () => {
  return (
    <section style={{ width: "100%", height: "500px" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={2} />
        <directionalLight position={[1, 2, 3]} />

        <SphereObject />
      </Canvas>
    </section>
  );
};

export default Test3d;