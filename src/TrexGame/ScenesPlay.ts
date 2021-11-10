import Scenes from "../GameEngine/scenes/Scenes";
import ImageObject from "../GameEngine/image/ImageObject";
import ImageSpriteObject from "../GameEngine/image/ImageSpriteObject";
import Text from "../GameEngine/text/Text";
import ImageAnimationObject from "../GameEngine/image/ImageAnimationObject";

export default class ScenesPlay extends Scenes {
  btnStart: ImageObject = new ImageObject();

  timer: number = 0;
  velocity: number = -3;
  jumpVelocity: number = -13;

  textScore: Text = new Text();
  textHightScore: Text = new Text();
  heightScore: number = 0;
  score: number = 0;

  gameOver: boolean = false;

  player: ImageAnimationObject = new ImageAnimationObject();

  maxCloud: number = 6;
  arrCloud: Array<ImageSpriteObject> = [];

  obstaclesCactus: Array<ImageSpriteObject> = [];
  obstaclesPTerodactyl: Array<ImageAnimationObject> = [];

  arrGround: Array<ImageSpriteObject> = [];

  constructor() {
    super("play");
  }
  preload() {
    const frameCloud = [
      {
        key: "cloud",
        sourcePosition: { x: 165, y: 0 },
        sourceSize: {
          width: 100,
          height: 30,
        },
      },
    ];
    const framePlayer = [
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
    ];
    const frameObstacles = [
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
    ];
    this.load.addConfigImageSprite("mainSprite", framePlayer);
    this.load.addConfigImageSprite("mainSprite", frameObstacles);
    this.load.addConfigImageSprite("mainSprite", frameCloud);
  }
  create() {
    this.createGround();
    //draw Animation
    this.createPlayer();
    //draw Obstacles
    this.createObstacles();
    this.createScore();
    this.createEvent();
  }
  createScore() {
    this.textScore = this.add.text(600, 30, "Score: 0", "Arial", 20);
    this.textHightScore = this.add.text(
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

  createPlayer() {
    this.player = this.add.spriteSheet(15, 290, 60, 70);

    let configRunPlayer = {
      key: "RunPlayer",
      frames: {
        nameImage: "mainSprite",
        frames: ["run1", "run2"],
      },
      frameRate: 60,
    };

    let configDuckPlayer = {
      key: "DuckPlayer",
      frames: {
        nameImage: "mainSprite",
        frames: ["duck1", "duck2"],
      },
      frameRate: 60,
    };

    let configJumpPlayer = {
      key: "JumpPlayer",
      frames: {
        nameImage: "mainSprite",
        frames: ["jump"],
      },
      frameRate: 60,
    };

    let configDiePlayer = {
      key: "DiePlayer",
      frames: {
        nameImage: "mainSprite",
        frames: ["die"],
      },
      frameRate: 60,
    };

    this.animation.create(configRunPlayer);
    this.animation.create(configDuckPlayer);
    this.animation.create(configJumpPlayer);
    this.animation.create(configDiePlayer);
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
      if (this.player.nameAnimation === "RunPlayer") {
        this.player.getPosition().y = 295;
        this.player.getSize().width = 70;
        this.player.getSize().height = 55;
        this.player.play("DuckPlayer");
      }
    });
    this.input.keyup("ArrowDown", () => {
      if (this.player.nameAnimation === "DuckPlayer") {
        this.player.getPosition().y = 290;
        this.player.getSize().width = 60;
        this.player.getSize().height = 70;
        this.player.play("RunPlayer");
      }
    });
  }
  createObstacles() {
    let configObstaclesPterodactyl = {
      key: "PTerodactyl",
      frames: {
        nameImage: "mainSprite",
        frames: ["PTerodactyl1", "PTerodactyl2"],
      },
      frameRate: 30,
    };
    let configObstaclesPterodactylOver = {
      key: "PTerodactylOver",
      frames: {
        nameImage: "mainSprite",
        frames: ["PTerodactyl1"],
      },
      frameRate: 30,
    };
    this.animation.create(configObstaclesPterodactyl);
    this.animation.create(configObstaclesPterodactylOver);
  }
  //======================================== update
  update() {
    if (!this.gameOver) {
      this.updateGround();
      this.updateScore();
      this.updateObstacles();
      this.updateCloud();
      this.updatePlayerJump();
      this.handleCollision();
    } else {
      this.updateOverGame();
    }
  }
  updateOverGame() {
    this.updateHightScore();
    this.changeScenes("over", {
      score: this.score,
      heightScore: this.heightScore,
    });
    this.gameOver = false;
    this.arrCloud = [];
    this.arrGround = [];
    this.obstaclesPTerodactyl = [];
    this.obstaclesCactus = [];
    this.score = 0;
    this.timer = 0;
  }
  updateGround() {
    if (this.arrGround.length > 0) {
      this.arrGround[0].getPosition().x += this.velocity;
      this.arrGround[1].getPosition().x += this.velocity;
      if (this.arrGround[0].getPosition().x < -1600) {
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
  //update Obstacles
  updateObstacles() {
    this.updatePositionObstacles();

    let getSumPositionAndWidthLastObstacles =
      this.getSumPositionAndWidthLastObstacles();

    let randomGap = this.getRandom(300, 600);

    if (getSumPositionAndWidthLastObstacles + randomGap < 800) {
      let randomType = this.getRandom(1, 2); //1 cactus 2 pterodactyl
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
          break;
        case 2:
          let positionYPterodactyl = [290, 265, 240];
          let randomIndex = this.getRandom(0, 2);
          this.obstaclesPTerodactyl.push(
            this.add.spriteSheet(800, positionYPterodactyl[randomIndex], 50, 30)
          );
          this.obstaclesPTerodactyl[this.obstaclesPTerodactyl.length - 1].play(
            "PTerodactyl"
          );

          break;
      }
    }
    this.decreaseObstacles();
  }
  getSumPositionAndWidthLastObstacles() {
    let lengthCactus = this.obstaclesCactus.length;
    let lengthPterodactyl = this.obstaclesPTerodactyl.length;
    if (lengthCactus > 0 && lengthPterodactyl > 0) {
      return Math.max(
        this.obstaclesCactus[lengthCactus - 1].getPosition().x +
          this.obstaclesCactus[lengthCactus - 1].getSize().width,
        this.obstaclesPTerodactyl[lengthPterodactyl - 1].getPosition().x +
          this.obstaclesPTerodactyl[lengthPterodactyl - 1].getSize().width
      );
    } else if (lengthCactus > 0 && lengthPterodactyl === 0) {
      return (
        this.obstaclesCactus[lengthCactus - 1].getPosition().x +
        this.obstaclesCactus[lengthCactus - 1].getSize().width
      );
    } else if (lengthCactus === 0 && lengthPterodactyl > 0) {
      return (
        this.obstaclesPTerodactyl[lengthPterodactyl - 1].getPosition().x +
        this.obstaclesPTerodactyl[lengthPterodactyl - 1].getSize().width
      );
    }
    return 0;
  }
  decreaseObstacles() {
    if (this.obstaclesCactus.length > 0) {
      if (
        this.obstaclesCactus[0].getPosition().x +
          this.obstaclesCactus[0].size.width <
        0
      ) {
        this.obstaclesCactus[0].destroy();
        this.obstaclesCactus.splice(0, 1);
      }
    }

    if (this.obstaclesPTerodactyl.length > 0) {
      if (
        this.obstaclesPTerodactyl[0].getPosition().x +
          this.obstaclesPTerodactyl[0].getSize().width <
        0
      ) {
        this.obstaclesPTerodactyl[0].destroy();
        this.obstaclesPTerodactyl.splice(0, 1);
      }
    }
  }
  updatePositionObstacles() {
    let lengthCactus = this.obstaclesCactus.length;
    let lengthPterodactyl = this.obstaclesPTerodactyl.length;

    if (lengthCactus > 0) {
      this.obstaclesCactus.forEach((_e) =>
        _e.setPositionX(this.velocity + _e.getPositionX())
      );
    }
    if (lengthPterodactyl > 0) {
      this.obstaclesPTerodactyl.forEach((_e) =>
        _e.setPositionX(this.velocity - 1 + _e.getPositionX())
      );
    }
  }
  //update Player Jump
  updatePlayerJump() {
    if (this.player.getNameAnimation() === "JumpPlayer") {
      this.jumpVelocity += 0.3 * 1.1;
      this.player.getPosition().y += this.jumpVelocity;
      if (this.player.getPosition().y > 290) {
        this.jumpVelocity = -13;
        this.player.getPosition().y = 290;
        this.player.play("RunPlayer");
      }
    }
  }
  handleCollision() {
    if (this.obstaclesCactus.length > 0) {
      if (this.collectionDetection(this.player, this.obstaclesCactus[0])) {
        this.gameOver = true;
        this.player.play("DiePlayer");
      }
    }
    if (this.obstaclesPTerodactyl.length > 0) {
      if (this.collectionDetection(this.player, this.obstaclesPTerodactyl[0])) {
        this.gameOver = true;
        this.player.play("DiePlayer");
      }
    }
  }
  updateCloud() {
    if (this.arrCloud.length > 0) {
      this.arrCloud.forEach((_e) => (_e.position.x += this.velocity));
      if (
        this.arrCloud.length < this.maxCloud &&
        this.arrCloud[this.arrCloud.length - 1].position.x +
          this.arrCloud[this.arrCloud.length - 1].size.width <
          this.getRandom(500, 800)
      ) {
        let width = this.getRandom(40, 100);
        let y = this.getRandom(0, 250);
        let _cloud = this.add.imageSprite(
          800,
          y,
          width,
          width / 1.5,
          "mainSprite",
          "cloud"
        );
        this.arrCloud.push(_cloud);
      }
      if (this.arrCloud[0].position.x + this.arrCloud[0].size.width < 0) {
        this.arrCloud[0].destroy();
        this.arrCloud.splice(0, 1);
      }
    } else {
      let width = this.getRandom(40, 100);
      let y = this.getRandom(0, 250);
      let _cloud = this.add.imageSprite(
        800,
        y,
        width,
        width / 1.5,
        "mainSprite",
        "cloud"
      );
      this.arrCloud.push(_cloud);
    }
  }
  getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
