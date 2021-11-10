"use strict";
exports.__esModule = true;
var Renderer_1 = require("../renderer/Renderer");
var Game = /** @class */ (function () {
    function Game(config) {
        if (config === void 0) { config = {}; }
        this.renderer = new Renderer_1["default"]();
        var width = config.width, height = config.height, parent = config.parent, _a = config.scenes, scenes = _a === void 0 ? [] : _a, fps = config.fps;
        Game.SCanvas = document.querySelector("#" + parent + " canvas");
        Game.SCanvas.width = width;
        Game.SCanvas.height = height;
        Game.SCtx = Game.SCanvas.getContext("2d");
        if (scenes.length > 0) {
            scenes.forEach(function (_e) { return Game.SArrayScenes.push(new _e()); });
        }
        this.init();
    }
    Game.prototype.init = function () {
        Game.SArrayScenes[0].active();
        this.loop();
    };
    Game.prototype.loop = function () {
        var _this = this;
        Game.SArrayScenes[Game.SIndexScenesVisible].update();
        this.renderer.render();
        window.requestAnimationFrame(function () { return _this.loop(); });
    };
    Game.SFps = 60;
    Game.SArrayScenes = [];
    Game.SIndexScenesVisible = 0;
    return Game;
}());
exports["default"] = Game;
