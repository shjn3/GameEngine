import Shape from "./Shape";
import type { ISize } from "../utils/type";

interface IRectangle {
  size: ISize;
  color: string;
  isFillReact: boolean;
  isVisible: boolean;
  setSize(width: number, height: number): void;
  getSize(): ISize;
  getColor(): string;
  setColor(color: string): void;
  getIsFillReact(): boolean;
  setIsFillReact(isFillReact: boolean): void;
  setIsVisible(isVisible: boolean): void;
  getIsVisible(): boolean;
}
export default class Rectangle extends Shape implements IRectangle {
  size: ISize = { width: 0, height: 0 };
  color: string = "#fff";
  isFillReact: boolean = false;
  isVisible: boolean = false;
  constructor() {
    super();
  }
  setSize(width: number, height: number) {
    this.size = { width, height };
  }
  getSize() {
    return this.size;
  }
  getColor() {
    return this.color;
  }
  setColor(color: string) {
    this.color = color;
  }
  getIsFillReact() {
    return this.isFillReact;
  }
  setIsFillReact(isFillReact: boolean) {
    this.isFillReact = isFillReact;
  }
  setIsVisible(isVisible: boolean) {
    this.isVisible = isVisible;
  }
  getIsVisible() {
    return this.isVisible;
  }
}
