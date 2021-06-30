export default function calorieCalc(speedMoy, time, poids){
  
  let MET = 0;
  if(speedMoy < 7.5){
    MET = 7;
  } else if (speedMoy < 9) {
    MET = 8;
  } else if (speedMoy < 12) {
    MET = 10.5;
  } else {
    MET = 13
  }
  return Math.round(time*((MET*3.5*poids)/200));
} 