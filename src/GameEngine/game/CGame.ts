import ScenesPlay from "../../TrexGame/ScenesPlay";
import CScenes from "../scenes/CScenes";
interface IGAME {}

export default class CGame implements IGAME {
  static canvas: HTMLCanvasElement;
  static ctx: CanvasRenderingContext2D;
  static arrScenes: Array<CScenes> = [];
  static scenes: CScenes;
  constructor(config: any = {}) {
    const { width, height, parent, scenes = [] } = config;
    CGame.canvas = document.querySelector(
      `#${parent} canvas`
    ) as HTMLCanvasElement;
    CGame.canvas.width = width;
    CGame.canvas.height = height;
    CGame.ctx = <CanvasRenderingContext2D>CGame.canvas.getContext("2d");
    // CGame.arrScenes = scenes;
    if (scenes.length > 0) {
      scenes.forEach((_e: any) => CGame.arrScenes.push(new _e()));
    }
    this.init();
  }
  init() {
    CGame.arrScenes[0].setIsActive(true);
    CGame.arrScenes[0].active();
  }
}
