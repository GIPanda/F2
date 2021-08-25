import Coord, { Rect } from '../coord';
import { isFunction } from '@antv/util';

class CoordAvailable {
  createCoord(cfg, layout): Coord {
    if (isFunction(cfg)) {
      cfg = {
        type: cfg,
      };
    }
    const coordCfg = {
      // 默认直角坐标系
      type: Rect,
      ...layout,
      ...cfg,
    }
    const { type, ...option } = coordCfg;
    const coord = new type(option);
    return coord;
  }
}

export default CoordAvailable;
