import calorieCalc from './calorieCalc';

describe('calorieCalc', () => {
  it('uses the walking MET tier (7) below 7.5 km/h', () => {
    // round(10 * ((7 * 3.5 * 70) / 200)) = round(85.75) = 86
    expect(calorieCalc(7, 10, 70)).toBe(86);
  });

  it('uses the 8 MET tier between 7.5 and 9 km/h', () => {
    // round(10 * ((8 * 3.5 * 70) / 200)) = round(98) = 98
    expect(calorieCalc(8, 10, 70)).toBe(98);
  });

  it('uses the 10.5 MET tier between 9 and 12 km/h', () => {
    // round(10 * ((10.5 * 3.5 * 70) / 200)) = round(128.625) = 129
    expect(calorieCalc(10, 10, 70)).toBe(129);
  });

  it('uses the 13 MET tier at 12 km/h and above', () => {
    // round(10 * ((13 * 3.5 * 70) / 200)) = round(159.25) = 159
    expect(calorieCalc(12, 10, 70)).toBe(159);
  });

  it('returns 0 for a zero duration', () => {
    expect(calorieCalc(10, 0, 80)).toBe(0);
  });

  it('scales linearly with time', () => {
    expect(calorieCalc(8, 20, 70)).toBe(2 * calorieCalc(8, 10, 70));
  });
});
