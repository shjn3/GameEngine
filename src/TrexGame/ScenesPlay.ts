import CScenes from "../GameEngine/scenes/CScenes";
import CAnimation from "../GameEngine/animation/CAnimation";
import CDrawImage from "../GameEngine/image/CDrawImage";
import CDrawImageSprite from "../GameEngine/image/CDrawImageSprite";
import CImageSprite from "../GameEngine/image/CImageSprite";

export default class ScenesPlay extends CScenes {
  maxCloud: number = 6;
  btnStart: CDrawImage = new CDrawImage();
  arrCloud: Array<CDrawImageSprite> = [];
  player: CAnimation = new CAnimation();
  obstacles: Array<CImageSprite> = [];
  jumpVelocity: number = -13;
  gameOver: boolean = false;
  constructor() {
    super("play");
  }
  preload() {}
  create() {
    this.createGround();
    //draw cloud
    this.createCloud();
    //draw Animation
    this.createPlayer();
    //draw Obstacles
    this.createObstacles();

    //create event input
    this.createEvent();
  }
  createGround() {
    this.add.imageSprite(0, 320, 1600, 30, "mainSprite", "ground");
    this.add.imageSprite(1600, 320, 1600, 30, "mainSprite", "ground");
  }
  createCloud() {
    this.arrCloud.push(
      <CDrawImageSprite>(
        this.add.imageSprite(800, 0, 100, 50, "mainSprite", "cloud")
      )
    );
  }

  createPlayer() {
    this.player = <CAnimation>(
      this.add.spriteSheet(15, 290, 60, 70, "mainSprite")
    );
    let configRunPlayer = {
      key: "RunPlayer",
      frames: ["run1", "run2"],
      frameRate: 60,
      repeat: -1,
    };
    let configDuckPlayer = {
      key: "DuckPlayer",
      frames: ["duck1", "duck2"],
      frameRate: 60,
      repeat: -1,
    };
    let configJumpPlayer = {
      key: "JumpPlayer",
      frames: ["jump"],
      frameRate: 60,
      repeat: -1,
    };
    let configDiePlayer = {
      key: "DiePlayer",
      frames: ["die"],
      framerate: 60,
      repeat: -1,
    };
    this.animation.create(configRunPlayer);
    this.animation.create(configDuckPlayer);
    this.animation.create(configJumpPlayer);
    this.animation.create(configDiePlayer);
    //this.player.drawSingleAnimation.y = 275;
    this.player.play("RunPlayer");
  }
  createEvent() {
    //add event
    this.input.keydown(" ", () => {
      if (this.player.nameAnimation === "RunPlayer")
        this.player.play("JumpPlayer");
    });
    this.input.keydown("ArrowUp", () => {
      if (this.player.nameAnimation === "RunPlayer")
        this.player.play("JumpPlayer");
    });
    this.input.keydown("ArrowDown", () => {
      if (this.player.nameAnimation === "RunPlayer")
        this.player.play("DuckPlayer");
    });
    this.input.keyup("ArrowDown", () => {
      if (this.player.nameAnimation === "DuckPlayer") {
        this.player.play("RunPlayer");
      }
    });
    //this.input.onClick(() => console.log("left Click"));
  }
  createObstacles() {
    this.obstacles.push(
      this.add.imageSprite(300, 295, 30, 45, "mainSprite", "cactusSmall")
    );
  }
  //======================================== update
  update() {
    if (!this.gameOver) {
      //update array Cloud
      //this.updateObstacles();
      this.updateCloud();
      this.updatePlayerJump();
      this.CollisionDetection();
    }
  }
  updateObstacles() {
    if (this.obstacles.length > 0) {
      this.obstacles[0].position.x -= 2;
      if (this.obstacles[0].position.x + 100 < 0)
        this.obstacles[0].position.x = 500;
    }
  }
  updatePlayerJump() {
    if (this.player.nameAnimation === "JumpPlayer") {
      this.jumpVelocity += 0.3 * 1.1;
      this.player.drawSingleAnimation.y += this.jumpVelocity;
      if (this.player.drawSingleAnimation.y > 290) {
        this.jumpVelocity = -13;
        this.player.drawSingleAnimation.y = 290;
        this.player.play("RunPlayer");
      }
    }
  }
  CollisionDetection() {
    if (this.obstacles.length > 0) {
      if (
        this.obstacles[0].position.x > this.player.drawSingleAnimation.x &&
        this.obstacles[0].position.x <
          this.player.drawSingleAnimation.x +
            this.player.drawSingleAnimation.width &&
        this.obstacles[0].position.y > this.player.drawSingleAnimation.y &&
        this.obstacles[0].position.y <
          this.player.drawSingleAnimation.y +
            this.player.drawSingleAnimation.height
      ) {
        this.gameOver = true;
        this.player.play("DiePlayer");
      }
    }
  }
  updateCloud() {
    if (this.arrCloud.length > 0) {
      this.arrCloud.forEach((_e) => (_e.position.x -= 2));
      if (
        this.arrCloud.length < this.maxCloud &&
        this.arrCloud[this.arrCloud.length - 1].position.x +
          this.arrCloud[this.arrCloud.length - 1].width <
          this.getRandom(500, 800)
      ) {
        let width = this.getRandom(40, 100);
        let y = this.getRandom(0, 250);
        let _cloud: CDrawImageSprite = <CDrawImageSprite>(
          this.add.imageSprite(
            800,
            y,
            width,
            width / 1.5,
            "mainSprite",
            "cloud"
          )
        );
        this.arrCloud.push(_cloud);
      }

      if (this.arrCloud[0].position.x + this.arrCloud[0].width < 0) {
        this.arrCloud[0].destroy();
        console.log(this.obstacles);
        this.arrCloud.splice(0, 1);
      }
    }
  }
  getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
