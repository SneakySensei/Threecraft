import { nanoid } from "nanoid";
import create from "zustand";
import { persist } from "zustand/middleware";

interface GameStore {
  texture: string;
  cubes: { key: string; position: [number, number, number]; texture: string }[];
  addCube: (x: number, y: number, z: number) => void;
  removeCube: (x: number, y: number, z: number) => void;
  setTexture: (texture: string) => void;
  saveWorld: () => void;
  resetWorld: () => void;
}

export const useStore = create<GameStore>()(
  persist(
    (set) => ({
      texture: "dirt",
      cubes: [],
      addCube(x, y, z) {
        set((prev) => ({
          cubes: [
            ...prev.cubes,
            {
              key: nanoid(),
              position: [x, y, z],
              texture: prev.texture,
            },
          ],
        }));
      },
      removeCube(x, y, z) {
        set((prev) => ({
          cubes: prev.cubes.filter((cube) => {
            const [_x, _y, _z] = cube.position;
            return _x !== x || _y !== y || _z !== z;
          }),
        }));
      },
      setTexture(texture) {
        set(() => ({ texture }));
      },
      saveWorld() {},
      resetWorld() {
        set(() => ({ cubes: [] }));
      },
    }),
    {
      name: "world",
      partialize(state) {
        return Object.fromEntries(
          Object.entries(state).filter(([key]) => ["cubes"].includes(key))
        );
      },
    }
  )
);
