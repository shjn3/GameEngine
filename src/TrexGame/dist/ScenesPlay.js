"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Scenes_1 = require("../GameEngine/scenes/Scenes");
var ImageObject_1 = require("../GameEngine/image/ImageObject");
var Text_1 = require("../GameEngine/text/Text");
var ImageAnimationObject_1 = require("../GameEngine/image/ImageAnimationObject");
var ScenesPlay = /** @class */ (function (_super) {
    __extends(ScenesPlay, _super);
    function ScenesPlay() {
        var _this = _super.call(this, "play") || this;
        _this.btnStart = new ImageObject_1["default"]();
        _this.timer = 0;
        _this.velocity = -3;
        _this.jumpVelocity = -13;
        _this.textScore = new Text_1["default"]();
        _this.textHightScore = new Text_1["default"]();
        _this.heightScore = 0;
        _this.score = 0;
        _this.gameOver = false;
        _this.player = new ImageAnimationObject_1["default"]();
        _this.maxCloud = 6;
        _this.arrCloud = [];
        _this.obstaclesCactus = [];
        _this.obstaclesPTerodactyl = [];
        _this.arrGround = [];
        _this.arrayUnitScore = [];
        _this.arrayUnitHeightScore = [];
        return _this;
    }
    ScenesPlay.prototype.preload = function () {
        var frameCloud = [
            {
                key: "cloud",
                sourcePosition: { x: 165, y: 0 },
                sourceSize: {
                    width: 100,
                    height: 30
                }
            },
        ];
        var framePlayer = [
            {
                key: "run1",
                sourcePosition: { x: 1511, y: 0 },
                sourceSize: {
                    width: 95,
                    height: 110
                }
            },
            {
                key: "run2",
                sourcePosition: { x: 1599, y: 0 },
                sourceSize: {
                    width: 95,
                    height: 110
                }
            },
            {
                key: "duck1",
                sourcePosition: { x: 1862, y: 0 },
                sourceSize: {
                    width: 120,
                    height: 90
                }
            },
            //cw: 70, ch: 58, cY: 320 cX:15
            {
                key: "duck2",
                sourcePosition: { x: 1982, y: 0 },
                sourceSize: {
                    width: 120,
                    height: 90
                }
            },
            //cw: 60, ch:70, cY: 320 cx: 15
            {
                key: "jump",
                sourcePosition: { x: 1335, y: 0 },
                sourceSize: {
                    width: 95,
                    height: 110
                }
            },
            {
                key: "die",
                sourcePosition: { x: 1335, y: 0 },
                sourceSize: {
                    width: 95,
                    height: 110
                }
            },
        ];
        var frameObstacles = [
            {
                key: "cactusSmall",
                sourcePosition: { x: 616, y: 0 },
                sourceSize: {
                    width: 34,
                    height: 70
                }
            },
            {
                key: "cactusLarge",
                sourcePosition: { x: 650, y: 0 },
                sourceSize: {
                    width: 50,
                    height: 80
                }
            },
            {
                key: "PTerodactyl1",
                sourcePosition: { x: 260, y: 0 },
                sourceSize: {
                    width: 90,
                    height: 70
                }
            },
            {
                key: "PTerodactyl2",
                sourcePosition: { x: 350, y: 0 },
                sourceSize: {
                    width: 90,
                    height: 70
                }
            },
        ];
        var frameNumber = [
            {
                key: "numberZero",
                sourcePosition: { x: 952, y: 0 },
                sourceSize: {
                    width: 20,
                    height: 25
                }
            },
            {
                key: "HI",
                sourcePosition: { x: 1152, y: 0 },
                sourceSize: {
                    width: 40,
                    height: 25
                }
            },
        ];
        this.load.addConfigImageSprite("mainSprite", framePlayer);
        this.load.addConfigImageSprite("mainSprite", frameObstacles);
        this.load.addConfigImageSprite("mainSprite", frameCloud);
        this.load.addConfigImageSprite("mainSprite", frameNumber);
    };
    ScenesPlay.prototype.create = function () {
        this.createGround();
        //draw Animation
        this.createPlayer();
        //draw Obstacles
        this.createObstacles();
        this.createHeightScore();
        // this.createTextScore();
        this.createScore();
        this.createEvent();
    };
    ScenesPlay.prototype.createScore = function () {
        for (var i = 0; i < 5; i++) {
            this.arrayUnitScore.push(this.add.imageSprite(700 + 20 * i, 20, 15, 15, "mainSprite", "numberZero"));
        }
    };
    ScenesPlay.prototype.createHeightScore = function () {
        console.log(this.heightScore);
        this.add.imageSprite(510, 20, 30, 15, "mainSprite", "HI");
        for (var i = 0; i < 5; i++) {
            this.arrayUnitHeightScore.push(this.add.imageSprite(550 + 20 * i, 20, 15, 15, "mainSprite", "numberZero"));
        }
        this.updateUnit(this.heightScore, this.arrayUnitHeightScore);
    };
    ScenesPlay.prototype.createTextScore = function () {
        this.textScore = this.add.text(600, 30, "Score: 0", "Arial", 20);
        this.textHightScore = this.add.text(600, 60, "Hight Score: " + this.heightScore, "Arial", 20);
    };
    ScenesPlay.prototype.createGround = function () {
        this.arrGround.push(this.add.imageSprite(0, 320, 1600, 30, "mainSprite", "ground"));
        this.arrGround.push(this.add.imageSprite(1600, 320, 1600, 30, "mainSprite", "ground"));
    };
    ScenesPlay.prototype.createPlayer = function () {
        this.player = this.add.spriteSheet(15, 290, 60, 70);
        var configRunPlayer = {
            key: "RunPlayer",
            frames: {
                nameImage: "mainSprite",
                frames: ["run1", "run2"]
            },
            frameRate: 60
        };
        var configDuckPlayer = {
            key: "DuckPlayer",
            frames: {
                nameImage: "mainSprite",
                frames: ["duck1", "duck2"]
            },
            frameRate: 60
        };
        var configJumpPlayer = {
            key: "JumpPlayer",
            frames: {
                nameImage: "mainSprite",
                frames: ["jump"]
            },
            frameRate: 60
        };
        var configDiePlayer = {
            key: "DiePlayer",
            frames: {
                nameImage: "mainSprite",
                frames: ["die"]
            },
            frameRate: 60
        };
        this.animation.create(configRunPlayer);
        this.animation.create(configDuckPlayer);
        this.animation.create(configJumpPlayer);
        this.animation.create(configDiePlayer);
        this.player.play("RunPlayer");
    };
    ScenesPlay.prototype.createEvent = function () {
        var _this = this;
        //add event
        this.input.keydown(" ", function () {
            if (_this.player.nameAnimation === "RunPlayer")
                _this.player.play("JumpPlayer");
        });
        this.input.keydown("ArrowUp", function () {
            if (_this.player.nameAnimation === "RunPlayer")
                _this.player.play("JumpPlayer");
        });
        this.input.keydown("ArrowDown", function () {
            if (_this.player.nameAnimation === "RunPlayer") {
                _this.player.getPosition().y = 295;
                _this.player.getSize().width = 70;
                _this.player.getSize().height = 55;
                _this.player.play("DuckPlayer");
            }
        });
        this.input.keyup("ArrowDown", function () {
            if (_this.player.nameAnimation === "DuckPlayer") {
                _this.player.getPosition().y = 290;
                _this.player.getSize().width = 60;
                _this.player.getSize().height = 70;
                _this.player.play("RunPlayer");
            }
        });
    };
    ScenesPlay.prototype.createObstacles = function () {
        var configObstaclesPterodactyl = {
            key: "PTerodactyl",
            frames: {
                nameImage: "mainSprite",
                frames: ["PTerodactyl1", "PTerodactyl2"]
            },
            frameRate: 30
        };
        var configObstaclesPterodactylOver = {
            key: "PTerodactylOver",
            frames: {
                nameImage: "mainSprite",
                frames: ["PTerodactyl1"]
            },
            frameRate: 30
        };
        this.animation.create(configObstaclesPterodactyl);
        this.animation.create(configObstaclesPterodactylOver);
    };
    //======================================== update
    ScenesPlay.prototype.update = function () {
        if (!this.gameOver) {
            this.updateGround();
            this.updateObstacles();
            this.updateCloud();
            this.updatePlayerJump();
            this.updateScoreValue();
            this.updateUnit(this.score, this.arrayUnitScore);
            this.handleCollision();
        }
        else {
            this.updateOverGame();
        }
    };
    ScenesPlay.prototype.updateHeightScore = function () { };
    ScenesPlay.prototype.updateUnit = function (valueScore, arrayScore) {
        var temp = valueScore.toString().split("");
        var lengthTemp = temp.length;
        for (var i = 0; i < lengthTemp - 1; i++) {
            arrayScore[i].setSourcePositionX(952);
        }
        for (var i = 5 - lengthTemp; i < 5; i++) {
            arrayScore[i].setSourcePositionX(952 + 20 * parseInt(temp[-5 + i + lengthTemp]));
        }
    };
    ScenesPlay.prototype.updateOverGame = function () {
        this.updateHeightScoreValue();
        this.changeScenes("over", {
            score: this.score,
            heightScore: this.heightScore
        });
        this.gameOver = false;
        this.arrCloud = [];
        this.arrGround = [];
        this.obstaclesPTerodactyl = [];
        this.obstaclesCactus = [];
        this.arrayUnitHeightScore = [];
        this.arrayUnitScore = [];
        this.score = 0;
        this.timer = 0;
    };
    ScenesPlay.prototype.updateGround = function () {
        if (this.arrGround.length > 0) {
            this.arrGround[0].getPosition().x += this.velocity;
            this.arrGround[1].getPosition().x += this.velocity;
            if (this.arrGround[0].getPosition().x < -1600) {
                this.arrGround[0].destroy();
                this.arrGround.splice(0, 1);
                this.arrGround.push(this.add.imageSprite(1600, 320, 1600, 30, "mainSprite", "ground"));
            }
        }
    };
    ScenesPlay.prototype.updateHeightScoreValue = function () {
        this.heightScore = Math.max(this.heightScore, this.score);
        this.textHightScore.setText("Hight Score: " + this.heightScore);
    };
    ScenesPlay.prototype.updateScoreValue = function () {
        this.timer++;
        if (this.timer > 50) {
            this.timer = 0;
            this.score++;
            this.textScore.setText("Score: " + this.score);
        }
    };
    //update Obstacles
    ScenesPlay.prototype.updateObstacles = function () {
        this.updatePositionObstacles();
        var getSumPositionAndWidthLastObstacles = this.getSumPositionAndWidthLastObstacles();
        var randomGap = this.getRandom(300, 600);
        if (getSumPositionAndWidthLastObstacles + randomGap < 800) {
            var randomType = this.getRandom(1, 2); //1 cactus 2 pterodactyl
            switch (randomType) {
                case 1:
                    var randomSize = this.getRandom(2, 3);
                    if (randomSize === 1) {
                        this.obstaclesCactus.push(this.add.imageSprite(800, 295, 30, 45, "mainSprite", "cactusSmall"));
                    }
                    else {
                        this.obstaclesCactus.push(this.add.imageSprite(800, 285, 30, 60, "mainSprite", "cactusLarge"));
                    }
                    break;
                case 2:
                    var positionYPterodactyl = [290, 265, 240];
                    var randomIndex = this.getRandom(0, 2);
                    this.obstaclesPTerodactyl.push(this.add.spriteSheet(800, positionYPterodactyl[randomIndex], 50, 30));
                    this.obstaclesPTerodactyl[this.obstaclesPTerodactyl.length - 1].play("PTerodactyl");
                    break;
            }
        }
        this.decreaseObstacles();
    };
    ScenesPlay.prototype.getSumPositionAndWidthLastObstacles = function () {
        var lengthCactus = this.obstaclesCactus.length;
        var lengthPterodactyl = this.obstaclesPTerodactyl.length;
        if (lengthCactus > 0 && lengthPterodactyl > 0) {
            return Math.max(this.obstaclesCactus[lengthCactus - 1].getPosition().x +
                this.obstaclesCactus[lengthCactus - 1].getSize().width, this.obstaclesPTerodactyl[lengthPterodactyl - 1].getPosition().x +
                this.obstaclesPTerodactyl[lengthPterodactyl - 1].getSize().width);
        }
        else if (lengthCactus > 0 && lengthPterodactyl === 0) {
            return (this.obstaclesCactus[lengthCactus - 1].getPosition().x +
                this.obstaclesCactus[lengthCactus - 1].getSize().width);
        }
        else if (lengthCactus === 0 && lengthPterodactyl > 0) {
            return (this.obstaclesPTerodactyl[lengthPterodactyl - 1].getPosition().x +
                this.obstaclesPTerodactyl[lengthPterodactyl - 1].getSize().width);
        }
        return 0;
    };
    ScenesPlay.prototype.decreaseObstacles = function () {
        if (this.obstaclesCactus.length > 0) {
            if (this.obstaclesCactus[0].getPosition().x +
                this.obstaclesCactus[0].size.width <
                0) {
                this.obstaclesCactus[0].destroy();
                this.obstaclesCactus.splice(0, 1);
            }
        }
        if (this.obstaclesPTerodactyl.length > 0) {
            if (this.obstaclesPTerodactyl[0].getPosition().x +
                this.obstaclesPTerodactyl[0].getSize().width <
                0) {
                this.obstaclesPTerodactyl[0].destroy();
                this.obstaclesPTerodactyl.splice(0, 1);
            }
        }
    };
    ScenesPlay.prototype.updatePositionObstacles = function () {
        var _this = this;
        var lengthCactus = this.obstaclesCactus.length;
        var lengthPterodactyl = this.obstaclesPTerodactyl.length;
        if (lengthCactus > 0) {
            this.obstaclesCactus.forEach(function (_e) {
                return _e.setPositionX(_this.velocity + _e.getPositionX());
            });
        }
        if (lengthPterodactyl > 0) {
            this.obstaclesPTerodactyl.forEach(function (_e) {
                return _e.setPositionX(_this.velocity - 1 + _e.getPositionX());
            });
        }
    };
    //update Player Jump
    ScenesPlay.prototype.updatePlayerJump = function () {
        if (this.player.getNameAnimation() === "JumpPlayer") {
            this.jumpVelocity += 0.3 * 1.1;
            this.player.getPosition().y += this.jumpVelocity;
            if (this.player.getPosition().y > 290) {
                this.jumpVelocity = -13;
                this.player.getPosition().y = 290;
                this.player.play("RunPlayer");
            }
        }
    };
    ScenesPlay.prototype.updateCloud = function () {
        var _this = this;
        if (this.arrCloud.length > 0) {
            this.arrCloud.forEach(function (_e) { return (_e.position.x += _this.velocity); });
            if (this.arrCloud.length < this.maxCloud &&
                this.arrCloud[this.arrCloud.length - 1].position.x +
                    this.arrCloud[this.arrCloud.length - 1].size.width <
                    this.getRandom(500, 800)) {
                var width = this.getRandom(40, 100);
                var y = this.getRandom(40, 250);
                var _cloud = this.add.imageSprite(800, y, width, width / 1.5, "mainSprite", "cloud");
                this.arrCloud.push(_cloud);
            }
            if (this.arrCloud[0].position.x + this.arrCloud[0].size.width < 0) {
                this.arrCloud[0].destroy();
                this.arrCloud.splice(0, 1);
            }
        }
        else {
            var width = this.getRandom(40, 100);
            var y = this.getRandom(40, 250);
            var _cloud = this.add.imageSprite(800, y, width, width / 1.5, "mainSprite", "cloud");
            this.arrCloud.push(_cloud);
        }
    };
    ScenesPlay.prototype.handleCollision = function () {
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
    };
    ScenesPlay.prototype.getRandom = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return ScenesPlay;
}(Scenes_1["default"]));
exports["default"] = ScenesPlay;
