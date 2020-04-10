import {Point} from "slate";

const PathSelect = {
  getLastPath: (path: Array<number>) => {
    let result = path.slice()
    result[result.length - 1] -= 1
    return result
  },
  getParentPath: (path: Array<number>) => {
    return path.slice(0, -1)
  },
  setOffset: (anchor: Point, offset: number) => {
    let result = JSON.parse(JSON.stringify(anchor)) as Point
    result.offset = offset
    return result
  }
}

export default PathSelect