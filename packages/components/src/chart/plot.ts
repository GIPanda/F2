import { mix } from '@antv/util';

interface Point {
  x: number;
  y: number;
}

class Plot {
  start: Point;
  end: Point;
  tl: Point;
  tr: Point;
  bl: Point;
  br: Point;

  width: number;
  height: number;

  constructor(cfg) {
    mix(this, cfg);
    this._init();
  }

  _init() {
    const self = this;
    const start = self.start;
    const end = self.end;
    const xMin = Math.min(start.x, end.x);
    const xMax = Math.max(start.x, end.x);
    const yMin = Math.min(start.y, end.y);
    const yMax = Math.max(start.y, end.y);

    this.tl = {
      x: xMin,
      y: yMin
    };
    this.tr = {
      x: xMax,
      y: yMin
    };
    this.bl = {
      x: xMin,
      y: yMax
    };
    this.br = {
      x: xMax,
      y: yMax
    };
    this.width = xMax - xMin;
    this.height = yMax - yMin;
  }

  /**
   * reset
   * @param  {Object} start start point
   * @param  {Object} end end point
   */
  reset(start, end) {
    this.start = start;
    this.end = end;
    this._init();
  }

  /**
   * check the point is in the range of plot
   * @param  {Number}  x x value
   * @param  {[type]}  y y value
   * @return {Boolean} return the result
   */
  isInRange(x, y) {
    // if (isObject(x)) {
    //   y = x.y;
    //   x = x.x;
    // }
    const tl = this.tl;
    const br = this.br;
    return tl.x <= x && x <= br.x && tl.y <= y && y <= br.y;
  }
}

export default Plot;
