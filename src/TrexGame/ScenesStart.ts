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
        key: "run1",
        sourcePosition: { x: 1511, y: 0 },
        sourceSize: {
          width: 95,
          height: 110,
        },
      },
      {
        key: "run2",
        sourcePosition: { x: 1599, y: 0 },
        sourceSize: {
          width: 95,
          height: 110,
        },
      },
      {
        key: "cloud",
        sourcePosition: { x: 165, y: 0 },
        sourceSize: {
          width: 100,
          height: 30,
        },
      },
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
      {
        key: "duck1",
        sourcePosition: { x: 1862, y: 0 },
        sourceSize: {
          width: 120,
          height: 90,
        },
      },
      //cw: 70, ch: 58, cY: 320 cX:15
      {
        key: "duck2",
        sourcePosition: { x: 1982, y: 0 },
        sourceSize: {
          width: 120,
          height: 90,
        },
      },
      //cw: 60, ch:70, cY: 320 cx: 15
      {
        key: "jump",
        sourcePosition: { x: 1335, y: 0 },
        sourceSize: {
          width: 95,
          height: 110,
        },
      },
      {
        key: "die",
        sourcePosition: { x: 1335, y: 0 },
        sourceSize: {
          width: 95,
          height: 110,
        },
      },
      {
        key: "cactusSmall",
        sourcePosition: { x: 616, y: 0 },
        sourceSize: {
          width: 34,
          height: 70,
        },
      },
      {
        key: "cactusLarge",
        sourcePosition: { x: 650, y: 0 },
        sourceSize: {
          width: 50,
          height: 80,
        },
      },
      {
        key: "PTerodactyl1",
        sourcePosition: { x: 260, y: 0 },
        sourceSize: {
          width: 90,
          height: 70,
        },
      },
      {
        key: "PTerodactyl2",
        sourcePosition: { x: 350, y: 0 },
        sourceSize: {
          width: 90,
          height: 70,
        },
      },
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
