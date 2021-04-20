'use strict';
let leftImageElement=document.getElementById('left-image');
let midImageElement=document.getElementById('mid-image');
let rightImageElement=document.getElementById('right-image');
let resultsButtonElement=document.getElementById('resultsButton');
let containerSection=document.getElementById('contSec');
let count=0;
let maxClicks=25;
let leftIndex;
let midIndex;
let rightIndex;
let compairArray=[];
let productNamesArray=[];

function Product(name,source){
  this.name=name;
  this.source=source;
  this.shown=0;
  this.clicked=0;
  Product.imageArr.push(this);
  productNamesArray.push(this.name);
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


function checkIndex(index, arr){
  for(let i = 0 ; i <arr.length; i++){
    if(index === arr[i]){
      return true;
    }
  } return false;
}


function renderImages(){
  leftIndex=randomIndex();
  midIndex=randomIndex();
  rightIndex=randomIndex();

  console.log('first ' + compairArray.includes(Product.imageArr[leftIndex].source));
  console.log('sec '+ compairArray.includes(Product.imageArr[midIndex].source));
  console.log('last '+compairArray.includes(Product.imageArr[rightIndex].source));


  while(leftIndex === rightIndex || leftIndex === midIndex || midIndex === rightIndex || compairArray.includes(leftIndex) || compairArray.includes(midIndex) || checkIndex(rightIndex,compairArray)){
    rightIndex = randomIndex();
    midIndex = randomIndex();
    leftIndex = randomIndex();
  }

  compairArray = [leftIndex,midIndex,rightIndex];

  leftImageElement.src= Product.imageArr[leftIndex].source;
  Product.imageArr[leftIndex].shown++;

  midImageElement.src= Product.imageArr[midIndex].source;
  Product.imageArr[midIndex].shown++;

  rightImageElement.src= Product.imageArr[rightIndex].source;
  Product.imageArr[rightIndex].shown++;
  console.log(compairArray);
}



function randomIndex(){
  return Math.floor(Math.random() * Product.imageArr.length);
}



renderImages();

containerSection.addEventListener('click',handleClick);

function handleClick(event){
  count++;
  if(maxClicks>=count){
    if(event.target.id ==='left-image'){
      Product.imageArr[leftIndex].clicked++;
    }else if(event.target.id ==='mid-image'){
      Product.imageArr[midIndex].clicked++;
    }else if(event.target.id ==='right-image'){
      Product.imageArr[rightIndex].clicked++;
    }else{
      alert('please select an image');
      count--;
    }
    renderImages();

  }else{
    containerSection.removeEventListener('click',handleClick);
    resultsButtonElement.addEventListener('click',handleButton);
    handleButton();
  }

}



function handleButton(event){
  if(event.target.id ==='resultsButton'){
    renderList();
    makeChart();
    resultsButtonElement.removeEventListener('click',handleButton);

  }
}
let arrOfVotes=[];
let arrOfShown=[];
function renderList(){
  let ul=document.getElementById('fisrtList');
  for(let i=0;i<Product.imageArr.length;i++){
    arrOfVotes.push(Product.imageArr[i].clicked);
    arrOfShown.push(Product.imageArr[i].shown);
    let li = document.createElement('li');
    ul.appendChild(li);
    li.textContent= `${Product.imageArr[i].name} had ${Product.imageArr[i].clicked} votes, and was seen ${Product.imageArr[i].shown} times `;
  }
}

function makeChart(){
  let ctx = document.getElementById('myChart');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNamesArray,
      datasets: [{
        label: '# of Votes',
        data: arrOfVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },{
        label: '# of Shown',
        data: arrOfShown,
        backgroundColor: [
          'rgba(200, 200, 200, 0.2)',
          'rgba(0, 255, 0, 0.2)',
          'rgba(60, 179, 113, 0.2)',
          'rgba(65, 105, 225, 0.2)',
          'rgba(255,0,255, 0.2)',
          'rgba(0, 255, 255, 0.2)'
        ],
        borderColor: [
          'rgba(200, 200, 200, 1)',
          'rgba(0, 255, 0, 1)',
          'rgba(60, 179, 113, 1)',
          'rgba(65, 105, 225, 1)',
          'rgba(255,0,255, 1)',
          'rgba(0, 255, 255, 1)'
        ],
        borderWidth: 1
      }]
    },
  });
}


/*
function makechart(){
  let ctx = document.getElementById('myChart');
  let myChart = new Chart(ctx, { // its an instance
    type: 'bar',
    data: {
      labels: productNamesArray, // ['goat away' ,  ... 'sassy goat']
      datasets: [{
        label: 'Number Of votes',
        data: arrOfVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderWidth: 1
      },{
        label:'# of Shown',
        data: arrOfShown,
        backgroundColor:[
          'rgb(192,192,192)'
        ],
        borderWidth: 1
      }]
    }
  });
}
*/
