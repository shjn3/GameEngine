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
var ImageSpriteObject_1 = require("../GameEngine/image/ImageSpriteObject");
var Scenes_1 = require("../GameEngine/scenes/Scenes");
var Rectangle_1 = require("../GameEngine/shape/Rectangle");
var Text_1 = require("../GameEngine/text/Text");
var ScenesOver = /** @class */ (function (_super) {
    __extends(ScenesOver, _super);
    function ScenesOver() {
        var _this = _super.call(this, "over") || this;
        _this.bgGameOver = new Rectangle_1["default"]();
        _this.btnRestart = new ImageSpriteObject_1["default"]();
        _this.txtGameOver = new ImageSpriteObject_1["default"]();
        _this.textScore = new Text_1["default"]();
        _this.textHeightScore = new Text_1["default"]();
        _this.score = 0;
        _this.heightScore = 0;
        return _this;
    }
    ScenesOver.prototype.init = function (data) {
        this.score = data.score;
        this.heightScore = data.heightScore;
    };
    ScenesOver.prototype.preload = function () {
        var frameInSprite = [
            {
                key: "btnRestart",
                sourcePosition: { x: 0, y: 0 },
                sourceSize: {
                    width: 75,
                    height: 70
                }
            },
            {
                key: "txtGameOver",
                sourcePosition: { x: 955, y: 25 },
                sourceSize: {
                    width: 380,
                    height: 30
                }
            },
        ];
        this.load.addConfigImageSprite("mainSprite", frameInSprite);
    };
    ScenesOver.prototype.create = function () {
        this.createBtnRestart();
        this.txtGameOver = this.add.imageSprite(250, 110, 270, 20, "mainSprite", "txtGameOver");
        this.createTextScore();
        this.createTextHeightScore();
        this.createEvent();
        this.bgGameOver = this.add.rectangular(0, 0, 800, 400, "rgba(0,0,0,.2)");
    };
    ScenesOver.prototype.createBtnRestart = function () {
        this.btnRestart = this.add.imageSprite(350, 150, 70, 60, "mainSprite", "btnRestart");
    };
    ScenesOver.prototype.createEvent = function () {
        var _this = this;
        this.input.onClick(function (e) {
            if (e.offsetX > 350 &&
                e.offsetX < 420 &&
                e.offsetY > 150 &&
                e.offsetY < 210) {
                _this.changeScenes("start");
            }
        });
    };
    ScenesOver.prototype.createTextScore = function () {
        this.textScore = this.add.text(300, 250, "Score: " + this.score + " ", "Arial", 20);
    };
    ScenesOver.prototype.createTextHeightScore = function () {
        this.textHeightScore = this.add.text(300, 280, "Hight Score: " + this.heightScore, "Arial", 20);
    };
    ScenesOver.prototype.update = function () { };
    return ScenesOver;
}(Scenes_1["default"]));
exports["default"] = ScenesOver;
