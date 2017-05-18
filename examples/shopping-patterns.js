var random = require('../index.js');

var items = {
  0: 'milk',
  1: 'bread',
  3: 'beef',
  4: 'honey',
  5: 'glue'
};

var references = {};
for (let key in items){
  references[key] = {};
  for (let other in items){
    references[key][other] = 1;
  }
}

var cart = {
  0: true,
  3: true
};

var statistics = new random.statistics(references);
statistics.weightingCalculator = function(item, name){
  var tally = 0;
  for (let id in item){
    tally += (cart[id] * item[id]) || 0;
  }

  return tally;
};

function GenerateAdFromPurches(items){
  cart = {};
  for (let item of items){
    cart[item] = true;
  }


}

console.log(items[statistics.randomItem()]);
