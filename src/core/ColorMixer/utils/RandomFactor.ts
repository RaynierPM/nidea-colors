export default class Factor {
  private _min: number;
  private _max: number;

  constructor(min: number, max: number) {
    this._min = min;
    this._max = max;
  }

  public get minMax() {
    return [this._min, this._max];
  }

  get min() {
    return this._min;
  }

  get max() {
    return this._max;
  }

  get range() {
    return this._max - this._min;
  }

  get() {
    return Math.random() * (this._max - this._min) + this._min;
  }
}
