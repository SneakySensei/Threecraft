import React, { useEffect, useState } from "react";
import useKeyboard from "../hooks/useKeyboard";
import { useStore } from "../hooks/useStore";

interface TextureSelectorProps {}

export default function TextureSelector({}: TextureSelectorProps) {
  const [visible, setVisible] = useState(false);

  const [activeTexture, setTexture] = useStore((state) => [
    state.texture,
    state.setTexture,
  ]);
  const { inventory1, inventory2, inventory3, inventory4, inventory5 } =
    useKeyboard();

  useEffect(() => {
    const pressedItem = Object.entries({
      inventory1,
      inventory2,
      inventory3,
      inventory4,
      inventory5,
    }).find(([button, pressed]) => pressed);
    if (!pressedItem) return;
    switch (pressedItem[0]) {
      case "inventory1":
        setTexture("dirt");
        break;
      case "inventory2":
        setTexture("grass");
        break;
      case "inventory3":
        setTexture("glass");
        break;
      case "inventory4":
        setTexture("log");
        break;
      case "inventory5":
        setTexture("wood");
        break;
    }
  }, [inventory1, inventory2, inventory3, inventory4, inventory5]);

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000);
    setVisible(true);

    return () => {
      clearTimeout(visibilityTimeout);
    };
  }, [activeTexture]);

  return visible ? (
    <footer className="capitalize text-white font-semibold absolute left-1/2 bottom-4 -translate-x-1/2">
      {activeTexture}
    </footer>
  ) : null;
}
