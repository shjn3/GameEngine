import ImageObject from "../image/ImageObject";
import ImageSpriteObject from "../image/ImageSpriteObject";
import { IFrameInSprite } from "../utils/type";

interface ILoad {
  image(nameImage: string, url: string): void;
  imageSprite(
    nameImage: string,
    url: string,
    frameInSprite: Array<IFrameInSprite>
  ): void;
}

export default class Load implements ILoad {
  static SArrayImage: Array<ImageObject> = [];
  static SArraySpriteSheet: Array<ImageSpriteObject> = [];
  constructor() {}
  image(nameImage: string, url: string) {
    let _imageTemp = new ImageObject();
    _imageTemp.setNameImage(nameImage);
    _imageTemp.setImage(url);
    _imageTemp.setKey(Math.floor(Math.random() * Date.now()));
    Load.SArrayImage.push(_imageTemp);
  }
  imageSprite(
    nameImage: string,
    url: string,
    frameInSprite: Array<IFrameInSprite>
  ) {
    let _imageSpriteTemp = new ImageSpriteObject();
    _imageSpriteTemp.setNameImage(nameImage);
    _imageSpriteTemp.setImage(url);
    _imageSpriteTemp.setFrameInSprite(frameInSprite);
    _imageSpriteTemp.setKey(Math.floor(Math.random() * Date.now()));
    Load.SArraySpriteSheet.push(_imageSpriteTemp);
  }
  addConfigImageSprite(
    nameImage: string,
    frameInSprite: Array<IFrameInSprite>
  ) {
    if (Load.SArraySpriteSheet.length > 0) {
      Load.SArraySpriteSheet.forEach((_e) => {
        if (_e.nameImage === nameImage) {
          _e.frameInSprite.push(...frameInSprite);
        }
      });
    }
  }
}
