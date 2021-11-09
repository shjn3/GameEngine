import Add from "../add/Add";
import type { IPosition } from "../utils/type";

interface IText {
  position: IPosition;
  text: string;
  fontFamily: string;
  fontSize: number;
  key: number;
  isVisible: boolean;
  setKey(key: number): void;
  getKey(): number;

  setPosition(x: number, y: number): void;
  getPosition(): IPosition;

  setIsVisible(isVisible: boolean): void;
  getIsVisible(): boolean;

  setText(text: string): void;
  getText(): string;

  setFontFamily(fontFamily: string): void;
  getFontFamily(): string;

  setFontSize(size: number): void;
  getFontSize(): number;

  destroy(): void;
}

export default class Text implements IText {
  position: IPosition = { x: 0, y: 0 };
  text: string = "";
  fontFamily: string = "Arial";
  fontSize: number = 13;
  key: number = Math.floor(Math.random() * Date.now());
  isVisible: boolean = false;
  constructor() {}

  setKey(key: number) {
    this.key = key;
  }
  getKey() {
    return this.key;
  }

  setPosition(x: number, y: number) {
    this.position = { x, y };
  }
  getPosition() {
    return this.position;
  }

  setIsVisible(isVisible: boolean) {
    this.isVisible = isVisible;
  }
  getIsVisible() {
    return this.isVisible;
  }

  setText(text: string) {
    this.text = text;
  }
  getText() {
    return this.text;
  }

  setFontFamily(fontFamily: string) {
    this.fontFamily = fontFamily;
  }
  getFontFamily() {
    return this.fontFamily;
  }

  setFontSize(size: number) {
    this.fontSize = size;
  }
  getFontSize() {
    return this.fontSize;
  }

  destroy() {
    Add.SArrayText = Add.SArrayText.filter((_e) => _e.key === this.key);
  }
}
