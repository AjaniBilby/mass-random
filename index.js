class LCG{
  constructor(seed){
    this.m = 4294967296;
    this.a = 1664525;
    this.c = 1013904223;
    this.prev = Math.floor(Math.random() * this.m);
  }

  number(m, a, c, seed){
    if (typeof(m) != "number"){
      m = this.m;
    }
    if (typeof(a) != "number"){
      a = this.a;
    }
    if (typeof(c) != "number"){
      c = this.c;
    }
    if (typeof(seed) === "number"){
      this.prev = seed;
    }

    var num = (this.prev * a + c) % m;
    this.prev = num;
    return num;
  }

  seed(seed){
    if (typeof(seed) == "number"){
      this.prev = seed;
    }
  }
}
class StatRand{
  constructor(stats){
    this.stats = {};

    if ({}.toString.apply(stats) === '[object Array]'){
      for (let item of stats){
        if (typeof(this.stats[item]) != 'number'){
          this.stats[item] = 1;
        }else{
          this.stats[item] += 1;
        }
      }
    }else{
      for (let key in stats){
        if (typeof(this.stats[key]) != 'number'){
          this.stats[key] = stats[key];
        }else{
          this.stats[key] += stats[key];
        }
      }
    }
  }
  randomItem(){
    var weightings = {};

    //Get weightings
    for (let key in this.stats){
      weightings[key] = this.weightingCalculator(this.stats[key], key);
    }

    //Gather information
    var smallest = null;
    var total = 0;

    for (let stat in weightings){
      if (weightings[stat] < smallest || smallest === null){
        smallest = weightings[stat];
      }
      total += weightings[stat];
    }

    var rand = Math.round(( Math.random() * ( total-smallest )) + smallest );
    var runningTotal = 0;

    for (let stat in weightings){
      if (rand > runningTotal && rand <= (runningTotal + weightings[stat])){
        //If the random number is between the stat weightings
        return stat;
      }else{
        runningTotal += weightings[stat];
      }
    }

    return null;
  }
  weightingCalculator(item){
    if (typeof(item) == 'number'){
      return item;
    }else{
      console.log('Unknow Statistics Item (Default Value: 1)');
      return 1;
    }
  }
}
class WeightedRandom{
  constructor(stats){
    this.stats = {};

    if ({}.toString.apply(stats) === '[object Array]'){
      for (let item of stats){
        if (typeof(this.stats[item]) != 'number'){
          this.stats[item] = 1;
        }else{
          this.stats[item] += 1;
        }
      }
    }else{
      for (let key in stats){
        if (typeof(this.stats[key]) != 'number'){
          this.stats[key] = stats[key];
        }else{
          this.stats[key] += stats[key];
        }
      }
    }
  }
  number(){
    console.log(this.stats);

    /*--------------------------------------------------------------
        Get Title
    --------------------------------------------------------------*/
    var highest = null;
    var lowest = null;
    var total = 0;
    for (let key in this.stats){
      if (highest === null || this.stats[key] > highest){
        highest = this.stats[key];
      }
      if (lowest === null || this.stats[key] < lowest){
        lowest = this.stats[key];
      }

      total += this.stats[key] - 1; //Remove 1 because it will be added though the range
    }

    total += highest-lowest; //Add 1 for each number in range

    console.log('tot',total);



    /*--------------------------------------------------------------
        Get selector
    --------------------------------------------------------------*/
    var selector = Math.random() * total;
    var percent = 0;
    var option = null;
    var running = 0;

    for (let key in this.stats){
      if (selector < this.stats[key] && selector > running){
        option = key;
        percent = (selector % running) || 0;
        break;
      }

      running += this.stats[key];
    }

    console.log('Option', option, percent, selector);






    /*--------------------------------------------------------------
        Get Exact Value
    --------------------------------------------------------------*/
    var next = null;
    for (let key in this.stats){
      if (key > option && key < next){
        next = key;
      }
    }

    console.log('next', next);

    if (next === null || percent === 0){
      return option;
    }
  }
}

var lcg = new LCG();

module.exports = {
  classes: {
    LCG: LCG,
    StatRand: StatRand
  },
  int: function (floor, ceil){
    if (ceil === undefined && floor !== undefined){
      ceil = floor;
      floor = 0;
    }else if (ceil === undefined && floor === undefined){
      ceil = 1;
      floor = 0;
    }
  	return Math.round( (Math.random() * (ceil-floor)) +floor);
  },
  float: function (floor, ceil){
    if (ceil === undefined && floor !== undefined){
      ceil = floor;
      floor = 0;
    }else if (ceil === undefined && floor === undefined){
      ceil = 1;
      floor = 0;
    }

  	return (Math.random()*(ceil-floor)) + floor;
  },
  letter: function (number){
    if (typeof(number) != "number"){
      number = 1;
    }
    var string = "";
    for (var i=0; i<number; i++){
       var letter = ("abcdefghijklmnopqrstuvwxyz").charAt(module.exports.int(0, 26));
       if (module.exports.int(0,2) == 1){
         letter = letter.toUpperCase();
       }else{
         letter = letter.toLowerCase();
       }
       string += letter;
    }
    return string;
  },
  char: function(number){
    if (typeof(number) != 'number'){
      number = 1;
    }

    var string = '';
    for (let i=0; i<number; i++){
      string += String.fromCharCode(module.exports.int(1000000000));
    }

    return string;
  },
  string: function(length){
    if (typeof(length) != "number"){
      length = 0;
    }
    var string = "";
    for (var i=0; i<length; i++){
      if (module.exports.int(0,2) == 1){
        string += module.exports.int(0, 9);
      }else{
        string += module.exports.letter(1);
      }
    }
    return string;
  },
  statistics: StatRand,
  lcg: lcg,
  seeded: {
    int: function(floor, ceil, seed){
      if (ceil === undefined && floor !== undefined){
        ceil = floor;
        floor = 0;
      }else if (ceil === undefined && floor === undefined){
        ceil = 1;
        floor = 0;
      }

      var range = ceil - floor;

      return Math.floor((lcg.number(undefined, undefined, undefined, seed) / lcg.m * range) + floor );
    },
    float: function(floor, ceil, seed){
      if (ceil === undefined && floor !== undefined){
        ceil = floor;
        floor = 0;
      }else if (ceil === undefined && floor === undefined){
        ceil = 1;
        floor = 0;
      }

      var range = ceil - floor;

      return (lcg.number(undefined, undefined, undefined, seed) / lcg.m * range) + floor;
    },
    letter: function(number, seed){
      if (typeof(number) != "number"){
        number = 1;
      }
      if (typeof(seed) != "number"){
        seed = lcg.prev;
      }

      if (number < 2){
        var letter = ("abcdefghijklmnopqrstuvwxyz").charAt(module.exports.seeded.int(0, 26, seed));
        if (module.exports.seeded.int(0,2, seed) == 1){
          letter = letter.toUpperCase();
        }else{
          letter = letter.toLowerCase();
        }
        return letter;
      }

      var string = "";
      for (var i=0; i<number; i++){
         string += module.exports.seeded.letter(1, seed + i*lcg.a);
      }
      return string;
    },
    char: function(number, seed){
      if (typeof(number) != 'number'){
        number = 1;
      }
      if (typeof(seed) != 'number'){
        seed = lcg.prev;
      }

      var string = '';
      for (let i=0; i<number; i++){
        string += String.fromCharCode(module.exports.int(0, 1000000000, seed + i*lcg.a));
      }
      return string;
    },
    string: function(length, seed){
      if (typeof(length) != "number"){
        length = 1;
      }
      if (typeof(seed) != "number"){
        seed = lcg.prev;
      }

      var string = "";
      for (var i=0; i<length; i++){
        if (module.exports.seeded.int(0, 1, seed * lcg.a)){
          seed += 1;
          string += module.exports.seeded.int(0, 9, seed * lcg.a);
          seed += 1;
        }else{
          seed += 1;
          string += module.exports.seeded.letter(1, seed * lcg.a);
          seed += 1;
        }
      }

      return string;
    }
  }
};
