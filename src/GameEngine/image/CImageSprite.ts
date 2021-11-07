import type { IFRAMEINSPRITE } from "../utils/type";
import CAdd from "../add/CAdd";
import CImage from "./CImage";
import CObject from "../base/CObject";
interface IImageSprite {
  getFrameInSprite: () => Array<IFRAMEINSPRITE>;
  setFrameInSprite: (frameInSprite: Array<IFRAMEINSPRITE>) => void;
}
export default class CImageSprite extends CObject {
  frameInSprite: Array<IFRAMEINSPRITE>;
  name: string;
  image: HTMLImageElement;
  key: number;
  isDraw: boolean;
  constructor() {
    super();
    this.frameInSprite = [];
    this.name = "";
    this.image = new Image();
    this.key = 0;
    this.isDraw = false;
  }
  setIsDraw(isDraw: boolean) {
    this.isDraw = isDraw;
  }
  getIsDraw() {
    return this.isDraw;
  }

  setName(name: string) {
    this.name = name;
  }
  setImage(url: string) {
    this.image.src = url;
  }
  getName() {
    return this.name;
  }
  getImage() {
    return this.image;
  }
  getFrameInSprite() {
    return JSON.parse(JSON.stringify(this.frameInSprite));
  }
  setFrameInSprite(frameInSprite: Array<IFRAMEINSPRITE>) {
    this.frameInSprite = JSON.parse(JSON.stringify(frameInSprite));
  }
  destroy() {
    CAdd.arrDrawImageSprite = CAdd.arrDrawImageSprite.filter(
      (_e) => _e.key !== this.key
    );
  }
}
