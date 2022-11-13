import { useBox } from "@react-three/cannon";
import { useRef, useState } from "react";
import { Mesh } from "three";
import { textures } from "../assets/textures";
import { useStore } from "../hooks/useStore";
interface CubeProps {
  position: [number, number, number];
  texture: string;
}

export default function Cube({ position, texture }: CubeProps) {
  const [isHovered, setIsHovered] = useState(false);

  const [ref] = useBox(
    () => ({ type: "Static", position }),
    useRef<Mesh>(null)
  );

  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ]);

  const activeTexture = textures[texture + "Texture"];

  return (
    <mesh
      onPointerEnter={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
      ref={ref}
      onClick={(e) => {
        if (!ref.current) return;
        e.stopPropagation();
        const { x, y, z } = ref.current.position;
        const clickedFace = Math.floor((e.faceIndex ?? 0) / 2);
        if (e.altKey) {
          removeCube(x, y, z);
          return;
        }
        switch (clickedFace) {
          case 0:
            addCube(x + 1, y, z);
            break;
          case 1:
            addCube(x - 1, y, z);
            break;
          case 2:
            addCube(x, y + 1, z);
            break;
          case 3:
            addCube(x, y - 1, z);
            break;
          case 4:
            addCube(x, y, z + 1);
            break;
          case 5:
            addCube(x, y, z - 1);
            break;
        }
      }}
    >
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial
        color={isHovered ? "#BBB" : "#FFF"}
        map={activeTexture}
        transparent={texture === "glass"}
        opacity={texture === "glass" ? 0.7 : 1}
      />
    </mesh>
  );
}
