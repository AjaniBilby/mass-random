var random = require('../index.js');

var statistics = new random.statistics({
  "Probably Day": {
    0: 0.5,
    1: 0.5,
    2: 1,
    3: 1.5,
    4: 1.5,
    5: 1.5,
    6: 2,
    7: 2.5,
    8: 3,
    9: 3.5,
    10: 4,
    11: 5.5,
    12: 6,
    13: 5.5,
    14: 5,
    15: 4.5,
    16: 4.5,
    17: 4,
    18: 3.5,
    19: 3,
    20: 2.5,
    21: 2,
    22: 1.5,
    23: 1
  },
  "Probably Night": {
    0: 6,
    1: 6,
    2: 5.5,
    3: 5,
    4: 4.5,
    6: 4.5,
    7: 4,
    8: 3.5,
    9: 3,
    10: 2.5,
    11: 2,
    12: 1.5,
    13: 1,
    14: 1.5,
    15: 2,
    16: 2,
    17: 2.5,
    18: 3,
    19: 3.5,
    20: 4,
    21: 4.5,
    22: 5,
    23: 5.5
  }
});

statistics.weightingCalculator = function(item){

  var time = Date().split(' ')[4].split(':')[0]; //Current Hour

  var simple = false;
  //Simple is just to show  a basic way of useing this function.
  //Or you could read into the else statement for a more practical
  //use if say it was songs to play on a radio as the object keys in stead of a statement

  if (simple){
    return item[time];
  }else{
    var prevHour = time-1;
    //Loop time around
    if (prevHour < 0){
      prevHour = 23;
    }

    var nextHour = time+1;
    //Loop time around
    if (nextHour > 23){
      nextHour = 0;
    }

    return ((item[prevHour]/2) + (item[nextHour]/2) + item[time])/2;
    //The two hours on each side of the current time make up two halfs of a weighting
    //Then we add the current times weighting
    //Then devide that by 2 so it is equal to one weighting
  }
};

console.log(statistics.randomItem());
