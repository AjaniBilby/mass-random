var random = require('../index.js');

function Clamp(value = 0.5, min = 0, max = 1, loop = false){
  if (value > max){
    if (loop){
      value = min;
    }else{
      value = max;
    }

  }else if(value < min){
    if (loop){
      value = max;
    }else{
      value = min;
    }
  }

  return value;
}

var statistics = new random.statistics({
  "Probably Day": {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 1,
    6: 1,
    7: 1,
    8: 1,
    9: 1,
    10: 1,
    11: 1,
    12: 1,
    13: 1,
    14: 1,
    15: 1,
    16: 1,
    17: 1,
    18: 1,
    19: 0,
    20: 0,
    21: 0,
    22: 0,
    23: 0
  },
  "Probably Night": {
    0: 1,
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 1,
    20: 1,
    21: 1,
    22: 1,
    23: 1
  }
});

statistics.weightingCalculator = function(item, name){

  var time = parseInt(Date().split(' ')[4].split(':')[0]); //Current Hour

  var value = item[Clamp(time+5, 0, 23, true)]/12 + item[Clamp(time+4, 0, 23, true)]/10 + item[Clamp(time+3, 0, 23, true)]/8 + item[Clamp(time+2, 0, 23, true)]/4 + item[Clamp(time+1, 0, 23, true)]/2;
  value += item[Clamp(time, 0, 23, true)];
  value += item[Clamp(time-1, 0, 23, true)]/2 + item[Clamp(time-2, 0, 23, true)]/4 + item[Clamp(time-3, 0, 23, true)]/8 + item[Clamp(time-4, 0, 23, true)]/10 + item[Clamp(time-5, 0, 23, true)]/12;

  console.log(name + ': ' + value);

  return value;
};

console.log(statistics.randomItem());
