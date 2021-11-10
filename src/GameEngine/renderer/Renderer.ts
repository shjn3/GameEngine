import Game from "../game/Game";
import Add from "../add/Add";
import Rectangle from "../shape/Rectangle";
export default class Renderer {
  constructor() {}
  render() {
    this.clearCtx();
    this.drawImage();
    this.drawImageFromSprite();
    this.drawImageAnimation();
    this.drawText();
    this.drawShape();
  }
  drawImage() {
    if (Add.SArrayDrawImage.length > 0) {
      Add.SArrayDrawImage.forEach((_e) => {
        if (_e.isVisible) {
          let _image = _e.getImage(),
            { x, y } = _e.getPosition(),
            width = _e.getWidth(),
            height = _e.getHeight();
          Game.SCtx.beginPath();
          Game.SCtx.drawImage(_image, x, y, width, height);
        }
      });
    }
  }
  drawImageFromSprite() {
    if (Add.SArrayDrawImageFromSprite.length > 0) {
      Add.SArrayDrawImageFromSprite.forEach((_e) => {
        if (_e.isVisible) {
          let sourcePosition = _e.getSourcePosition(),
            sourceSize = _e.getSourceSize(),
            position = _e.getPosition(),
            size = _e.getSize(),
            image = _e.getImage();
          Game.SCtx.beginPath();

          Game.SCtx.drawImage(
            image,
            sourcePosition.x,
            sourcePosition.y,
            sourceSize.width,
            sourceSize.height,
            position.x,
            position.y,
            size.width,
            size.height
          );
        }
      });
    }
  }
  drawImageAnimation() {
    if (Add.SArrayDrawImageAnimation.length > 0) {
      Add.SArrayDrawImageAnimation.forEach((_e) => {
        if (_e.isVisible) {
          let timer = _e.getTimer(),
            indexFrame = _e.getIndexFrame();
          timer++;
          if (timer > 1000 / _e.configAnimation.frameRate) {
            timer = 0;

            if (_e.configAnimation.frameInSpriteOfAnimation.length > 1) {
              if (
                indexFrame + 1 ===
                _e.configAnimation.frameInSpriteOfAnimation.length
              ) {
                _e.setIndexFrame(0);
              } else {
                _e.setIndexFrame(indexFrame + 1);
              }
            }
          }
          _e.setTimer(timer);
          let image = _e.configAnimation.image,
            sourcePosition =
              _e.configAnimation.frameInSpriteOfAnimation[_e.getIndexFrame()]
                .sourcePosition,
            sourceSize =
              _e.configAnimation.frameInSpriteOfAnimation[_e.getIndexFrame()]
                .sourceSize,
            position = _e.getPosition(),
            size = _e.getSize();
          Game.SCtx.drawImage(
            image,
            sourcePosition.x,
            sourcePosition.y,
            sourceSize.width,
            sourceSize.height,
            position.x,
            position.y,
            size.width,
            size.height
          );
        }
      });
    }
  }
  drawText() {
    if (Add.SArrayText.length > 0) {
      Add.SArrayText.forEach((_e) => {
        let text = _e.getText();
        let size = _e.getFontSize();
        let font = _e.getFontFamily();
        let { x, y } = _e.getPosition();
        Game.SCtx.beginPath();
        Game.SCtx.font = `${size}px ${font}`;
        Game.SCtx.fillText(`${text}`, x, y);
      });
    }
  }
  drawShape() {
    if (Add.SArrayShape.length > 0) {
      Add.SArrayShape.forEach((_e) => {
        if (_e instanceof Rectangle) {
          if (_e.isVisible) {
            let position = _e.getPosition(),
              size = _e.getSize();
            Game.SCtx.beginPath();
            Game.SCtx.fillStyle = _e.color;
            Game.SCtx.fillRect(position.x, position.y, size.width, size.height);
            Game.SCtx.fillStyle = "#000";
          }
        }
      });
    }
  }
  clearCtx() {
    Game.SCtx.clearRect(0, 0, Game.SCanvas.width, Game.SCanvas.height);
  }
}
