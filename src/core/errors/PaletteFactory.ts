export class InvalidColorsQuantityError extends Error {
  constructor(colorsQuantity: number) {
    super(`Can't generate palette with ${colorsQuantity} colors`);
  }
}

export class InvalidParametersError extends Error {
  constructor() {
    super(`Invalid generation parameters`);
  }
}
