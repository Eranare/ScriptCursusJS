/*
OOP 
*/



const element = document.getElementById('random');
element.innerHTML = "Less random";
element.style.color = 'red';
element.style.fontSize = '20px'; 
console.log('Hello world!');

const button = document.getElementById('button');
let count = 0;
function rollDice() {
	let randomNum=	Math.floor(Math.random() *6 + 1)
	console.log(randomNum);

	randomNumArray = [];
	for (i = 0; i<8; i++){
	let randomNumber=	Math.floor(Math.random() *6 + 1)
	randomNumArray.push(randomNumber)
	}
	const newCount = new Count(randomNumArray);
	console.log(randomNumArray);
	console.log(newCount)
	newCount.fillNumbers(randomNumArray);
}
const rollElement = document.getElementById("button");
rollElement.addEventListener("click", rollDice);


class Count{
  constructor(array){
  this._array=array
  }
  get array(){
  return  this._array;
  }
  fillNumbers(array){


  let intone = 0;
  let inttwo = 0;
  let intthree = 0;
  let intfour = 0;
  let intfive = 0;
  let intsix= 0;

  
  for(i=0; i < array.length; i++){
    switch(array[i]){
      case 1:
	intone++;
      break;
      case 2:
	inttwo++;
      break;
      case 3:
	intthree++;
      break;
      case 4:
	intfour++;
      break;
      case 5:
	intfive++;
      break;
      case 6:
	intsix++;
      break;
      default:
	//nothing
      break;
    }
  }
	console.log(intsix);
  const ones= document.getElementById("amount1").innerHTML=intone;
  const twos= document.getElementById("amount2").innerHTML=inttwo;
  const threes= document.getElementById("amount3").innerHTML=intthree;
  const fours= document.getElementById("amount4").innerHTML=intfour;
  const fives= document.getElementById("amount5").innerHTML=intfive;
  const sixes= document.getElementById("amount6").innerHTML=intsix;
	count++;
	document.getElementById("button").innerHTML="Rolled: "+count;
}
}