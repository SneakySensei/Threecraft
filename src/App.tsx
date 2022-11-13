import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Cubes from "./components/Cubes";
import FPVCamera from "./components/FPVCamera";
import Ground from "./components/Ground";
import Player from "./components/Player";
import TextureSelector from "./components/TextureSelector";

function App() {
  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        <FPVCamera />
        <Physics>
          <Player />
          <Cubes />
          <Ground />
        </Physics>
      </Canvas>
      <span className="fixed left-1/2 text-white text-xl top-1/2 -translate-x-1/2 -translate-y-1/2 leading-none pointer-events-none cursor-default">
        +
      </span>
      <TextureSelector />
    </>
  );
}

export default App;
