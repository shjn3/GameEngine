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
  getText: () => string;
  getFont: () => string;
  getSize: () => number;
  getName: () => string;
}

export default class CText extends CObject implements ITEXT {
  text: string = "";
  font: string = "Arial";
  size: number = 13;
  name: string = "";
  key: number = 0;
  constructor() {
    super();
  }
  destroy() {
    let lenArrText = CAdd.arrText.length;
    if (lenArrText > 0) {
      for (let i = 0; i < lenArrText; i++) {
        if (CAdd.arrText[i].key === this.key) {
          CAdd.arrText.splice(i, i + 1);
          break;
        }
      }
    }
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
