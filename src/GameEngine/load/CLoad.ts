import CImage from "../image/CImage";
import CImageSprite from "../image/CImageSprite";
import { IFRAMEINSPRITE } from "../utils/type";

interface ILOAD {
  image: (name: string, url: string) => void;
  imageSprite: (name: string, url: string, frameInSprite: any) => void;
}

export default class CLoad implements ILOAD {
  static arrImage: Array<CImage> = [];
  static arrImageSprite: Array<CImageSprite> = [];
  constructor() {}
  image(name: string, url: string) {
    let _imageTemp = new CImage();
    _imageTemp.setName(name);
    _imageTemp.setImage(url);
    _imageTemp.setKey(Math.floor(Math.random() * Date.now()));
    CLoad.arrImage.push(_imageTemp);
  }
  imageSprite(name: string, url: string, frameInSprite: Array<IFRAMEINSPRITE>) {
    let _imageSpriteTemp = new CImageSprite();
    _imageSpriteTemp.setName(name);
    _imageSpriteTemp.setImage(url);
    _imageSpriteTemp.setFrameInSprite(frameInSprite);
    _imageSpriteTemp.setKey(Math.floor(Math.random() * Date.now()));
    CLoad.arrImageSprite.push(_imageSpriteTemp);
  }
}
