'use strict';

Product.all = [];

function Product(name, path){
    this.name = name;
    this.path = path;
    this.vote = 0;
    this.seen = 0;
    Produc.all.push(this);
}