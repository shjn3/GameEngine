import CAdd from "../add/CAdd";
import CObject from "../base/CObject";

interface IImage {
  name: string;
  image: HTMLImageElement;
  setName: (name: string) => void;
  setImage: (url: string) => void;
  getName: () => string;
  getImage: () => HTMLImageElement;
}

export default class CImage extends CObject implements IImage {
  name: string = "";
  image: HTMLImageElement = new Image();
  constructor() {
    super();
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
}
