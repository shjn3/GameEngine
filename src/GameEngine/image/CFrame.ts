import type { vector } from "../utils/type";
interface IFRAME {
  sPosition: vector;
  sWidth: number;
  sHeight: number;
  key: string;
  setSPosition: (x: number, y: number) => void;
  setSWidth: (sWidth: number) => void;
  setSHeight: (sHeight: number) => void;
  setKey: (key: string) => void;
  getSPosition: () => vector;
  getSWidth: () => number;
  getSHeight: () => number;
  getKey: () => string;
}
export default class CFrame implements IFRAME {
  key: string = "";
  sPosition: vector = { x: 0, y: 0 };
  sWidth: number = 0;
  sHeight: number = 0;
  constructor() {}
  setSPosition(x: number, y: number) {
    this.sPosition = { x, y };
  }
  setSWidth(sWidth: number) {
    this.sWidth = sWidth;
  }
  setSHeight(sHeight: number) {
    this.sHeight = sHeight;
  }
  setKey(key: string) {
    this.key = key;
  }

  getSPosition() {
    return this.sPosition;
  }
  getSWidth() {
    return this.sWidth;
  }
  getSHeight() {
    return this.sHeight;
  }
  getKey() {
    return this.key;
  }
}
