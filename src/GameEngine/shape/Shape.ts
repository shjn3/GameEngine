import type { IPosition } from "../utils/type";
interface IShape {
  position: IPosition;
  getPosition(): IPosition;
  setPosition(x: number, y: number): void;

  setPositionX(x: number): void;
  getPositionX(): number;

  setPositionY(y: number): void;
  getPositionY(): void;
}
export default abstract class Shape implements IShape {
  position: IPosition = { x: 0, y: 0 };
  constructor() {}
  getPosition() {
    return this.position;
  }
  setPosition(x: number, y: number) {
    this.position = { x, y };
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
