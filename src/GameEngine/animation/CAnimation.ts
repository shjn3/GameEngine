import CConfigAnimation from "./CConfigAnimation";
import type { ICONFIGANIMATION, IDRAWSINGLEANIMATION } from "../utils/type";
interface IANIMATION {}
export default class CAnimation implements IANIMATION {
  static arrDrawAnimation: Array<CConfigAnimation> = [];
  static arrConfigAnimation: Array<ICONFIGANIMATION> = [];
  drawSingleAnimation: any;
  nameAnimation: string = "";
  key: number;
  constructor() {
    this.key = Math.floor(Math.random() * Date.now());
  }
  create(configAnimation: ICONFIGANIMATION) {
    let configTemp = JSON.parse(JSON.stringify(configAnimation));
    CAnimation.arrConfigAnimation.push(configTemp);
  }
  play(nameAnimation: string) {
    if (this.nameAnimation !== nameAnimation) {
      if (CAnimation.arrConfigAnimation.length > 0) {
        CAnimation.arrDrawAnimation = CAnimation.arrDrawAnimation.filter(
          (_e) => _e.key !== this.key
        );
        let configAnimationTemp = CAnimation.arrConfigAnimation.filter(
          (_e) => _e.key === nameAnimation
        );
        if (configAnimationTemp[0]) {
          let { frames, frameRate, repeat } = configAnimationTemp[0];
          if (this.drawSingleAnimation) {
            let arrFrameFromSprite: Array<any> = [];
            let framesLength = frames.length;
            this.drawSingleAnimation.frameInSprite.forEach((_e: any) => {
              for (let i = 0; i < framesLength; i++) {
                if (_e.key === frames[i]) {
                  arrFrameFromSprite.push(_e);
                  break;
                }
              }
            });
            this.drawSingleAnimation.frames = arrFrameFromSprite;
            let _configAnimationTemp = new CConfigAnimation();
            _configAnimationTemp.frameRate = frameRate;
            _configAnimationTemp.repeat = repeat;
            _configAnimationTemp.drawImage = this.drawSingleAnimation;
            _configAnimationTemp.name = nameAnimation;
            _configAnimationTemp.key = this.key;
            CAnimation.arrDrawAnimation.push(_configAnimationTemp);
          }
        }
      }
      this.nameAnimation = nameAnimation;
    }
  }
  destroy() {
    CAnimation.arrDrawAnimation = CAnimation.arrDrawAnimation.filter(
      (_e) => _e.key !== this.key
    );
  }
}
