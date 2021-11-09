import Add from "../add/Add";
import Animation from "../animation/Animation";
import type { IConfigImageAnimation } from "../utils/type";
import BaseObject from "../base/BaseObject";

interface IImageAnimationObject {
  isVisible: boolean;
  key: number;
  nameAnimation: string;
  indexFrame: number;
  timer: number;
  configAnimation: IConfigImageAnimation;

  getNameAnimation: () => string;
  setNameAnimation: (nameAnimation: string) => void;

  setIsVisible: (isVisible: boolean) => void;
  getIsVisible: () => boolean;

  setKey: (key: number) => void;
  getKey: () => number;

  setIndexFrame: (indexFrame: number) => void;
  getIndexFrame: () => number;

  setTimer: (timer: number) => void;
  getTimer: () => number;

  play: (nameAnimation: string) => void;
  destroy: () => void;
}

export default class ImageAnimationObject
  extends BaseObject
  implements IImageAnimationObject
{
  isVisible: boolean = false;
  nameAnimation: string = "";
  key: number = Math.floor(Math.random() * Date.now());
  indexFrame: number = 0;
  timer: number = 0;
  configAnimation: IConfigImageAnimation;
  constructor() {
    super();
    this.configAnimation = {
      key: "",
      frameRate: 60,
      frameInSpriteOfAnimation: [
        {
          key: "",
          sourcePosition: { x: 0, y: 0 },
          sourceSize: { width: 0, height: 0 },
        },
      ],
      image: new Image(),
    };
  }
  getTimer() {
    return this.timer;
  }
  setTimer(timer: number) {
    this.timer = timer;
  }
  getIndexFrame() {
    return this.indexFrame;
  }
  setIndexFrame(indexFrame: number) {
    if (this.configAnimation) {
      if (this.configAnimation.frameInSpriteOfAnimation.length > indexFrame)
        this.indexFrame = indexFrame;
    }
  }

  getKey() {
    return this.key;
  }
  setKey(key: number) {
    this.key = key;
  }

  getNameAnimation() {
    return this.nameAnimation;
  }
  setNameAnimation(nameAnimation: string) {
    this.nameAnimation = nameAnimation;
  }

  setIsVisible(isVisible: boolean) {
    this.isVisible = isVisible;
  }
  getIsVisible() {
    return this.isVisible;
  }

  play(nameAnimation: string) {
    if (this.nameAnimation !== nameAnimation) {
      this.isVisible = false;
      this.indexFrame = 0;
      let _tempConfigAnimation = Animation.SArrayConfigAnimation.filter(
        (_e) => _e.key === nameAnimation
      );
      if (_tempConfigAnimation[0]) {
        let image = _tempConfigAnimation[0].image;
        this.configAnimation = JSON.parse(
          JSON.stringify(_tempConfigAnimation[0])
        );
        this.configAnimation.image = image;
        //this.configAnimation = _tempConfigAnimation[0];
        this.isVisible = true;
        this.nameAnimation = nameAnimation;
      }
    }
  }

  destroy() {
    Add.SArrayDrawImageAnimation = Add.SArrayDrawImageAnimation.filter(
      (_e) => _e.key !== this.key
    );
  }
}
