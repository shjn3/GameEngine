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
  static SIndexScenesVisible: number = 0;
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
  }
  init() {
    Game.SArrayScenes[0].active();
    this.loop();
  }
  loop() {
    setTimeout(
      () => window.requestAnimationFrame(() => this.loop()),
      1000 / 240
    );
    Game.SArrayScenes[Game.SIndexScenesVisible].update();
    this.renderer.render();
  }
}
