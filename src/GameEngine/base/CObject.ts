import type { vector } from "../utils/type";
interface IObject {
  position: vector;
  width: number;
  height: number;
  setPosition: (x: number, y: number) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  getPosition: () => vector;
  getWidth: () => number;
  getHeight: () => number;
}

export default class CObject {
  position: vector = { x: 0, y: 0 };
  width: number = 0;
  height: number = 0;

  constructor() {}
  setPosition(x: number, y: number) {
    this.position = { x, y };
  }
  setWidth(width: number) {
    this.width = width;
  }
  setHeight(height: number) {
    this.height = height;
  }
  getPosition() {
    return this.position;
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
}
