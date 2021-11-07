import CKeyboard from "./CKeyboard";
import CGame from "../game/CGame";

export default class CInput {
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
    CGame.canvas.addEventListener("click", callback);
  }
  removeOnClick(callback: (e: MouseEvent) => void) {
    CGame.canvas.removeEventListener("click", callback, false);
  }
}
