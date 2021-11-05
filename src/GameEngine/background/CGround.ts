interface IGROUND {}
export default class CGround {
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  image: HTMLImageElement = new Image();
  sX: number = 0;
  sY: number = 0;
  sWidth: number = 0;
  sHeight: number = 0;
  isSprite: boolean = false;
  isDraw: boolean = false;
  repeat: number = 0;
  constructor() {}
}
