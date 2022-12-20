import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MathService {
  geometricMeanArray: number[] = [];
  weightsArray: number[] = [];

  public weightCalculation(matrix: any[], vectorLength: number): number[] {
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

  public computeConsistencyRatio(matrix: any[], vector: number[]): number {
    let eigenVector: number[] = [];
    let principalEigenValue: number = 0;
    for (let i = 0; i < vector.length; i++) {
      let value = 0;
      for (let j = 0; j < vector.length; j++) {
        value += matrix[i][j] * vector[j];
      }
      eigenVector[i] = value;
    }
    for (let i = 0; i < vector.length; i++) {
      eigenVector[i] = eigenVector[i] / vector[i];
      principalEigenValue += eigenVector[i];
    }
    principalEigenValue = principalEigenValue / vector.length;
    const consistencyIndex =
      (principalEigenValue - vector.length) / (vector.length - 1);
    const randomMatrixConsistencyRatio = this.getRandomMatrixConsistencyRatio(
      vector.length
    );
    const consistencyRatio = consistencyIndex / randomMatrixConsistencyRatio;
    return consistencyRatio;
  }

  private getRandomMatrixConsistencyRatio(vectorLength: number): number {
    let result = 0;
    switch (vectorLength) {
      case 1:
        result = 0;
        break;
      case 2:
        result = 0;
        break;
      case 3:
        result = 0.58;
        break;
      case 4:
        result = 0.9;
        break;
      case 5:
        result = 1.12;
        break;
      case 6:
        result = 1.24;
        break;
      case 7:
        result = 1.32;
        break;
      case 8:
        result = 1.41;
        break;
      case 9:
        result = 1.45;
        break;
      case 10:
        result = 1.49;
        break;
      case 11:
        result = 1.51;
        break;
      case 12:
        result = 1.48;
        break;
      case 13:
        result = 1.56;
        break;
      case 14:
        result = 1.57;
        break;
      case 15:
        result = 1.59;
        break;
      case 16:
        result = 1.605;
        break;
      case 17:
        result = 1.61;
        break;
      case 18:
        result = 1.615;
        break;
      case 19:
        result = 1.62;
        break;
      case 20:
        result = 1.625;
        break;
    }
    return result;
  }
}
