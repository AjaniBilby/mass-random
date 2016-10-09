module.exports = {
  int: function (floor, ceil){
  	return Math.round( (Math.random() * (ceil-floor)) +floor);
  },
  float: function (floor, ceil){
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
  statistics: class{
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
  }
};

module.exports.statistics.prototype.randomItem = function(){
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

  var rand = module.exports.int(smallest, total);
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
};

module.exports.statistics.prototype.weightingCalculator = function(item){
  if (typeof(item) == 'number'){
    return item;
  }else{
    console.log('Unknow Statistics Item (Default Value: 1)');
    return 1;
  }
};
