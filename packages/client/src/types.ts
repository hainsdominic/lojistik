export interface Item {
  _id: string;
  name: string;

  // Value of the item in $USD
  value: number;

  // Height of the item in centimeters
  height: number;

  // Width of the item in centimeters
  width: number;

  // Length of the item in centimeters
  length: number;

  // Weight of the item in grams
  weight: number;

  // Volume of the item in centimeters cube
  volume: number;
}
