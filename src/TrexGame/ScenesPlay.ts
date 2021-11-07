import CScenes from "../GameEngine/scenes/CScenes";
import CAnimation from "../GameEngine/animation/CAnimation";
import CImage from "../GameEngine/image/CImage";
import CImageSprite from "../GameEngine/image/CImageSprite";
import CText from "../GameEngine/text/CText";

export default class ScenesPlay extends CScenes {
  maxCloud: number = 6;
  btnStart: CImage = new CImage();
  btnRestart: CImageSprite = new CImageSprite();
  txtGameOver: CImageSprite = new CImageSprite();
  arrCloud: Array<CImageSprite> = [];
  player: CAnimation = new CAnimation();
  obstaclesCactus: Array<CImageSprite> = [];
  obstaclesPTerodactyl: Array<CAnimation> = [];
  jumpVelocity: number = -13;
  gameOver: boolean = false;
  score: number = 0;
  arrGround: Array<CImageSprite> = [];
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
    this.createGameOver();
  }
  createGameOver() {
    this.btnRestart = this.add.imageSprite(
      400,
      150,
      70,
      60,
      "mainSprite",
      "btnRestart"
    );
    this.btnRestart.setIsDraw(false);
    this.txtGameOver = this.add.imageSprite(
      300,
      110,
      270,
      20,
      "mainSprite",
      "txtGameOver"
    );
    this.txtGameOver.setIsDraw(false);
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
      this.add.imageSprite(0, 320, 1600, 30, "mainSprite", "ground")
    );
    this.arrGround.push(
      this.add.imageSprite(1600, 320, 1600, 30, "mainSprite", "ground")
    );
  }
  createCloud() {
    this.arrCloud.push(
      this.add.imageSprite(800, 0, 100, 50, "mainSprite", "cloud")
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
    this.player.drawSingleAnimation.y = 275;
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
    this.input.onClick((e: MouseEvent) => {
      if (this.gameOver) {
        if (
          e.offsetX > 400 &&
          e.offsetX < 470 &&
          e.offsetY > 150 &&
          e.offsetY < 210
        ) {
          this.gameOver = false;
          this.arrCloud = [];
          this.arrGround = [];
          this.obstaclesPTerodactyl = [];
          this.obstaclesCactus = [];
          this.score = 0;
          this.player = new CAnimation();
          this.timer = 0;
          this.changeScenes("start");
        }
      }
    });
  }
  createObstacles() {
    this.obstaclesCactus.push(
      this.add.imageSprite(800, 295, 30, 45, "mainSprite", "cactusSmall")
    );
    let configObstaclesPterodactyl = {
      key: "PTerodactyl",
      frames: ["PTerodactyl1", "PTerodactyl2"],
      frameRate: 30,
      repeat: -1,
    };
    this.animation.create(configObstaclesPterodactyl);
    this.obstaclesPTerodactyl.push(
      <CAnimation>this.add.spriteSheet(1000, 290, 50, 30, "mainSprite")
    );
    this.obstaclesPTerodactyl[0].play("PTerodactyl");
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
      this.btnRestart.setIsDraw(true);
      this.txtGameOver.setIsDraw(true);
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
          this.add.imageSprite(1600, 320, 1600, 30, "mainSprite", "ground")
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
    let lengthCactus = this.obstaclesCactus.length;
    let lengthPterodactyl = this.obstaclesPTerodactyl.length;
    if (lengthCactus > 0) {
      this.obstaclesCactus.forEach((_e) => (_e.position.x -= 2));
    }
    if (lengthPterodactyl > 0) {
      this.obstaclesPTerodactyl.forEach(
        (_e) => (_e.drawSingleAnimation.x -= 3)
      );
    }
    let maxWidth = 0;
    if (lengthCactus > 0 && lengthPterodactyl > 0) {
      maxWidth = Math.max(
        this.obstaclesCactus[lengthCactus - 1].position.x +
          this.obstaclesCactus[lengthCactus - 1].width,
        this.obstaclesPTerodactyl[lengthPterodactyl - 1].drawSingleAnimation.x +
          this.obstaclesPTerodactyl[lengthPterodactyl - 1].drawSingleAnimation
            .width
      );
    } else if (lengthCactus > 0 && lengthPterodactyl === 0) {
      maxWidth =
        this.obstaclesCactus[lengthCactus - 1].position.x +
        this.obstaclesCactus[lengthCactus - 1].width;
    } else if (lengthCactus === 0 && lengthPterodactyl > 0) {
      maxWidth =
        this.obstaclesPTerodactyl[lengthPterodactyl - 1].drawSingleAnimation.x +
        this.obstaclesPTerodactyl[lengthPterodactyl - 1].drawSingleAnimation
          .width;
    }

    let randomGap = this.getRandom(300, 600);
    if (maxWidth + randomGap < 800) {
      let randomType = this.getRandom(2, 2); //1 cactus 2 pterodactyl
      switch (randomType) {
        case 1:
          let randomSize = this.getRandom(2, 3);
          if (randomSize === 1) {
            this.obstaclesCactus.push(
              this.add.imageSprite(
                800,
                295,
                30,
                45,
                "mainSprite",
                "cactusSmall"
              )
            );
          } else {
            this.obstaclesCactus.push(
              this.add.imageSprite(
                800,
                285,
                30,
                60,
                "mainSprite",
                "cactusLarge"
              )
            );
          }
          if (lengthCactus > 0) {
            if (
              this.obstaclesCactus[0].position.x +
                this.obstaclesCactus[0].width <
              0
            ) {
              this.obstaclesCactus[0].destroy();
              this.obstaclesCactus.splice(0, 1);
            }
          }
          break;
        case 2:
          let height = [290, 270, 240];
          let randomHeight = this.getRandom(0, 2);
          this.obstaclesPTerodactyl.push(
            <CAnimation>(
              this.add.spriteSheet(
                800,
                height[randomHeight],
                50,
                30,
                "mainSprite"
              )
            )
          );
          this.obstaclesPTerodactyl[lengthPterodactyl].play("PTerodactyl");

          break;
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
    if (this.obstaclesCactus.length > 0) {
      if (
        this.obstaclesCactus[0].position.x >
          this.player.drawSingleAnimation.x &&
        this.obstaclesCactus[0].position.x <
          this.player.drawSingleAnimation.x +
            this.player.drawSingleAnimation.width &&
        this.obstaclesCactus[0].position.y >
          this.player.drawSingleAnimation.y &&
        this.obstaclesCactus[0].position.y <
          this.player.drawSingleAnimation.y +
            this.player.drawSingleAnimation.height
      ) {
        this.gameOver = true;
        this.player.play("DiePlayer");
      }
    }
    // if (
    //   this.obstaclesPTerodactyl.length > 0 &&
    //   this.player.drawSingleAnimation !== undefined
    // ) {
    //   if (
    //     this.obstaclesPTerodactyl[0].drawSingleAnimation.x >
    //       this.player.drawSingleAnimation.x &&
    //     this.obstaclesPTerodactyl[0].drawSingleAnimation.x <
    //       this.player.drawSingleAnimation.x +
    //         this.player.drawSingleAnimation.width &&
    //     this.obstaclesPTerodactyl[0].drawSingleAnimation.y >
    //       this.player.drawSingleAnimation.y &&
    //     this.obstaclesPTerodactyl[0].drawSingleAnimation.y <
    //       this.player.drawSingleAnimation.y +
    //         this.player.drawSingleAnimation.height
    //   ) {
    //     console.log("abc");
    //     this.gameOver = true;
    //     this.player.play("DiePlayer");
    //   }
    // }
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
        let _cloud: CImageSprite = this.add.imageSprite(
          800,
          y,
          width,
          width / 1.5,
          "mainSprite",
          "cloud"
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
