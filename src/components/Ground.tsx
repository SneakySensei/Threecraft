import { useRef } from "react";
import { usePlane } from "@react-three/cannon";
import { Mesh, RepeatWrapping, NearestFilter } from "three";
import { groundTexture } from "../assets/textures";
import { degToRad } from "three/src/math/MathUtils";
import { useStore } from "../hooks/useStore";

const Ground = () => {
  const [ref] = usePlane(
    () => ({ position: [0, 0.5, 0], rotation: [-degToRad(90), 0, 0] }),
    useRef<Mesh>(null)
  );

  const [addCube] = useStore((state) => [state.addCube]);

  groundTexture.wrapS = groundTexture.wrapT = RepeatWrapping;
  groundTexture.repeat.set(100, 100);

  return (
    <mesh
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        const [x, y, z] = e.point.toArray().map((n) => Math.ceil(n));
        addCube(x, y, z);
      }}
    >
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
};

export default Ground;
