import ImageSpriteObject from "../GameEngine/image/ImageSpriteObject";
import Scenes from "../GameEngine/scenes/Scenes";
import Rectangle from "../GameEngine/shape/Rectangle";
import Text from "../GameEngine/text/Text";

export default class ScenesOver extends Scenes {
  bgGameOver: Rectangle = new Rectangle();
  btnRestart: ImageSpriteObject = new ImageSpriteObject();
  txtGameOver: ImageSpriteObject = new ImageSpriteObject();
  textScore: Text = new Text();
  textHeightScore: Text = new Text();
  score: number = 0;
  heightScore: number = 0;

  constructor() {
    super("over");
  }
  init(data: any) {
    this.score = data.score;
    this.heightScore = data.heightScore;
  }

  preload() {
    const frameInSprite = [
      {
        key: "btnRestart",
        sourcePosition: { x: 0, y: 0 },
        sourceSize: {
          width: 75,
          height: 70,
        },
      },
      {
        key: "txtGameOver",
        sourcePosition: { x: 955, y: 25 },
        sourceSize: {
          width: 380,
          height: 30,
        },
      },
    ];
    this.load.addConfigImageSprite("mainSprite", frameInSprite);
  }
  create() {
    this.createBtnRestart();
    this.txtGameOver = this.add.imageSprite(
      250,
      110,
      270,
      20,
      "mainSprite",
      "txtGameOver"
    );
    this.createTextScore();
    this.createTextHeightScore();
    this.createEvent();
    this.bgGameOver = this.add.rectangular(0, 0, 800, 400, "rgba(0,0,0,.3)");
  }
  createBtnRestart() {
    this.btnRestart = this.add.imageSprite(
      350,
      150,
      70,
      60,
      "mainSprite",
      "btnRestart"
    );
  }
  createEvent() {
    this.input.onClick((e) => {
      if (
        e.offsetX > 350 &&
        e.offsetX < 420 &&
        e.offsetY > 150 &&
        e.offsetY < 210
      ) {
        this.changeScenes("start");
      }
    });
  }
  createTextScore() {
    this.textScore = this.add.text(
      300,
      250,
      `Score: ${this.score} `,
      "Arial",
      20
    );
  }
  createTextHeightScore() {
    this.textHeightScore = this.add.text(
      300,
      280,
      `Hight Score: ${this.heightScore}`,
      "Arial",
      20
    );
  }
  update() {}
}
