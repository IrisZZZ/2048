var height = 4;
var width = 4;
var direction = 0;
var number = 0;
var emptyList = [];
var classList = ["normal","block2","block4","block8","block16","block32","block64","block128","block256","block512","block1024","block2048"];
var numberList = (0,1,2,3,4,5,6,7,8,9,10,11);
var scoreList = [" ","2","4","8","16","32","64","128","256","512","1024","2048"];
var gameOver = false;
var gameWin = false;

function createTheMap(){
  var ta = document.createElement("table");
  ta.id = "main-table";
  document.getElementById('canvas').appendChild(ta);
for(y = 0; y < height; y++){
    var tr = document.createElement("tr");
    tr. id = "tr"+y
    document.getElementById("main-table").appendChild(tr);
    for(x = 0; x < width; x++){
      var td = document.createElement("td");
     td.setAttribute("class","normal");//why setAttribute()works but td.class doesn't work

      td.id ="td" + x + "-" + y;
      document.getElementById("tr"+y).appendChild(td);
    }
  }
}
function rand(a,b){
  return Math.floor(Math.random()*(a-b)+b)
}
function get(a,b){
  return document.getElementById("td"+a+"-"+b);
}
function getType(a,b){
  if (a != null && b != null)
  return get(a,b).getAttribute("class");
}
function setBox(a,b,value){
  get(a,b).setAttribute("class",value);
}
function setBoxByIndex(a,b,value){
  var classname = classList[value];
  get(a,b).setAttribute("class",classname);
}
// function addText(a,b,value){
//   var text = document.createTextNode(value);
//   get(a,b).appendChild(text.firstChild);
// }
function addText(a,b,value){
  get(a,b).innerHTML = scoreList[value];
}
function addText(){
  for(var y  = 0;y < height; y++){
    for(var x = 0;x < width; x++){
      var number = classList.indexOf(getType(x,y));
      get(x,y).innerHTML = scoreList [number];
    }
  }
}

function generateNumber(){
  var overlap = true;
  while(overlap && number <= 16){
    var x = rand(width,0);
    var y = rand(height,0);
    if(getType(x,y) == "normal"){
      overlap = false;
      var standard = rand (6,0)
      if (standard <5){
    setBoxByIndex(x,y,1);
  }else{
    setBoxByIndex(x,y,2);
  }
    }
    addText();
    }
}

function swap(a,b,c,d){
  var class1 = getType(a,b);
  var class2 = getType(c,d);
  setBox(a,b,class2);
  setBox(c,d,class1);
}

function checkIfContinue(){
  var hasSpace = false;
  for(x = 0;x<width;x++){
    for(y = 0;y<height;y++)
    if(getType(x,y) == "block2048"){
      document.getElementById("gameWin").style.display = "block";
      gameWin = true;
    }else if(getType(x,y) == "normal"){
    hasSpace = true;
  }
  }
  if(!hasSpace){
    document.getElementById("gameOver").style.display = "block";
    gameOver = true;
  }
}


window.addEventListener("keydown", function key(event){
  if(!gameOver&& !gameWin){
  var key = event.keyCode;
  if(key == 37 || key == 38 || key == 39 ||key == 40||key == 32){
    event.preventDefault();
  if(key == 37){
    moveLeft();
  ;}

  if(key == 38 ){
      moveUp();
  ;}

  if(key == 39){
    moveRight();
  ;}

  if(key == 40){
    moveDown();
  ;}
  generateNumber();
  checkIfContinue();
}
}});



function moveLeft(){
for( var y = 0;y<height;y++){
    for(var x = 0;x<width;x++){
      for(var z = 0;z<width-x-1;z++)
      if (getType(z,y) == "normal"){
      swap(z,y,z+1,y);}
    }
    for(var i = 0;i<width-1;i++){
       if(getType(i,y) == getType(i+1,y) && getType(i,y) != "normal" && getType(i+1,y)!="normal"){
         setBox(i+1,y,"normal");
         var number = classList.indexOf(getType(i,y));
         setBoxByIndex(i,y,number + 1);
      }
     }
     for(var l = 0;l<width;l++){
      for(n = 0;n<width-l-1;n++)
       if (getType(n,y) == "normal"){
      swap(n,y,n+1,y);
    }
    } 
    }
    addText();
  }

  function moveUp(){
  for( var x = 0;x<width;x++){
      for(var y = 0;y<height;y++){
        for(var z = 0;z<height-y-1;z++)
        if (getType(x,z) == "normal"){
        swap(x,z,x,z+1);}
      }
      for(var i = 0;i<height-1;i++){
         if(getType(x,i) == getType(x,i+1) && getType(x,i) != "normal" && getType(x,i+1)!="normal"){
           setBox(x,i+1,"normal");
           var number = classList.indexOf(getType(x,i));
           setBoxByIndex(x,i,number + 1);
        }
       }
       for(var l = 0;l<height;l++){
        for(n = 0;n<height-l-1;n++)
         if (getType(x,n) == "normal"){
        swap(x,n,x,n+1);
      }
      }
      }
      addText();
    }
    
    function moveRight(){
    for( var y = 0;y<height;y++){
        for(var x = 0;x<width;x++){
          for(var z = width-x-1;z>0;z--)
          if (getType(z,y) == "normal"){
          swap(z,y,z-1,y);}
        }
        for(var i = width -1;i>0;i--){
           if(getType(i,y) == getType(i-1,y) && getType(i,y) != "normal" && getType(i-1,y)!="normal"){
             setBox(i-1,y,"normal");
             var number = classList.indexOf(getType(i,y));
             setBoxByIndex(i,y,number + 1);
          }
         }
         for(var l = 0;l<width-1;l++){
          for(n = width-l-2;n>=0;n--)
           if (getType(n+1,y) == "normal"){
          swap(n+1,y,n,y);
        }
        }
        }
        addText();
      }

      function moveDown(){
      for( var x = 0;x<width;x++){
          for(var y = 0;y<height;y++){
            for(var z = height-y-1;z>0;z--)
            if (getType(x,z) == "normal"){
            swap(x,z,x,z-1);}
          }
          for(var i = height-1;i>0;i--){
             if(getType(x,i) == getType(x,i-1) && getType(x,i) != "normal" && getType(x,i-1)!="normal"){
               setBox(x,i-1,"normal");
               var number = classList.indexOf(getType(x,i));
               setBoxByIndex(x,i,number + 1);
            }
           }
           for(var l = 0;l<height;l++){
            for(n = width - 2 - l;n>=0;n--)
             if (getType(x,n+1) == "normal"){
            swap(x,n,x,n+1);
          }
          }
          }
          addText();
        }

function restartGame(){
  location.reload();
  document.getElementById("gameOver").style.display = "none";
  document.getElementById("gameWin").style.display = "none";
}

createTheMap();
generateNumber();
generateNumber();
