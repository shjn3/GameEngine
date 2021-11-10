import ScenesStart from "./ScenesStart";
import ScenesPlay from "./ScenesPlay";
import ScenesOver from "./ScenesOver";
let config = {
  width: 800,
  height: 400,
  parent: "parentCanvas",
  fps: 60,
  scenes: [ScenesStart, ScenesPlay, ScenesOver],
};

export { config };
