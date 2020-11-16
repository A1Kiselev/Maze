export default class Point{
  constructor(x,y,prev) {
    this._x = x;
    this._y = y;
    this._prev = prev;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get prev() {
    return this._prev;
  }

  compare(point2){
    const compareByX = this._x === point2.x;
    const compareByY = this._y === point2.y;
    return compareByX && compareByY;
  }
}

