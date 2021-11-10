import Game from "../game/Game";

interface IInput {
  keydown(key: string, callback: () => void): void;
  keyup(key: string, callback: () => void): void;
  onClick(callback: (e: MouseEvent) => void): void;
  // removeOnClick(callback: (e: MouseEvent) => void): void;
}

export default class Input implements IInput {
  arrayEvent: Array<any> = [];
  constructor() {}
  keydown(key: string, callback: () => void) {
    let functionKeyDown = (e: KeyboardEvent) => {
      if (e.key === key) callback();
    };
    window.document.addEventListener("keydown", functionKeyDown);

    this.arrayEvent.push({
      type: "keydown",
      function: functionKeyDown,
    });
  }
  keyup(key: string, callback: () => void) {
    let functionKeyUp = (e: KeyboardEvent) => {
      if (e.key === key) callback();
    };
    window.document.addEventListener("keyup", functionKeyUp);
    this.arrayEvent.push({
      type: "keyup",
      function: functionKeyUp,
    });
  }
  onClick(callback: (e: MouseEvent) => void) {
    Game.SCanvas.addEventListener("click", callback);
    this.arrayEvent.push({
      type: "click",
      function: callback,
    });
  }
  destroy() {
    if (this.arrayEvent.length > 0) {
      this.arrayEvent.forEach((_e) => {
        // console.log(_e);
        if (_e.type === "click")
          Game.SCanvas.removeEventListener(_e.type, _e.function, false);
        else {
          window.document.removeEventListener(_e.type, _e.function, false);
        }
      });
    }
  }
}
