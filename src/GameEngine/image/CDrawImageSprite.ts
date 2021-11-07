import CAdd from "../add/CAdd";
import CImageSprite from "./CImageSprite";
interface IDRAWIMAGESPRITE {}
export default class CDrawImageSprite extends CImageSprite {
  key: number = 0;
  constructor() {
    super();
  }
  destroy() {
    CAdd.arrDrawImageSprite = CAdd.arrDrawImageSprite.filter(
      (_e) => _e.key !== this.key
    );
  }
}
