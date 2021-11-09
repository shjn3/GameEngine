import Animation from "../animation/Animation";
import Load from "../load/Load";
import Text from "../text/Text";
import ImageObject from "../image/ImageObject";
import ImageSpriteObject from "../image/ImageSpriteObject";
import Shape from "../shape/Shape";
import Rectangle from "../shape/Rectangle";
import ImageAnimationObject from "../image/ImageAnimationObject";
interface IAdd {
  image: (
    x: number,
    y: number,
    width: number,
    height: number,
    nameImage: string
  ) => ImageObject;
  imageSprite: (
    x: number,
    y: number,
    width: number,
    height: number,
    nameImage: string,
    keyFrame: string
  ) => ImageSpriteObject;
  spriteSheet: (
    x: number,
    y: number,
    width: number,
    height: number
  ) => ImageAnimationObject;
  text: (
    x: number,
    y: number,
    text: string,
    fontFamily: string,
    fontSize: number
  ) => Text;
  rectangular: (
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) => Rectangle;
}
export default class Add implements IAdd {
  static SArrayText: Array<Text> = [];
  static SArrayDrawImage: Array<ImageObject> = [];
  static SArrayDrawImageFromSprite: Array<ImageSpriteObject> = [];
  static SArrayShape: Array<Shape> = [];
  static SArrayDrawImageAnimation: Array<ImageAnimationObject> = [];
  constructor() {}

  image(
    x: number,
    y: number,
    width: number,
    height: number,
    nameImage: string
  ) {
    let _imageAddTemp = Load.SArrayImage.filter(
      (_e) => _e.getNameImage() === nameImage
    );
    let temp = new ImageObject();
    if (_imageAddTemp[0]) {
      let image = <HTMLImageElement>_imageAddTemp[0].getImage();
      temp.setNameImage(nameImage);
      temp.setPosition(x, y);
      temp.setSize(width, height);
      temp.setIsVisible(true);
      temp.setImage(image);
      Add.SArrayDrawImage.push(temp);
      return temp;
    }
    return temp;
  }

  imageSprite(
    x: number,
    y: number,
    width: number,
    height: number,
    nameImage: string,
    keyFrame: string
  ) {
    let temp = new ImageSpriteObject();
    let _imageSpriteAddTemp = Load.SArraySpriteSheet.filter(
      (_e) => _e.getNameImage() === nameImage
    );
    if (_imageSpriteAddTemp[0]) {
      if (_imageSpriteAddTemp[0].frameInSprite.length > 0) {
        let _imageSpriteConfigTemp =
          _imageSpriteAddTemp[0].frameInSprite.filter(
            (_e) => _e.key === keyFrame
          );
        if (_imageSpriteConfigTemp[0]) {
          temp.setFrameInSprite(_imageSpriteConfigTemp);
          temp.setSourcePosition(
            _imageSpriteConfigTemp[0].sourcePosition.x,
            _imageSpriteConfigTemp[0].sourcePosition.y
          );
          temp.setSourceSize(
            _imageSpriteConfigTemp[0].sourceSize.width,
            _imageSpriteConfigTemp[0].sourceSize.height
          );
          temp.setSize(width, height);
          temp.setPosition(x, y);
          temp.setIsVisible(true);
          temp.setImage(_imageSpriteAddTemp[0].image);
          Add.SArrayDrawImageFromSprite.push(temp);
        }
      }
    }
    return temp;
  }

  spriteSheet(x: number, y: number, width: number, height: number) {
    let _imageAnimation = new ImageAnimationObject();
    _imageAnimation.setPosition(x, y);
    _imageAnimation.setSize(width, height);
    Add.SArrayDrawImageAnimation.push(_imageAnimation);
    return _imageAnimation;
  }

  text(
    x: number,
    y: number,
    text: string,
    fontFamily: string = "Arial",
    fontSize: number = 13
  ) {
    let _textTemp = new Text();

    _textTemp.setPosition(x, y);
    _textTemp.setFontFamily(fontFamily);
    _textTemp.setFontSize(fontSize);
    _textTemp.setText(text);
    Add.SArrayText.push(_textTemp);
    return _textTemp;
  }

  rectangular(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) {
    let temp = new Rectangle();
    temp.setPosition(x, y);
    temp.setSize(width, height);
    temp.setColor(color);
    Add.SArrayShape.push(temp);
    return temp;
  }
}
