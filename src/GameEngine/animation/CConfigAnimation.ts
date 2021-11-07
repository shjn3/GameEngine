interface ICONFIGANIMATION {}
export default class CConfigAnimation implements ICONFIGANIMATION {
  repeat: number = -1;
  frameRate: number = 60;
  drawImage: any;
  mainFrame: number = 0;
  timer: number = 0;
  name: string = "";
  key: number = 0;

  constructor() {}
}
