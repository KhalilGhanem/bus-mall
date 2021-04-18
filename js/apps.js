'use strict';
let leftImageElement=document.getElementById('left-image');
let midImageElement=document.getElementById('mid-image');
let rightImageElement=document.getElementById('right-image');
let resultsButtonElement=document.getElementById('resultsButton');
let count=0;
let maxClicks=25;
let leftIndex;
let midIndex;
let rightIndex;

function Product(name,source){
  this.name=name;
  this.source=source;
  this.shown=0;
  this.clicked=0;
  Product.imageArr.push(this);
}

Product.imageArr=[];
new Product('bag','images/bag.jpg');
new Product('banana','images/banana.jpg');
new Product('bathroom','images/bathroom.jpg');
new Product('boots','images/boots.jpg');
new Product('breakfast','images/breakfast.jpg');
new Product('bubblegum','images/bubblegum.jpg');
new Product('chair','images/chair.jpg');
new Product('cthulhu','images/cthulhu.jpg');
new Product('dog-duck','images/dog-duck.jpg');
new Product('dragon','images/dragon.jpg');
new Product('pen','images/pen.jpg');
new Product('pet-sweep','images/pet-sweep.jpg');
new Product('scissors','images/scissors.jpg');
new Product('shark','images/shark.jpg');
new Product('sweep','images/sweep.png');
new Product('tauntaun','images/tauntaun.jpg');
new Product('unicorn','images/unicorn.jpg');
new Product('usb','images/usb.gif');
new Product('water-can','images/water-can.jpg');
new Product('wine-glass','images/wine-glass.jpg');
console.log(Product.imageArr);

function renderImages(){
  leftIndex=randomIndex();
  midIndex=randomIndex();
  rightIndex=randomIndex();

  while(leftIndex===midIndex || midIndex===rightIndex ){
    console.log(`life ${leftIndex} mid ${midIndex} right ${rightIndex}`);
    midIndex=randomIndex();
    if(leftIndex===rightIndex && rightIndex !== midIndex){
      rightIndex=randomIndex();
    }
  }
  Product.imageArr[leftIndex].shown++;
  Product.imageArr[midIndex].shown++;
  Product.imageArr[rightIndex].shown++;

  leftImageElement.src= Product.imageArr[leftIndex].source;
  midImageElement.src= Product.imageArr[midIndex].source;
  rightImageElement.src= Product.imageArr[rightIndex].source;

}


function randomIndex(){
  return Math.floor(Math.random() * Product.imageArr.length);
}



renderImages();

leftImageElement.addEventListener('click',handleClick);
midImageElement.addEventListener('click',handleClick);
rightImageElement.addEventListener('click',handleClick);
resultsButtonElement.addEventListener('click',handleButton);

function handleClick(event){
  count++;
  if(maxClicks>=count){
    if(event.target.id ==='left-image'){
      Product.imageArr[leftIndex].clicked++;
    }else if(event.target.id ==='mid-image'){
      Product.imageArr[midIndex].clicked++;
    }else{
      Product.imageArr[rightIndex].clicked++;
    }
    renderImages();
  }else{
    handleButton();
  }
}

function handleButton(event){
  if(event.target.id ==='resultsButton'){
    renderList();
    leftImageElement.removeEventListener('click',handleClick);
    midImageElement.removeEventListener('click',handleClick);
    rightImageElement.removeEventListener('click',handleClick);
  }
}

function renderList(){
  let ul=document.getElementById('fisrtList');
  for(let i=0;i<Product.imageArr.length;i++){
    let li = document.createElement('li');
    ul.appendChild(li);
    li.textContent= `${Product.imageArr[i].name} had ${Product.imageArr[i].clicked} votes, and was seen ${Product.imageArr[i].shown} times `;
  }
}
