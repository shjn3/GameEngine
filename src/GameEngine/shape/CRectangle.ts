import CShape from "./CShape";
export default class CRectangle extends CShape {
  width: number = 0;
  height: number = 0;
  color: string = "#fff";
  isFillReact: boolean = false;
  isDraw: boolean = false;
  constructor() {
    super();
  }
}
