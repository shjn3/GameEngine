import CAnimation from "../animation/CAnimation";
import CLoad from "../load/CLoad";
import CText from "../text/CText";
import CImage from "../image/CImage";
import CImageSprite from "../image/CImageSprite";
import CShape from "../shape/CShape";
import CRectangle from "../shape/CRectangle";

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

export default class CAdd {
  static arrText: Array<CText> = [];
  static arrDrawImage: Array<CImage> = [];
  static arrDrawImageSprite: Array<CImageSprite> = [];
  static arrShape: Array<CShape> = [];
  constructor() {}
  image(x: number, y: number, width: number, height: number, name: string) {
    let _imageAddTemp = CLoad.arrImage.filter((_e) => _e.getName() === name);
    if (_imageAddTemp[0]) {
      let temp = new CImage();
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
    return new CImage();
  }
  imageSprite(
    x: number,
    y: number,
    width: number,
    height: number,
    name: string,
    keyFrame: string
  ) {
    let temp = new CImageSprite();
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
          temp.setFrameInSprite(_imageSpriteConfigTemp);
          temp.setHeight(height);
          temp.setWidth(width);
          temp.setPosition(x, y);
          temp.image = _imageSpriteAddTemp[0].image;
          temp.isDraw = true;
          temp.key = Math.floor(Math.random() * Date.now());
          CAdd.arrDrawImageSprite.push(temp);
        }
      }
    }
    return temp;
  }
  spriteSheet(
    x: number,
    y: number,
    width: number,
    height: number,
    name: string
  ) {
    let _animation: CAnimation = new CAnimation();
    let _idSpriteSheetAddTemp = -1;
    CLoad.arrImageSprite.forEach((_e, index) => {
      if (_e.getName() === name) {
        _idSpriteSheetAddTemp = index;
        return;
      }
    });
    // let _spriteSheetAddTemp = CLoad.arrImageSprite.filter(
    //   (_e) => _e.getName() === name
    // );
    if (_idSpriteSheetAddTemp !== -1) {
      let _image: HTMLImageElement =
        CLoad.arrImageSprite[_idSpriteSheetAddTemp].image;
      let _frameInSprite =
        CLoad.arrImageSprite[_idSpriteSheetAddTemp].frameInSprite;
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
    }
    return _animation;
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
  rectangular(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) {
    let temp = new CRectangle();
    temp.position = { x, y };
    temp.width = width;
    temp.height = height;
    temp.color = color;
    CAdd.arrShape.push(temp);
    return temp;
  }
}
