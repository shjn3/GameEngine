import CScenes from "../GameEngine/scenes/CScenes";
import CAnimation from "../GameEngine/animation/CAnimation";
import CDrawImage from "../GameEngine/image/CDrawImage";
import CDrawImageSprite from "../GameEngine/image/CDrawImageSprite";
import CImageSprite from "../GameEngine/image/CImageSprite";
import CText from "../GameEngine/text/CText";

export default class ScenesPlay extends CScenes {
  maxCloud: number = 6;
  btnStart: CDrawImage = new CDrawImage();
  arrCloud: Array<CDrawImageSprite> = [];
  player: CAnimation = new CAnimation();
  obstacles: Array<CDrawImageSprite> = [];
  jumpVelocity: number = -13;
  gameOver: boolean = false;
  score: number = 0;
  arrGround: Array<CDrawImageSprite> = [];
  textScore: CText = new CText();
  textHightScore: CText = new CText();
  heightScore: number = 0;
  timer: number = 0;
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
    this.createScore();
    //create event input
    this.createEvent();
  }
  createScore() {
    this.textScore = this.add.text(
      "TextForScore",
      600,
      30,
      "Score: 0",
      "Arial",
      20
    );
    this.textHightScore = this.add.text(
      "TextForScore",
      600,
      60,
      `Hight Score: ${this.heightScore}`,
      "Arial",
      20
    );
  }
  createGround() {
    this.arrGround.push(
      <CDrawImageSprite>(
        this.add.imageSprite(0, 320, 1600, 30, "mainSprite", "ground")
      )
    );
    this.arrGround.push(
      <CDrawImageSprite>(
        this.add.imageSprite(1600, 320, 1600, 30, "mainSprite", "ground")
      )
    );
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
      <CDrawImageSprite>(
        this.add.imageSprite(400, 295, 30, 45, "mainSprite", "cactusSmall")
      )
    );
  }
  //======================================== update
  update() {
    if (!this.gameOver) {
      this.updateGround();
      this.updateScore();
      this.updateObstacles();
      this.updateCloud();
      this.updatePlayerJump();
      this.CollisionDetection();
    } else {
      this.updateHightScore();
    }
  }
  updateGround() {
    if (this.arrGround.length > 0) {
      this.arrGround[0].position.x += -2;
      this.arrGround[1].position.x += -2;
      if (this.arrGround[0].position.x < -1600) {
        this.arrGround[0].destroy();
        this.arrGround.splice(0, 1);
        this.arrGround.push(
          <CDrawImageSprite>(
            this.add.imageSprite(1600, 320, 1600, 30, "mainSprite", "ground")
          )
        );
      }
    }
  }
  updateHightScore() {
    this.heightScore = Math.max(this.heightScore, this.score);
    this.textHightScore.setText(`Hight Score: ${this.heightScore}`);
  }
  updateScore() {
    this.timer++;
    if (this.timer > 50) {
      this.timer = 0;
      this.score++;
      this.textScore.setText(`Score: ${this.score}`);
    }
  }
  updateObstacles() {
    if (this.obstacles.length > 0) {
      this.obstacles.forEach((_e) => (_e.position.x -= 2));
      let randomGap = this.getRandom(300, 600);
      if (
        this.obstacles[this.obstacles.length - 1].position.x +
          this.obstacles[this.obstacles.length - 1].width +
          randomGap <
        800
      ) {
        let randomType = this.getRandom(0, 2);

        switch (randomType) {
          case 0:
            this.obstacles.push(
              <CDrawImageSprite>(
                this.add.imageSprite(
                  800,
                  295,
                  30,
                  45,
                  "mainSprite",
                  "cactusSmall"
                )
              )
            );
            break;
          case 1:
            this.obstacles.push(
              <CDrawImageSprite>(
                this.add.imageSprite(
                  800,
                  295,
                  30,
                  45,
                  "mainSprite",
                  "cactusLarge"
                )
              )
            );
            break;
          case 2:
            this.obstacles.push(
              <CDrawImageSprite>(
                this.add.imageSprite(
                  800,
                  295,
                  30,
                  45,
                  "mainSprite",
                  "PTerodactyl"
                )
              )
            );
            break;
        }
        if (this.obstacles[0].position.x + this.obstacles[0].width < 0) {
          this.obstacles[0].destroy();
          this.obstacles.splice(0, 1);
        }
      }
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
        this.arrCloud.splice(0, 1);
      }
    }
  }
  getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
