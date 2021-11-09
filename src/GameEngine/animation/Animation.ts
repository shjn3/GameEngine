import Load from "../load/Load";
import type {
  IConfigAnimation,
  IConfigImageAnimation,
  IImageAnimation,
  IFrameInSprite,
} from "../utils/type";
interface IAnimation {
  imageAnimation: IImageAnimation;
  nameAnimation: string;
  key: number;
  create: (configAnimation: IConfigAnimation) => void;
}

export default class Animation implements IAnimation {
  static SArrayConfigAnimation: Array<IConfigImageAnimation> = [];

  imageAnimation: IImageAnimation;
  nameAnimation: string = "";
  key: number;

  constructor() {
    this.key = Math.floor(Math.random() * Date.now());
    this.imageAnimation = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      image: new Image(),
      frameInSprite: [],
      frames: [],
    };
  }

  create(configAnimation: IConfigAnimation) {
    const { key, frames, frameRate } = configAnimation;

    if (Load.SArraySpriteSheet.length > 0) {
      let imageFromSpriteSheet = Load.SArraySpriteSheet.filter(
        (_e) => _e.nameImage === frames.nameImage
      );
      if (imageFromSpriteSheet[0]) {
        let frameInSpriteOfAnimation: Array<IFrameInSprite> = [];
        let lengthFrames = frames.frames.length;
        if (lengthFrames > 0) {
          imageFromSpriteSheet[0].frameInSprite.forEach((_e) => {
            for (let i = 0; i < lengthFrames; i++) {
              if (_e.key === frames.frames[i]) {
                frameInSpriteOfAnimation.push(_e);
              }
            }
          });
        }
        if (frameInSpriteOfAnimation.length > 0) {
          Animation.SArrayConfigAnimation.push({
            key,
            frameRate,
            frameInSpriteOfAnimation: frameInSpriteOfAnimation,
            image: imageFromSpriteSheet[0].image,
          });
        }
      }
    }
  }
}
