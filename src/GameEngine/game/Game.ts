import Add from "../add/Add";
import Animation from "../animation/Animation";
import Scenes from "../scenes/Scenes";
import Renderer from "../renderer/Renderer";
interface IGame {
  init: () => void;
}

export default class Game implements IGame {
  static SCanvas: HTMLCanvasElement;
  static SCtx: CanvasRenderingContext2D;
  static SFps: number = 60;
  static SArrayScenes: Array<Scenes> = [];
  static SNumberScenesVisible: number = 0;
  renderer: Renderer = new Renderer();
  constructor(config: any = {}) {
    const { width, height, parent, scenes = [], fps } = config;
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
    this.loop();
  }
  init() {
    Game.SArrayScenes[0].active();
  }
  loop() {
    window.requestAnimationFrame(() => this.loop());
    Game.SArrayScenes[Game.SNumberScenesVisible].update();
    this.renderer.render();
  }
}
