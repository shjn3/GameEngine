"use strict";
exports.__esModule = true;
var Game_1 = require("../game/Game");
var Add_1 = require("../add/Add");
var Rectangle_1 = require("../shape/Rectangle");
var Renderer = /** @class */ (function () {
    function Renderer() {
    }
    Renderer.prototype.render = function () {
        this.clearCtx();
        this.drawImage();
        this.drawImageFromSprite();
        this.drawImageAnimation();
        this.drawText();
        this.drawShape();
    };
    Renderer.prototype.drawImage = function () {
        if (Add_1["default"].SArrayDrawImage.length > 0) {
            Add_1["default"].SArrayDrawImage.forEach(function (_e) {
                if (_e.isVisible) {
                    var _image = _e.getImage(), _a = _e.getPosition(), x = _a.x, y = _a.y, width = _e.getWidth(), height = _e.getHeight();
                    Game_1["default"].SCtx.beginPath();
                    Game_1["default"].SCtx.drawImage(_image, x, y, width, height);
                }
            });
        }
    };
    Renderer.prototype.drawImageFromSprite = function () {
        if (Add_1["default"].SArrayDrawImageFromSprite.length > 0) {
            Add_1["default"].SArrayDrawImageFromSprite.forEach(function (_e) {
                if (_e.isVisible) {
                    var sourcePosition = _e.getSourcePosition(), sourceSize = _e.getSourceSize(), position = _e.getPosition(), size = _e.getSize(), image = _e.getImage();
                    Game_1["default"].SCtx.beginPath();
                    Game_1["default"].SCtx.drawImage(image, sourcePosition.x, sourcePosition.y, sourceSize.width, sourceSize.height, position.x, position.y, size.width, size.height);
                }
            });
        }
    };
    Renderer.prototype.drawImageAnimation = function () {
        if (Add_1["default"].SArrayDrawImageAnimation.length > 0) {
            Add_1["default"].SArrayDrawImageAnimation.forEach(function (_e) {
                if (_e.isVisible) {
                    var timer = _e.getTimer(), indexFrame = _e.getIndexFrame();
                    timer++;
                    if (timer > 1000 / _e.configAnimation.frameRate) {
                        timer = 0;
                        if (_e.configAnimation.frameInSpriteOfAnimation.length > 1) {
                            if (indexFrame + 1 ===
                                _e.configAnimation.frameInSpriteOfAnimation.length) {
                                _e.setIndexFrame(0);
                            }
                            else {
                                _e.setIndexFrame(indexFrame + 1);
                            }
                        }
                    }
                    _e.setTimer(timer);
                    var image = _e.configAnimation.image, sourcePosition = _e.configAnimation.frameInSpriteOfAnimation[_e.getIndexFrame()]
                        .sourcePosition, sourceSize = _e.configAnimation.frameInSpriteOfAnimation[_e.getIndexFrame()]
                        .sourceSize, position = _e.getPosition(), size = _e.getSize();
                    Game_1["default"].SCtx.drawImage(image, sourcePosition.x, sourcePosition.y, sourceSize.width, sourceSize.height, position.x, position.y, size.width, size.height);
                }
            });
        }
    };
    Renderer.prototype.drawText = function () {
        if (Add_1["default"].SArrayText.length > 0) {
            Add_1["default"].SArrayText.forEach(function (_e) {
                var text = _e.getText();
                var size = _e.getFontSize();
                var font = _e.getFontFamily();
                var _a = _e.getPosition(), x = _a.x, y = _a.y;
                Game_1["default"].SCtx.beginPath();
                Game_1["default"].SCtx.font = size + "px " + font;
                Game_1["default"].SCtx.fillText("" + text, x, y);
            });
        }
    };
    Renderer.prototype.drawShape = function () {
        if (Add_1["default"].SArrayShape.length > 0) {
            Add_1["default"].SArrayShape.forEach(function (_e) {
                if (_e instanceof Rectangle_1["default"]) {
                    if (_e.isVisible) {
                        var position = _e.getPosition(), size = _e.getSize();
                        Game_1["default"].SCtx.beginPath();
                        Game_1["default"].SCtx.fillStyle = _e.color;
                        Game_1["default"].SCtx.fillRect(position.x, position.y, size.width, size.height);
                        Game_1["default"].SCtx.fillStyle = "#000";
                    }
                }
            });
        }
    };
    Renderer.prototype.clearCtx = function () {
        Game_1["default"].SCtx.clearRect(0, 0, Game_1["default"].SCanvas.width, Game_1["default"].SCanvas.height);
    };
    return Renderer;
}());
exports["default"] = Renderer;
