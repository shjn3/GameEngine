import Add from "../add/Add";
import Load from "../load/Load";
import BaseObject from "../base/BaseObject";

interface IImageObject {
  nameImage: string;
  image: HTMLImageElement;
  key: number;
  isVisible: boolean;
  setKey(key: number): void;
  getKey(): number;

  setIsVisible(isVisible: boolean): void;
  getIsVisible(): boolean;

  setNameImage(nameImage: string): void;
  getNameImage(): string;

  setImage(url: string | HTMLImageElement): void;
  getImage(): HTMLImageElement;

  destroy(): void;
}

export default class ImageObject extends BaseObject implements IImageObject {
  nameImage: string;
  image: HTMLImageElement;
  key: number;
  isVisible: boolean;
  constructor() {
    super();
    this.key = Math.floor(Math.random() * Date.now());
    this.nameImage = "";
    this.image = new Image();
    this.isVisible = false;
  }

  //key for each object
  setKey(key: number) {
    this.key = key;
  }
  getKey() {
    return this.key;
  }

  setIsVisible(isVisible: boolean) {
    this.isVisible = isVisible;
  }
  getIsVisible() {
    return this.isVisible;
  }
  //Name Image for select
  setNameImage(nameImage: string) {
    this.nameImage = nameImage;
  }
  getNameImage() {
    return this.nameImage;
  }
  //image when load
  setImage(url: string | HTMLImageElement) {
    if (typeof url === "string") {
      this.image.src = url;
    } else {
      this.image = url;
    }
  }
  getImage() {
    return this.image;
  }

  destroy() {
    Add.SArrayDrawImage = Add.SArrayDrawImage.filter(
      (_e) => _e.key !== this.key
    );
  }
  changeImage(nameImage: string) {
    if (nameImage !== this.nameImage) {
      if (Load.SArrayImage.length > 0) {
        Load.SArrayImage.forEach((_e) => {
          if (_e.nameImage === nameImage) {
            this.setImage(_e.image);
            return;
          }
        });
      }
    }
  }
}
