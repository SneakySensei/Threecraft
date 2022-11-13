import { useEffect, useCallback, useState } from "react";

type Action =
  | "moveForward"
  | "moveBackward"
  | "moveLeft"
  | "moveRight"
  | "jump"
  | "inventory1"
  | "inventory2"
  | "inventory3"
  | "inventory4"
  | "inventory5";

function actionByKey(key: string) {
  const keyActionMap: { [key: string]: Action } = {
    KeyW: "moveForward",
    KeyS: "moveBackward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
    Space: "jump",
    Digit1: "inventory1",
    Digit2: "inventory2",
    Digit3: "inventory3",
    Digit4: "inventory4",
    Digit5: "inventory5",
  };

  if (key in keyActionMap) {
    return keyActionMap[key];
  }
}

const useKeyboard = () => {
  const [actions, setActions] = useState<{ [key in Action]: boolean }>({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    inventory1: false,
    inventory2: false,
    inventory3: false,
    inventory4: false,
    inventory5: false,
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.repeat) return;
    const action = actionByKey(e.code);
    if (action) {
      setActions((prev) => {
        return { ...prev, [action]: true };
      });
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.repeat) return;
    const action = actionByKey(e.code);
    if (action) {
      setActions((prev) => {
        return { ...prev, [action]: false };
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return actions;
};

export default useKeyboard;
