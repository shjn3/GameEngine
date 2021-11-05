import CConfigAnimation from "./CConfigAnimation";
interface IANIMATION {}
export default class CAnimation implements IANIMATION {
  static arrDrawAnimation: Array<any> = [];
  static arrConfigAnimation: Array<any> = [];
  drawSingleAnimation: any;
  nameAnimation: string = "";
  constructor() {}
  create(configAnimation: any) {
    let configTemp = JSON.parse(JSON.stringify(configAnimation));
    CAnimation.arrConfigAnimation.push(configTemp);
  }
  play(keyAnimation: string) {
    if (this.nameAnimation !== keyAnimation) {
      if (CAnimation.arrConfigAnimation.length > 0) {
        CAnimation.arrDrawAnimation = CAnimation.arrDrawAnimation.filter(
          (_e) => _e.name !== this.nameAnimation
        );
        let configAnimationTemp = CAnimation.arrConfigAnimation.filter(
          (_e) => _e.key === keyAnimation
        );
        if (configAnimationTemp[0]) {
          let { frames, frameRate, repeat } = configAnimationTemp[0];
          if (this.drawSingleAnimation) {
            let arrFrameFromSprite: any = [];
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
            _configAnimationTemp.name = keyAnimation;
            CAnimation.arrDrawAnimation.push(_configAnimationTemp);
          }
        }
      }
      this.nameAnimation = keyAnimation;
    }
  }
}
