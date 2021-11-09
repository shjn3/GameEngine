import Game from "../game/Game";

interface IInput {
  keydown(key: string, callback: () => void): void;
  keyup(key: string, callback: () => void): void;
  onClick(callback: (e: MouseEvent) => void): void;
  removeOnClick(callback: (e: MouseEvent) => void): void;
}

export default class Input implements IInput {
  constructor() {}
  keydown(key: string, callback: () => void) {
    window.addEventListener("keydown", (e) => {
      if (e.key === key) callback();
    });
  }
  keyup(key: string, callback: () => void) {
    window.addEventListener("keyup", (e) => {
      if (e.key === key) callback();
    });
  }
  onClick(callback: (e: MouseEvent) => void) {
    Game.SCanvas.addEventListener("click", callback);
  }
  removeOnClick(callback: (e: MouseEvent) => void) {
    Game.SCanvas.removeEventListener("click", callback, false);
  }
}
