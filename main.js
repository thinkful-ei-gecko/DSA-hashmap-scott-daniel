const HashMap = require('./Hashmap');

const WhatDoesThisDo = function(){
  // sets str1 and str2 to the same thing
  let str1 = 'Hello World.';
  let str2 = 'Hello World.';
  let map1 = new HashMap();
  // set key to Hello World. and value to 10
  map1.set(str1,10);
  // key already exists, so we overwrite
  map1.set(str2,20);
  let map2 = new HashMap();
  // set str3 and str4 to same thing as above
  let str3 = str1;
  let str4 = str2;
  // set key to Hello World. and value to 20
  map2.set(str3,20);
  // key already exists so overwrite value
  map2.set(str4,10);

  // log 20
  console.log(map1.get(str1));
  // log 10
  console.log(map2.get(str3));
}

const main = () => {

  let lotr = new HashMap();
  lotr.set('Hobbit', 'Bilbo');
  lotr.set('Hobbit', 'Frodo');
  lotr.set('Wizard', 'Gandalf');
  lotr.set('Human', 'Aragon');
  lotr.set('Elf', 'Legolas');
  lotr.set('Maiar', 'The Necromancer');
  lotr.set('Maiar', 'Sauron');
  lotr.set('RingBearer', 'Gollum');
  lotr.set('LadyOfLight', 'Galadriel');
  lotr.set('HalfElven', 'Arwen');
  lotr.set('Ent', 'Treebear');

  // console.log(lotr)
  // console.log(lotr.get('Maiar'));
  // console.log(lotr.get('Hobbit'));

  WhatDoesThisDo();
}

main();

/*
  1. length is 9, capacity is 24, and we have not hashed all items we were asked to
     Maiar is Sauron, Hobbit is Frodo - because the key for Hobbit and Maiar already exist with set is called the second time, the values are overwritten
     initial capacity is 8, which is mulitplied by the size ratio of 3 when resize is called. Since we are not more than 50% full, we have not resized yet

  3.1 Hash table would be as follows: 22, 88, blank, blank, 15, 59, 28, 4, 17, 10 31

  3.2 Hash table would be blank, 28, 12, 5, 33, 15, blank, 17
                                 19
                                 10
*/