import Scenes from "../GameEngine/scenes/Scenes";

export default class ScenesStart extends Scenes {
  eventClick: any;
  onClickStart: (e: MouseEvent) => void;
  constructor() {
    super("start");
    this.onClickStart = (e: MouseEvent) => this.handleClickStart(e);
  }

  preload() {
    this.load.image("btnStart", "./assets/PlayButton.png");
    const frameInSprite = [
      {
        key: "ground",
        sourcePosition: { x: 0, y: 100 },
        sourceSize: {
          width: 2400,
          height: 30,
        },
      },
      {
        key: "dinos",
        sourcePosition: { x: 75, y: 0 },
        sourceSize: {
          width: 100,
          height: 110,
        },
      },
    ];
    this.load.imageSprite("mainSprite", "./assets/sprite.png", frameInSprite);
  }
  create() {
    //draw Image
    this.add.image(350, 150, 100, 100, "btnStart");
    //draw Text
    this.add.text(320, 270, "Click to start", "Arial", 30);
    //draw ground
    this.add.imageSprite(0, 320, 1600, 30, "mainSprite", "ground");
    //draw dinos
    this.add.imageSprite(15, 282, 60, 70, "mainSprite", "dinos");
    this.input.onClick(this.onClickStart);
  }
  handleClickStart(e: MouseEvent) {
    if (
      e.offsetX > 350 &&
      e.offsetX < 450 &&
      e.offsetY > 150 &&
      e.offsetY < 250
    ) {
      this.changeScenes("play");
    }
  }
}
