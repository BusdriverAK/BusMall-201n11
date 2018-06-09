'use strict';

var imgObj = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];

console.log('Before shuffle: ' + imgObj);

function NewShuffle(imgObj){
  var m = imgObj/length, t, i;
    while (m){
      i = Math.floor(Math.random() *  m--);
      t = imgObj[m];
      imgObj[m] = imgObj[i];
      imgObj[i] = t;
    }
    return imgObj;
}

console.log('after shuffle: ' + imgObj);
