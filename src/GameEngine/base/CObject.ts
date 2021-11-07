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

export default abstract class CObject {
  position: vector;
  width: number;
  height: number;

  constructor() {
    this.position = { x: 0, y: 0 };
    this.width = 0;
    this.height = 0;
  }
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
