import type { vector } from "../utils/type";
export default abstract class CShape {
  position: vector = { x: 0, y: 0 };
  constructor() {}
}
