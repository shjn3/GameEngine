import Load from "../load/Load";
import Game from "../game/Game";
import Add from "../add/Add";
import Animation from "../animation/Animation";
import Input from "../input/Input";
import Rectangle from "../shape/Rectangle";
import BaseObject from "../base/BaseObject";
interface IScenes {
  load: Load;
  add: Add;
  animation: Animation;
  input: Input;
  nameScenes: string;
  idRequestAnimation: number;
  isActive: boolean;

  setIsActive(isActive: boolean): void;
  //use method when scenes active
  active(): void;
  //load image
  preload(): void;
  //create image before update
  create(): void;
  draw(): void;

  update(): void;

  loop(): void;
  // change Scenes
  changeScenes(name: string): void;
  //Collection Detection
  collectionDetection(player: BaseObject, obstacles: BaseObject): void;
}
export default class Scenes implements IScenes {
  load: Load = new Load();
  add: Add = new Add();
  animation: Animation = new Animation();
  input: Input = new Input();
  nameScenes: string;
  idRequestAnimation: number = 0;
  isActive: boolean = false;

  constructor(nameScenes: string = "") {
    this.nameScenes = nameScenes;
  }
  //check Scenes is show on screen
  setIsActive(isActive: boolean) {
    this.isActive = isActive;
  }
  //use method when scenes active
  active() {
    this.isActive = true;
    this.preload();
    this.create();
    this.loop();
  }
  //load image
  preload() {}
  //create image before update
  create() {}
  draw() {
    //draw array image
    if (Add.SArrayDrawImage.length > 0) {
      Add.SArrayDrawImage.forEach((_e) => {
        if (_e.isVisible) {
          let _image = _e.getImage(),
            { x, y } = _e.getPosition(),
            width = _e.getWidth(),
            height = _e.getHeight();
          Game.SCtx.beginPath();
          Game.SCtx.drawImage(_image, x, y, width, height);
        }
      });
    }
    //draw image from sprite
    if (Add.SArrayDrawImageFromSprite.length > 0) {
      Add.SArrayDrawImageFromSprite.forEach((_e) => {
        if (_e.isVisible) {
          let sourcePosition = _e.getSourcePosition(),
            sourceSize = _e.getSourceSize(),
            position = _e.getPosition(),
            size = _e.getSize(),
            image = _e.getImage();
          Game.SCtx.beginPath();

          Game.SCtx.drawImage(
            image,
            sourcePosition.x,
            sourcePosition.y,
            sourceSize.width,
            sourceSize.height,
            position.x,
            position.y,
            size.width,
            size.height
          );
        }
      });
    }
    //draw image with animation
    if (Add.SArrayDrawImageAnimation.length > 0) {
      Add.SArrayDrawImageAnimation.forEach((_e) => {
        if (_e.isVisible) {
          let timer = _e.getTimer(),
            indexFrame = _e.getIndexFrame();
          timer++;
          if (timer > 1000 / _e.configAnimation.frameRate) {
            timer = 0;

            if (_e.configAnimation.frameInSpriteOfAnimation.length > 1) {
              if (
                indexFrame + 1 ===
                _e.configAnimation.frameInSpriteOfAnimation.length
              ) {
                _e.setIndexFrame(0);
              } else {
                _e.setIndexFrame(indexFrame + 1);
              }
            }
          }
          _e.setTimer(timer);
          let image = _e.configAnimation.image,
            sourcePosition =
              _e.configAnimation.frameInSpriteOfAnimation[_e.getIndexFrame()]
                .sourcePosition,
            sourceSize =
              _e.configAnimation.frameInSpriteOfAnimation[_e.getIndexFrame()]
                .sourceSize,
            position = _e.getPosition(),
            size = _e.getSize();
          Game.SCtx.drawImage(
            image,
            sourcePosition.x,
            sourcePosition.y,
            sourceSize.width,
            sourceSize.height,
            position.x,
            position.y,
            size.width,
            size.height
          );
        }
      });
    }
    //draw Text
    if (Add.SArrayText.length > 0) {
      Add.SArrayText.forEach((_e) => {
        let text = _e.getText();
        let size = _e.getFontSize();
        let font = _e.getFontFamily();
        let { x, y } = _e.getPosition();
        Game.SCtx.beginPath();
        Game.SCtx.font = `${size}px ${font}`;
        Game.SCtx.fillText(`${text}`, x, y);
      });
    }
    //draw Shape
    if (Add.SArrayShape.length > 0) {
      Add.SArrayShape.forEach((_e) => {
        if (_e instanceof Rectangle) {
          if (_e.isVisible) {
            let position = _e.getPosition(),
              size = _e.getSize();
            Game.SCtx.beginPath();
            Game.SCtx.fillStyle = _e.color;
            Game.SCtx.fillRect(position.x, position.y, size.width, size.height);
            Game.SCtx.fillStyle = "#000";
          }
        }
      });
    }
  }

  update() {}

  loop() {
    this.idRequestAnimation = window.requestAnimationFrame(() => this.loop());
    Game.SCtx.clearRect(0, 0, Game.SCanvas.width, Game.SCanvas.height);
    this.draw();
    this.update();
  }
  // change Scenes
  changeScenes(name: string) {
    Add.SArrayDrawImageFromSprite = [];
    Add.SArrayText = [];
    Add.SArrayDrawImage = [];
    Add.SArrayDrawImageAnimation = [];
    Animation.SArrayConfigAnimation = [];
    Game.SCtx.clearRect(0, 0, Game.SCanvas.width, Game.SCanvas.height);
    this.draw();
    this.isActive = false;
    window.cancelAnimationFrame(this.idRequestAnimation);
    let lengthArrScenes = Game.SArrayScenes.length;
    for (let i = 0; i < lengthArrScenes; i++) {
      if (name === Game.SArrayScenes[i].nameScenes) {
        Game.SArrayScenes[i].active();
        break;
      }
    }
  }
  //
  collectionDetection(player: BaseObject, obstacles: BaseObject) {
    if (player && obstacles) {
      let playerSize = player.getSize(),
        playerPosition = player.getPosition(),
        obstaclesSize = obstacles.getSize(),
        obstaclesPosition = obstacles.getPosition();
      if (
        playerPosition.x < obstaclesPosition.x + obstaclesSize.width &&
        playerPosition.x + playerSize.width > obstaclesPosition.x &&
        playerPosition.y < obstaclesPosition.y + obstaclesSize.height &&
        playerPosition.y + playerSize.height > obstaclesPosition.y
      ) {
        return true;
      }
    }
    return false;
  }
}
