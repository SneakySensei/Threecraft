import { PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const FPVCamera = () => {
  const { camera, gl } = useThree();

  return <PointerLockControls args={[camera, gl.domElement]} />;
};

export default FPVCamera;
