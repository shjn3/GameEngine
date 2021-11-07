import CLoad from "../load/CLoad";
import CGame from "../game/CGame";
import CAdd from "../add/CAdd";
import CAnimation from "../animation/CAnimation";
import CInput from "../input/CInput";

interface ISCENES {
  status_game: 0 | 1 | 2; //0: Game start, 1: Game play, 2: Game end
  load: CLoad;
}
export default class CScenes implements ISCENES {
  status_game: 0 | 1 | 2 = 0;
  load: CLoad = new CLoad();
  add: CAdd = new CAdd();
  animation: CAnimation = new CAnimation();
  input: CInput = new CInput();
  nameScenes: string;
  idRequestAnimation: number = 0;
  isActive: boolean = false;

  constructor(nameScenes: string = "") {
    this.nameScenes = nameScenes;
  }
  setIsActive(isActive: boolean) {
    this.isActive = isActive;
  }
  active() {
    this.preload();
    this.create();
    this.loop();
  }
  preload() {}
  create() {}
  draw() {
    if (CAdd.arrDrawImage.length > 0) {
      CAdd.arrDrawImage.forEach((_e) => {
        if (_e.isDraw) {
          let _image = _e.getImage(),
            { x, y } = _e.getPosition(),
            width = _e.getWidth(),
            height = _e.getHeight();
          CGame.ctx.beginPath();
          CGame.ctx.drawImage(_image, x, y, width, height);
        }
      });
    }
    if (CAdd.arrDrawImageSprite.length > 0) {
      CAdd.arrDrawImageSprite.forEach((_e) => {
        if (_e.isDraw) {
          CGame.ctx.beginPath();
          CGame.ctx.drawImage(
            _e.image,
            _e.frameInSprite[0].sPosition.x,
            _e.frameInSprite[0].sPosition.y,
            _e.frameInSprite[0].sWidth,
            _e.frameInSprite[0].sHeight,
            _e.position.x,
            _e.position.y,
            _e.width,
            _e.height
          );
        }
      });
    }
    if (CAnimation.arrDrawAnimation.length > 0) {
      CAnimation.arrDrawAnimation.forEach((_e) => {
        _e.timer++;
        if (_e.timer > 1000 / _e.frameRate) {
          _e.timer = 0;
          if (_e.drawImage.frames.length > 1) {
            if (_e.mainFrame + 1 === _e.drawImage.frames.length) {
              _e.mainFrame = 0;
            } else {
              _e.mainFrame++;
            }
          }
        }
        CGame.ctx.drawImage(
          _e.drawImage.image,
          _e.drawImage.frames[_e.mainFrame].sPosition.x,
          _e.drawImage.frames[_e.mainFrame].sPosition.y,
          _e.drawImage.frames[_e.mainFrame].sWidth,
          _e.drawImage.frames[_e.mainFrame].sHeight,
          _e.drawImage.x,
          _e.drawImage.y,
          _e.drawImage.width,
          _e.drawImage.height
        );
      });
    }
    if (CAdd.arrText.length > 0) {
      CAdd.arrText.forEach((_e) => {
        let text = _e.getText();
        let size = _e.getSize();
        let font = _e.getFont();
        let { x, y } = _e.getPosition();
        CGame.ctx.beginPath();
        CGame.ctx.font = `${size}px ${font}`;
        CGame.ctx.fillText(`${text}`, x, y);
      });
    }
  }

  update() {}

  loop() {
    this.idRequestAnimation = window.requestAnimationFrame(() => this.loop());
    CGame.ctx.clearRect(0, 0, CGame.canvas.width, CGame.canvas.height);
    this.draw();
    this.update();
  }
  destroy() {
    window.cancelAnimationFrame(this.idRequestAnimation);
  }
  changeScenes(name: string) {
    CAnimation.arrConfigAnimation = [];
    CAdd.arrDrawImageSprite = [];
    CAdd.arrText = [];
    CAdd.arrDrawImage = [];
    CAnimation.arrDrawAnimation = [];
    CGame.ctx.clearRect(0, 0, CGame.canvas.width, CGame.canvas.height);
    this.draw();
    this.isActive = false;
    window.cancelAnimationFrame(this.idRequestAnimation);
    let lengthArrScenes = CGame.arrScenes.length;
    for (let i = 0; i < lengthArrScenes; i++) {
      if (name === CGame.arrScenes[i].nameScenes) {
        CGame.arrScenes[i].setIsActive(true);
        CGame.arrScenes[i].active();
      }
    }
  }
}
