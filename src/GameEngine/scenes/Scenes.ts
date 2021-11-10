import Load from "../load/Load";
import Add from "../add/Add";
import Animation from "../animation/Animation";
import Input from "../input/Input";
import BaseObject from "../base/BaseObject";
import Game from "../game/Game";
interface IScenes {
  load: Load;
  add: Add;
  animation: Animation;
  input: Input;
  nameScenes: string;
  idRequestAnimation: number;
  // isActive: boolean;

  // setIsActive(isActive: boolean): void;
  //use method when scenes active
  active(): void;
  //load image
  preload(): void;
  //create image before update
  create(): void;

  update(): void;
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
  // isActive: boolean = false;
  constructor(nameScenes: string = "") {
    this.nameScenes = nameScenes;
    this.preload();
  }
  init(data?: any) {}
  //check Scenes is show on screen
  // setIsActive(isActive: boolean) {
  //   this.isActive = isActive;
  // }
  //use method when scenes active
  active() {
    this.create();
  }
  //load image
  preload() {}
  //create image before update
  create() {}

  update() {}
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
  changeScenes(name: string, data?: any) {
    if (Game.SArrayScenes.length > 1) {
      Game.SArrayScenes.forEach((_e, index) => {
        if (_e.nameScenes === name) {
          if (Game.SNumberScenesVisible === index) {
            return;
          } else {
            Game.SNumberScenesVisible = index;
            Add.SArrayDrawImageAnimation = [];
            Add.SArrayDrawImageFromSprite = [];
            Add.SArrayDrawImage = [];
            Add.SArrayShape = [];
            Add.SArrayText = [];
            Animation.SArrayConfigAnimation = [];
            this.input.destroy();
            // this.isActive = false;
            if (data) {
              _e.init(data);
            }
            _e.active();

            return;
          }
        }
      });
    }
  }
}
