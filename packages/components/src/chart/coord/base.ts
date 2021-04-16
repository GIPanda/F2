import F2 from '@antv/f2';
import { mix } from '@antv/util';

const { G } = F2;
const { Matrix: MatrixUtil, Vector2 } = G;

const defaultMatrix = [ 1, 0, 0, 1, 0, 0 ];

class Base {
  _initDefaultCfg() {}

  type: 'rect' | 'polar';
  transposed: boolean;

  plot: any;
  start: any;
  end: any;
  matrix: number[];
  center: any;
  scale: any;

  constructor(cfg) {
    this._initDefaultCfg();
    mix(this, cfg);

    let start;
    let end;
    if (this.plot) {
      start = this.plot.bl;
      end = this.plot.tr;
      this.start = start;
      this.end = end;
    } else {
      start = this.start;
      end = this.end;
    }
    this.init(start, end);
  }

  _scale(s1, s2) {
    const matrix = this.matrix;
    const center = this.center;
    MatrixUtil.translate(matrix, matrix, [ center.x, center.y ]);
    MatrixUtil.scale(matrix, matrix, [ s1, s2 ]);
    MatrixUtil.translate(matrix, matrix, [ -center.x, -center.y ]);
  }

  init(start, end) {
    this.matrix = [].concat(defaultMatrix);
    // 设置中心点
    this.center = {
      x: ((end.x - start.x) / 2) + start.x,
      y: (end.y - start.y) / 2 + start.y
    };
    if (this.scale) {
      this._scale(this.scale[0], this.scale[1]);
    }
  }

  convertPoint(point) {
    const { x, y } = this._convertPoint(point);
    if (!MatrixUtil.isChanged(this.matrix)) {
      return { x, y };
    }
    const vector = [ x, y ];
    Vector2.transformMat2d(vector, vector, this.matrix);

    return {
      x: vector[0],
      y: vector[1]
    };
  }

  invertPoint(point) {
    return this._invertPoint(point);
  }

  _convertPoint(point) {
    return point;
  }

  _invertPoint(point) {
    return point;
  }

  reset(plot) {
    this.plot = plot;
    const { bl, tr } = plot;
    this.start = bl;
    this.end = tr;
    this.init(bl, tr);
  }
}

export default Base;
