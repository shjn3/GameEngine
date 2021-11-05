import CObject from "../base/CObject";
import type { IFRAMEINSPRITE } from "../utils/type";
interface IImageSprite {
  name: string;
  imageSprite: HTMLImageElement;
  getName: () => string;
  getImageSprite: () => HTMLImageElement;
  setName: (name: string) => void;
  setImageSprite: (url: string) => void;
  getFrameInSprite: () => Array<IFRAMEINSPRITE>;
  setFrameInSprite: (frameInSprite: Array<IFRAMEINSPRITE>) => void;
}
export default class CImageSprite extends CObject implements IImageSprite {
  name: string = "";
  imageSprite: HTMLImageElement = new Image();
  frameInSprite: Array<IFRAMEINSPRITE> = [];
  constructor() {
    super();
  }
  getFrameInSprite() {
    return JSON.parse(JSON.stringify(this.frameInSprite));
  }
  setFrameInSprite(frameInSprite: Array<IFRAMEINSPRITE>) {
    this.frameInSprite = JSON.parse(JSON.stringify(frameInSprite));
  }
  getName() {
    return this.name;
  }
  getImageSprite() {
    return this.imageSprite;
  }
  setName(name: string) {
    this.name = name;
  }
  setImageSprite(url: string) {
    this.imageSprite.src = url;
  }
}
