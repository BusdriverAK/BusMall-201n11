'use strict';

Product.names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

Product.all = [];
Product.lastSeen = [];
Product.clickCount = 0;
Product.container = document.getElementById('image-container');
Product.pics = [document.getElementById('left'), document.getElementById('center'), document.getElementById('right')];

function Product(name){
    this.name = name;
    this.path = path;
    this.vote = 0;
    this.seen = 0;
    Produc.all.push(this);
}

function buildProducts(){
    for (var i = 0; i < Product.names.length; i++){
        new Product(Product.names[i]);
    }
}

function showItems(){
    var currentItems = [];
    Product.voteCount = [];
    for(var i = 0; i < Product.names.length; i++){
        Product.voteCount.push(Product.all[i].vote);
    }
// run checks to see if new image was used for last seen

    currentItems[0] = Randomize();
    while(Product.lastSeen.indexOf(currentItems[0]) !== -1){
        console.log('duplicate found on left');
        currentItems[0] = Randomize();
    }

    currentItems[1] = Randomize();
    while(Product.lastSeen.indexOf(currentItems[0]) || Product.lastSeen.indexOf(currentItems[1]) !== -1) {
        console.log('duplicate found on center');
        currentItems[1] = Randomize();
    }

    currentItems[2] = Randomize();
    while(Product.lastSeen.indexOf(currentItems[0]) || Product.lastSeen.indexOf(currentItems[1]) || Product.lastSeen.indexOf(currentItems[2]) !== -1){
        console.log('duplicate found on right');
        currentItems[2] = Randomize();
    }
}

function Randomize(){
    return Math.floor(Math.random() * Product.names.length);
}

//click event handler

