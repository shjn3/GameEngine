import Scenes from "../scenes/Scenes";
interface IGame {
  init: () => void;
}

export default class Game implements IGame {
  static SCanvas: HTMLCanvasElement;
  static SCtx: CanvasRenderingContext2D;
  static SArrayScenes: Array<Scenes> = [];
  static SScenes: Scenes;
  constructor(config: any = {}) {
    const { width, height, parent, scenes = [] } = config;
    Game.SCanvas = document.querySelector(
      `#${parent} canvas`
    ) as HTMLCanvasElement;
    Game.SCanvas.width = width;
    Game.SCanvas.height = height;
    Game.SCtx = <CanvasRenderingContext2D>Game.SCanvas.getContext("2d");
    // Game.arrScenes = scenes;
    if (scenes.length > 0) {
      scenes.forEach((_e: any) => Game.SArrayScenes.push(new _e()));
    }
    this.init();
  }
  init() {
    Game.SArrayScenes[0].active();
  }
}
