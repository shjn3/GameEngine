export interface vector {
  x: number;
  y: number;
}

export interface IFRAMEINSPRITE {
  key: string;
  sPosition: vector;
  sWidth: number;
  sHeight: number;
}

export interface ICONFIGANIMATION {
  key: string;
  frames: Array<string>;
  frameRate: number;
  repeat: number;
}
export interface IDRAWSINGLEANIMATION {
  image: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
  frameInSprite: IFRAMEINSPRITE;
  frames: Array<IFRAMEINSPRITE>;
}
