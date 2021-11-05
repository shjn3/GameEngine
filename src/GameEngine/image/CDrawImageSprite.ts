import CAdd from "../add/CAdd";
import CImageSprite from "./CImageSprite";
interface IDRAWIMAGESPRITE {}
export default class CDrawImageSprite extends CImageSprite {
  key: number = 0;
  constructor() {
    super();
  }
  destroy() {
    let lengthDrawImageSprite = CAdd.arrDrawImageSprite.length;
    if (lengthDrawImageSprite > 0) {
      for (let i = 0; i < lengthDrawImageSprite; i++) {
        if (CAdd.arrDrawImageSprite[i].key === this.key) {
          CAdd.arrDrawImageSprite.splice(i, i + 1);
          console.log(CAdd.arrDrawImageSprite);
          break;
        }
      }
    }
  }
}
