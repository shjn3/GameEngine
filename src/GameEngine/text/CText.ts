import CAdd from "../add/CAdd";
import CObject from "../base/CObject";
interface ITEXT {
  text: string;
  font: string;
  size: number;
  name: string;
  setText: (text: string) => void;
  setFont: (font: string) => void;
  setSize: (size: number) => void;
  setName: (name: string) => void;
  setIsVisible: (isVisible: boolean) => void;
  getText: () => string;
  getFont: () => string;
  getSize: () => number;
  getName: () => string;
  getIsVisible: () => boolean;
}

export default class CText extends CObject implements ITEXT {
  text: string = "";
  font: string = "Arial";
  size: number = 13;
  name: string = "";
  key: number = 0;
  isVisible: boolean = false;
  constructor() {
    super();
  }
  setIsVisible(isVisible: boolean) {
    this.isVisible = isVisible;
  }
  getIsVisible() {
    return this.isVisible;
  }
  destroy() {
    CAdd.arrText = CAdd.arrText.filter((_e) => _e.key === this.key);
  }
  setName(name: string) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
  setText(text: string) {
    this.text = text;
  }
  getText() {
    return this.text;
  }
  setFont(font: string) {
    this.font = font;
  }
  getFont() {
    return this.font;
  }
  setSize(size: number) {
    this.size = size;
  }
  getSize() {
    return this.size;
  }
}
