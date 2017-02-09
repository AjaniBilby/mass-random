A quick and easy library that allows you to get random letters, ints, floats, strings, and also a random item from statistics.

___
# Setup

```
var random = require("mass-random");
```

___

# Basics


## int(min, max)
Will return a random integer between min and max.  
**Note**: if only min is inputted min acts as max and min is equal to 0.

## float(min, max)  
Will return a random float between min and max.
**Note**: if only min is inputted min acts as max and min is equal to 0.

## letter(numberOfLetters)
Will return a random letter/s.

## string(lengthOfString)
Will return a random string of letters and numbers to the length inputted.

## char(lengthOfString)
Will return a random string of characters (including symbols).

___
# Seeded

All are the same as "Basics" but they are in the seeded object and have a final parameter added called seed, of which can be left blank
**Example**
```
  //Between 0 and 10 with a seed of 5
  random.seeded.int(0, 10, 5)
```

___
# Stats

## Random Item from stats  
```
  var stats = new random.statistics({
    bannana: 1,
    apple: 1
  });
  //or
  var stats = new random.statistics(['bannana', 'apple']);

  //There will be an equal chance that the item will be a banana or an apple
  var randomItem = stats.randomItem();

  //Increase the weighting of the bannana by one, so it is now double the weighting of an apple. (because default weighting of a item is 1)
  stats.stats.bannana += 1;

  //Now there will be double the chance that there will be a bannana than a apple
  var randomItem = stats.randomItem();

```

## Random Item from stats with dynamic weighting  
```
  var random = require('mass-random');

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
      2: 4.5,
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
```
