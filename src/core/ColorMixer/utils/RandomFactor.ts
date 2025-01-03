import { PercentLevel } from '../types.d';

export default class Factor {
  private _percentType: PercentLevel;
  private _dispersion: number = 1;

  public set percentType(value: PercentLevel) {
    this._percentType = value;
  }

  public set dispersion(value: number) {
    value = Math.abs(value);
    if (value > 1) {
      value = 1;
    }
    this._dispersion = value;
  }

  public get percentType() {
    return this._percentType;
  }

  public get dispersion() {
    return this._dispersion;
  }

  constructor(
    value: number = 1,
    percentType: PercentLevel = PercentLevel.MEDIUM,
  ) {
    this._percentType = percentType;

    value = Math.abs(value);
    if (value > 1) {
      value = 1;
    }
    this._dispersion = Math.abs(value);
  }

  public get() {
    if (this._dispersion > 1) {
      this._dispersion = 1;
    }

    let min = 0;

    switch (this._percentType) {
      case PercentLevel.HIGH:
        min = 1 - this._dispersion;
        break;
      case PercentLevel.MEDIUM:
        min = (1 - this._dispersion) / 2;
        break;
      case PercentLevel.LOW:
        min = 0;
        break;
      case PercentLevel.ABSOLUTE:
        return this._dispersion;
    }
    return Math.random() * this._dispersion + min;
  }
}
