'use strict';

var imgObj = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];

console.log('Before shuffle: ' + imgObj);

function NewShuffle(array){
  var m = array.length, t, i;
    while (m){
      i = Math.floor(Math.random() *  m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
}

NewShuffle(imgObj);

console.log('after shuffle: ' + imgObj);
