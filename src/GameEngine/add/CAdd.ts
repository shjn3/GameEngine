import CAnimation from "../animation/CAnimation";
import CLoad from "../load/CLoad";
import CText from "../text/CText";
import CGround from "../background/CGround";
import CImage from "../image/CImage";
import CImageSprite from "../image/CImageSprite";
import CDrawImage from "../image/CDrawImage";
import CDrawImageSprite from "../image/CDrawImageSprite";

interface IADD {
  image: (
    x: number,
    y: number,
    width: number,
    height: number,
    name: string
  ) => CImage | void;
  text: (
    name: string,
    x: number,
    y: number,
    text: string,
    font: string,
    size: number
  ) => void;
}

export default class CAdd implements IADD {
  static arrText: Array<CText> = [];
  static arrDrawImage: Array<CDrawImage> = [];
  static arrDrawImageSprite: Array<CDrawImageSprite> = [];
  constructor() {}
  image(x: number, y: number, width: number, height: number, name: string) {
    let _imageAddTemp = CLoad.arrImage.filter((_e) => _e.getName() === name);
    if (_imageAddTemp[0]) {
      let temp = new CDrawImage();
      let image = <HTMLImageElement>_imageAddTemp[0].getImage();
      temp.setName(name);
      temp.setPosition(x, y);
      temp.setWidth(width);
      temp.setHeight(height);
      temp.setIsDraw(true);
      temp.image = image;
      temp.key = Math.floor(Math.random() * Date.now());
      CAdd.arrDrawImage.push(temp);
      return temp;
    }
  }
  imageSprite(
    x: number,
    y: number,
    width: number,
    height: number,
    name: string,
    keyFrame: string
  ) {
    let _imageSpriteAddTemp = CLoad.arrImageSprite.filter(
      (_e) => _e.getName() === name
    );
    if (_imageSpriteAddTemp[0]) {
      if (_imageSpriteAddTemp[0].frameInSprite.length > 0) {
        let _imageSpriteConfigTemp =
          _imageSpriteAddTemp[0].frameInSprite.filter(
            (_e) => _e.key === keyFrame
          );

        if (_imageSpriteConfigTemp[0]) {
          let temp = new CDrawImageSprite();
          temp.setFrameInSprite(_imageSpriteConfigTemp);
          temp.setHeight(height);
          temp.setWidth(width);
          temp.setPosition(x, y);
          temp.imageSprite = _imageSpriteAddTemp[0].imageSprite;
          temp.key = Math.floor(Math.random() * Date.now());
          CAdd.arrDrawImageSprite.push(temp);
          return temp;
        }
      }
    }
  }

  text(
    name: string,
    x: number,
    y: number,
    text: string,
    font: string = "Arial",
    size: number = 13
  ) {
    let _textTemp = new CText();
    _textTemp.setName(name);
    _textTemp.setPosition(x, y);
    _textTemp.setFont(font);
    _textTemp.setSize(size);
    _textTemp.setText(text);
    _textTemp.key = Math.floor(Math.random() * Date.now());
    CAdd.arrText.push(_textTemp);
    return _textTemp;
  }

  spriteSheet(
    x: number,
    y: number,
    width: number,
    height: number,
    name: string
  ) {
    let _spriteSheetAddTemp = CLoad.arrImageSprite.filter(
      (_e) => _e.getName() === name
    );
    if (_spriteSheetAddTemp[0]) {
      let _animation: CAnimation = new CAnimation();
      let _image: HTMLImageElement = _spriteSheetAddTemp[0].imageSprite;
      let _frameInSprite = _spriteSheetAddTemp[0].frameInSprite;
      let temp = {
        image: _image,
        frameInSprite: _frameInSprite,
        x,
        y,
        width,
        height,
        frames: [],
      };
      _animation.drawSingleAnimation = temp;
      return _animation;
    }
  }

  background() {}
}
