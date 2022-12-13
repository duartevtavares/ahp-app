import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MathService {
  geometricMeanArray: number[] = [];
  weightsArray: number[] = [];

  weightCalculation(matrix: any[], vectorLength: number) {
    for (let i = 0; i < vectorLength; i++) {
      let helperValue = 1;
      for (let j = 0; j < vectorLength; j++) {
        helperValue = matrix[i][j] * helperValue;
      }
      this.geometricMeanArray[i] = Math.pow(helperValue, 1 / vectorLength);
    }

    for (let i = 0; i < this.geometricMeanArray.length; i++) {
      let helperValue = 0;
      for (let j = 0; j < this.geometricMeanArray.length; j++) {
        helperValue += this.geometricMeanArray[j];
      }
      this.weightsArray[i] = this.geometricMeanArray[i] / helperValue;
    }

    return this.weightsArray;
  }
}
