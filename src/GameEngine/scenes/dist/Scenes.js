"use strict";
exports.__esModule = true;
var Load_1 = require("../load/Load");
var Add_1 = require("../add/Add");
var Animation_1 = require("../animation/Animation");
var Input_1 = require("../input/Input");
var Game_1 = require("../game/Game");
var Scenes = /** @class */ (function () {
    // isActive: boolean = false;
    function Scenes(nameScenes) {
        if (nameScenes === void 0) { nameScenes = ""; }
        this.load = new Load_1["default"]();
        this.add = new Add_1["default"]();
        this.animation = new Animation_1["default"]();
        this.input = new Input_1["default"]();
        this.idRequestAnimation = 0;
        this.nameScenes = nameScenes;
        this.preload();
    }
    Scenes.prototype.init = function (data) { };
    //use method when scenes active
    Scenes.prototype.active = function () {
        this.create();
    };
    Scenes.prototype.preload = function () { };
    Scenes.prototype.create = function () { };
    Scenes.prototype.update = function () { };
    Scenes.prototype.collectionDetection = function (player, obstacles) {
        if (player && obstacles) {
            var playerSize = player.getSize(), playerPosition = player.getPosition(), obstaclesSize = obstacles.getSize(), obstaclesPosition = obstacles.getPosition();
            if (playerPosition.x < obstaclesPosition.x + obstaclesSize.width &&
                playerPosition.x + playerSize.width > obstaclesPosition.x &&
                playerPosition.y < obstaclesPosition.y + obstaclesSize.height &&
                playerPosition.y + playerSize.height > obstaclesPosition.y) {
                return true;
            }
        }
        return false;
    };
    Scenes.prototype.changeScenes = function (name, data, reset) {
        var _this = this;
        if (reset === void 0) { reset = true; }
        if (Game_1["default"].SArrayScenes.length > 1) {
            Game_1["default"].SArrayScenes.forEach(function (_e, index) {
                if (_e.nameScenes === name) {
                    if (Game_1["default"].SIndexScenesVisible === index) {
                        return;
                    }
                    else {
                        if (reset) {
                            Add_1["default"].SArrayDrawImageAnimation = [];
                            Add_1["default"].SArrayDrawImageFromSprite = [];
                            Add_1["default"].SArrayDrawImage = [];
                            Add_1["default"].SArrayShape = [];
                            Add_1["default"].SArrayText = [];
                            Animation_1["default"].SArrayConfigAnimation = [];
                        }
                        Game_1["default"].SIndexScenesVisible = index;
                        _this.input.destroy();
                        if (data) {
                            _e.init(data);
                        }
                        _e.active();
                        return;
                    }
                }
            });
        }
    };
    return Scenes;
}());
exports["default"] = Scenes;
