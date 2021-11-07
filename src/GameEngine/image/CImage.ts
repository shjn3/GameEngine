import CAdd from "../add/CAdd";
import CObject from "../base/CObject";

interface IImage {
  name: string;
  image: HTMLImageElement;
  isDraw: boolean;
  setName: (name: string) => void;
  setImage: (url: string) => void;
  getName: () => string;
  getImage: () => HTMLImageElement;
}

export default class CImage extends CObject {
  name: string;
  image: HTMLImageElement;
  key: number;
  isDraw: boolean;
  constructor() {
    super();
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
  destroy() {
    CAdd.arrDrawImage = CAdd.arrDrawImage.filter((_e) => _e.key !== this.key);
  }
}
