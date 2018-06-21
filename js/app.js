'use strict';

Product.names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

Product.all = [];
Product.lastSeen = [];
Product.clickCount = 0;
Product.container = document.getElementById('image-container');
Product.pics = [document.getElementById('left'), document.getElementById('center'), document.getElementById('right')];

var lsProduct;
var lsClicks;
var getInfo;
var getClick;

function Product(name){
  this.name = name;
  this.path;
  this.votes = 0;
  this.seen = 0;
  if(name === 'usb'){
    this.path = 'assets/' + name + '.gif';
  }else if(name === 'sweep'){
    this.path = 'assets/' + name + '.png';
  }else{
    this.path = 'assets/' + name + '.jpg';
  }
  Product.all.push(this);
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
    Product.voteCount.push(Product.all[i].votes);
  }
  // run checks to see if new image was used for last seen

  currentItems[0] = Randomize();
  while(Product.lastSeen.indexOf(currentItems[0]) !== -1){
    console.log('duplicate found on left');
    currentItems[0] = Randomize();
  }

  currentItems[1] = Randomize();
  while(currentItems[0] === currentItems[1] || Product.lastSeen.indexOf(currentItems[1]) !== -1) {
    console.log('duplicate found on center');
    currentItems[1] = Randomize();
  }

  currentItems[2] = Randomize();
  while(currentItems[0] === currentItems[2] || currentItems[1] === currentItems[2] || Product.lastSeen.indexOf(currentItems[2]) !== -1){
    console.log('duplicate found on right');
    currentItems[2] = Randomize();
  }
  for(var i = 0; i < 3; i++){
    Product.pics[i].src = Product.all[currentItems[i]].path;
    Product.pics[i].id = Product.all[currentItems[i]].name;
    Product.all[currentItems[i]].seen +=1;
    Product.lastSeen[i] = currentItems[i];
  }
}

function Randomize(){
  return Math.floor(Math.random() * Product.names.length);
}

//click event handler

function clickHandler(event){
  if (event.target.id === 'image-container') {
    return alert('Please click on an item you would like to vote for.');
  }
  Product.clickCount += 1;
  for (var i = 0; i < Product.names.length; i++){
    if(event.target.id === Product.all[i].name){
      Product.all[i].votes += 1;
    }
  }
  showItems();
  //strigify for local storage
  lsProduct = JSON.stringify(Product.all);
  localStorage.setItem('Products', lsProduct);
  lsClicks = JSON.stringify(Product.clickCount);
  localStorage.setItem('Clicks', lsClicks);

  // stop and remove after 24 clicks
  if(Product.clickCount > 24){
    Product.container.removeEventListener('click', clickHandler);

    makeChart();

    localStorage.removeItem('clickCount');
  }
}



if (localStorage.Products){
  getInfo = localStorage.getItem('Products');
  Product.all = JSON.parse(getInfo);
  getClick = localStorage.getItem('clickCount');
  Product.clickCount = JSON.parse(getClick);
}

function makeChart(){
  var labelColors = ['red', 'blue', 'yellow','green','red', 'blue', 'yellow','green', 'red', 'blue', 'yellow','green', 'red', 'blue', 'yellow','green', 'red', 'blue', 'yellow','green'];
  var ctx = document.getElementById('chart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Product.names,
      datasets: [{
        label: '# of Votes for each Products',
        data: Product.voteCount,
        backgroundColor: labelColors
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

// clear local storage
var clearStorage = document.getElementById('clearStorage');

clearStorage.addEventListener('click', function(){
  console.log('Local Storage Cleared');
  localStorage.clear();
});

buildProducts();
showItems();
Product.container.addEventListener('click', clickHandler);