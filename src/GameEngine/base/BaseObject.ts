import type { IPosition, ISize } from "../utils/type";
interface IBaseObject {
  position: IPosition;
  size: ISize;

  setSize: (width: number, height: number) => void;
  getSize: () => ISize;
  setWidth: (width: number) => void;
  getWidth: () => number;
  setHeight: (height: number) => void;
  getHeight: () => number;

  setPosition: (x: number, y: number) => void;
  getPosition: () => IPosition;
  setPositionX: (x: number) => void;
  getPositionX: () => number;
  setPositionY: (y: number) => void;
  getPositionY: () => number;
}
export default class BaseObject implements IBaseObject {
  position: IPosition = { x: 0, y: 0 };
  size: ISize = { width: 0, height: 0 };
  constructor() {}

  setSize(width: number, height: number) {
    this.size = { width, height };
  }
  getSize() {
    return this.size;
  }

  setWidth(width: number) {
    this.size.width = width;
  }
  getWidth() {
    return this.size.width;
  }

  setHeight(height: number) {
    this.size.height = height;
  }
  getHeight() {
    return this.size.height;
  }

  setPosition(x: number, y: number) {
    this.position = { x, y };
  }
  getPosition() {
    return this.position;
  }

  setPositionX(x: number) {
    this.position.x = x;
  }
  getPositionX() {
    return this.position.x;
  }

  setPositionY(y: number) {
    this.position.y = y;
  }
  getPositionY() {
    return this.position.y;
  }
}
