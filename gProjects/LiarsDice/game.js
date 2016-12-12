var player=[];
var bullshit = true;

function diceRoll(){
  var x = [];
  for (var i = 0; i < 5; i++) {
    var y = Math.floor(Math.random()*6)+1;
    x.push(y);
  }
  player.push(x);
}

function playDice(){
  for (var j = 0; j < 4; j++) {
    diceRoll();
  }
  return player;
}

function allDice(all){
  var group = [].concat.apply([], all);
  return group;
}

function makeGuess(){
  var guessCount= prompt ("Guess quanity ");
  var guessNum = prompt("Guess number");
  return guessCount, guessNum;
}

function testGuess(count,num){
  var diceAmount=0;
  for (var i = 0; i < group.length; i++) {
    if (group[i]===num||group[i]===1){
      diceAmount++;
    }
  }
  if (diceAmount>=count){
    bullshit = false;
  }else{
    bullshit=true;
  }
}


playDice();
allDice(player);
makeGuess();
testGuess(guessCount,guessNum);
