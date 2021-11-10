import type { IFrameInSprite, IPosition, ISize } from "../utils/type";
import Add from "../add/Add";
import ImageObject from "./ImageObject";

interface IImageSpriteObject {
  frameInSprite: Array<IFrameInSprite>;
  sourcePosition: IPosition;
  sourceSize: ISize;

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
  extends ImageObject
  implements IImageSpriteObject
{
  frameInSprite: Array<IFrameInSprite>;
  sourcePosition: IPosition;
  sourceSize: ISize;

  constructor() {
    super();
    this.sourcePosition = { x: 0, y: 0 };
    this.sourceSize = { width: 0, height: 0 };
    this.frameInSprite = [];
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
