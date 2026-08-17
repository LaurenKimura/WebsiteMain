import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useEffect, useState } from "react";

const Shape = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const onChange = (event) => setIsMobile(event.matches);
    setIsMobile(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <Sphere args={isMobile ? [1, 32, 64] : [1, 100, 200]} scale={2.4}>
        <MeshDistortMaterial
          color="#C1AdA0"
          attach="material"
          distort={0.5}
          speed={2}
        />
      </Sphere>
      <ambientLight intensity={2} />
      <directionalLight position={[1, 2, 3]} />
    </>
  );
};

export default Shape;