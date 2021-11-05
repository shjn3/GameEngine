import CImage from "./CImage";
import CAdd from "../add/CAdd";
export default class CDrawImage extends CImage {
  isDraw: boolean = false;
  key: number = 0;
  constructor() {
    super();
  }
  setIsDraw(isDraw: boolean) {
    this.isDraw = isDraw;
  }
  destroy() {
    let lengthArrDrawImage = CAdd.arrDrawImage.length;
    if (lengthArrDrawImage > 0) {
      for (let i = 0; i < lengthArrDrawImage; i++) {
        if (CAdd.arrDrawImage[i].key === this.key) {
          CAdd.arrDrawImage.splice(i, i + 1);
          break;
        }
      }
    }
  }
}
