import { TNegativeDeltaResponse, TPositiveDeltaResponse } from "./TSecondDegreeEqHelper";

class SecondDegreeEqHelper {
  private calcDelta(a: number, b: number, c: number) {
    return b ** 2 - 4 * a * c;
  }

  private calcBaskhara(a: number, b: number, delta: number) {
    return [
      (-b + Math.sqrt(delta)) / (2 * a),
      (-b - Math.sqrt(delta)) / (2 * a),
    ];
  }

  public calculate(a: number, b: number, c: number) {
    if (a == 0) {
      throw new Error("Não existe solução geral");
    }

    b = b / a;
    c = c / a;
    a = a / a;
    const delta = this.calcDelta(a, b, c);

    if (delta >= 0) {
      const lambdas = this.calcBaskhara(a, b, delta);
      return { lambdas, a, b, c, delta } as TPositiveDeltaResponse;
    }

    const opositeCatet = Math.sqrt(Math.abs(delta)) / 2;
    const adjascentCatet = (-1 * b) / 2;

    const p = Math.sqrt(opositeCatet ** 2 + adjascentCatet ** 2);
    const angleRadians = Math.atan(opositeCatet / adjascentCatet);
    const angleDegree = angleRadians * (180 / Math.PI);

    return { p, angle: angleDegree, a, b, c, delta } as TNegativeDeltaResponse;
  }
}

export default new SecondDegreeEqHelper();
