import CScenes from "../GameEngine/scenes/CScenes";

export default class ScenesStart extends CScenes {
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
        sPosition: { x: 1511, y: 0 },
        sWidth: 95,
        sHeight: 110,
      },
      {
        key: "run2",
        sPosition: { x: 1599, y: 0 },
        sWidth: 95,
        sHeight: 110,
      },
      {
        key: "cloud",
        sPosition: { x: 165, y: 0 },
        sWidth: 100,
        sHeight: 30,
      },
      {
        key: "ground",
        sPosition: { x: 0, y: 100 },
        sWidth: 2400,
        sHeight: 30,
      },
      {
        key: "dinos",
        sPosition: { x: 75, y: 0 },
        sWidth: 100,
        sHeight: 110,
      },
      {
        key: "duck1",
        sPosition: { x: 1862, y: 0 },
        sWidth: 120,
        sHeight: 90,
      },
      //cw: 70, ch: 58, cY: 320 cX:15
      {
        key: "duck2",
        sPosition: { x: 1982, y: 0 },
        sWidth: 120,
        sHeight: 90,
      },
      //cw: 60, ch:70, cY: 320 cx: 15
      {
        key: "jump",
        sPosition: { x: 1335, y: 0 },
        sWidth: 95,
        sHeight: 110,
      },
      {
        key: "die",
        sPosition: { x: 1335, y: 0 },
        sWidth: 95,
        sHeight: 110,
      },
      {
        key: "cactusSmall",
        sPosition: { x: 616, y: 0 },
        sWidth: 34,
        sHeight: 70,
      },
      {
        key: "cactusLarge",
        sPosition: { x: 650, y: 0 },
        sWidth: 50,
        sHeight: 80,
      },
      {
        key: "PTerodactyl",
        sPosition: { x: 260, y: 0 },
        sWidth: 90,
        sHeight: 70,
      },
    ];
    this.load.imageSprite("mainSprite", "./assets/sprite.png", frameInSprite);
  }
  create() {
    //draw Image
    this.add.image(350, 150, 100, 100, "btnStart");

    //draw Text
    this.add.text("TextForStart", 320, 270, "Click to start", "Arial", 30);
    //draw ground
    this.add.imageSprite(0, 320, 1600, 30, "mainSprite", "ground");
    //draw dinos
    this.add.imageSprite(15, 282, 60, 70, "mainSprite", "dinos");

    this.input.onClick(this.onClickStart);
  }
  handleArrowUp() {
    console.log("handle ArrowUp");
  }
  handleClickStart(e: MouseEvent) {
    if (
      e.offsetX > 350 &&
      e.offsetX < 450 &&
      e.offsetY > 150 &&
      e.offsetY < 250
    ) {
      this.changeScenes("play");
      this.input.removeOnClick(this.onClickStart);
    }
  }
  update() {}
}
