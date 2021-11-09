import type { IFrameInSprite, IPosition, ISize } from "../utils/type";
import Add from "../add/Add";
import ImageObject from "./ImageObject";
import BaseObject from "../base/BaseObject";

interface IImageSpriteObject {
  frameInSprite: Array<IFrameInSprite>;
  sourcePosition: IPosition;
  sourceSize: ISize;
  nameImage: string;
  image: HTMLImageElement;
  key: number;
  isVisible: boolean;
  setKey: (key: number) => void;
  getKey: () => number;
  setIsVisible: (isVisible: boolean) => void;
  getIsVisible: () => boolean;
  setNameImage: (nameImage: string) => void;
  getNameImage: () => string;
  setImage: (url: string | HTMLImageElement) => void;
  getImage: () => HTMLImageElement;

  setSourceHeight: (height: number) => void;
  getSourceHeight: () => number;

  setSourceWidth(Width: number): void;
  getSourceWidth(): number;

  setSourceSize(width: number, height: number): void;
  getSourceSize(): ISize;

  setSourcePosition(x: number, y: number): void;
  getSourcePosition(): IPosition;
  getFrameInSprite(): IFrameInSprite;
  setFrameInSprite(frameInSprite: Array<IFrameInSprite>): void;
  destroy(): void;
}

export default class ImageSpriteObject
  extends BaseObject
  implements IImageSpriteObject
{
  frameInSprite: Array<IFrameInSprite>;
  sourcePosition: IPosition;
  sourceSize: ISize;

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
    this.sourcePosition = { x: 0, y: 0 };
    this.sourceSize = { width: 0, height: 0 };
    this.frameInSprite = [];
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
  setSourceHeight(height: number) {
    this.sourceSize.height = height;
  }
  getSourceHeight() {
    return this.sourceSize.height;
  }

  setSourceWidth(Width: number) {
    this.sourceSize.width = Width;
  }
  getSourceWidth() {
    return this.sourceSize.width;
  }

  setSourceSize(width: number, height: number) {
    this.sourceSize = {
      width,
      height,
    };
  }
  getSourceSize() {
    return this.sourceSize;
  }

  setSourcePosition(x: number, y: number) {
    this.sourcePosition = { x, y };
  }
  getSourcePosition() {
    return this.sourcePosition;
  }
  getFrameInSprite() {
    return JSON.parse(JSON.stringify(this.frameInSprite));
  }
  setFrameInSprite(frameInSprite: Array<IFrameInSprite>) {
    this.frameInSprite = JSON.parse(JSON.stringify(frameInSprite));
  }
  destroy() {
    Add.SArrayDrawImageFromSprite = Add.SArrayDrawImageFromSprite.filter(
      (_e) => _e.key !== this.key
    );
  }
}
