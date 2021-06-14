//Create variables here
var dog,sadDog,happyDog;

var milkBottle1,milkBottle2;
var milkImg;
var foodS;
var foodStock;
var database;
var feed,addFood;
var fedTime,lastFed;
var foodObj;
var changeState;
var readState;
var bedroom,garden,washroom;
var gameState;
var currentTime;

function preload()
{
	//load images here
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happydog.png");
  bedroom=loadImage("Bed Room.png");
  garden=loadImage("Garden.png");
  washroom=loadImage("Wash Room.png");
  livingRoom=loadImage("Living Room.png");
  milkImg=loadImage("Milk.png");
}

function setup() {

  database=firebase.database();
  createCanvas(500, 500);

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  })

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(20);

	

  dog=createSprite(250,310,20,20);
  dog.addImage(sadDog);
  dog.scale=0.25;

  milkBottle1=createSprite(140,435,10,10);
  milkBottle1.addImage(milkImg);
  milkBottle1.scale=0.05;

  milkBottle2=createSprite(210,280,10,10);
  milkBottle2.addImage(milkImg);
  milkBottle2.scale=0.05;
  milkBottle2.visible=false;



  foodObj=new Food();

  
  
}


function draw() { 
  background("yellow");

  foodObj.display();
  writeStock(foodS);
  

  if(foodS==0){
    dog.addImage(happyDog);
    milkBottle2.visible=false;
 }else{
   dog.addImage(sadDog);
   milkBottle2.visible=true;
   
 }

 var gameStateRef=database.ref('gameState');
 gameStateRef.on('value',function(data){
   gameState=data.val();
 });

 if(gameState===1){
   dog.addImage(happyDog);
   dog.scale=0.175;
   dog.y=250;
 }

 if(gameState===2){
   dog.addImage(sadDog);
   dog.scale=0.175;
   dog.y=250;
   milkBottle2.visible=false;
 }

 var Bath=createButton("I want to take bath ");
 Bath.position(550,125);

 if(Bath.mousePressed(function(){
   gameState=3;
   database.ref('/').update({'gameState':gameState});

 }));

 if(gameState===3){
   dog.addImage(washroom);
   dog.scale=1;
   milkBottle2.visible=false;
 }

 var Sleep=createButton("I am very Sleepy");
 Sleep.position(710,125);

 if(Sleep.mousePressed(function(){
   gameState=4;
   database.ref('/').update({'gameState':gameState});
 }));

 if(gameState===4){
   dog.addImage(bedroom);
   dog.scale=1;
   milkBottle2.visible=false;
 }

 var Play=createButton("Let's Play");
 Play.position(560,160);

 if(Play.mousePressed(function(){
   gameState=5;
   database.ref('/').update({'gameState':gameState});

 }));
 if(gameState===5){
   dog.addImage(livingRoom);
   dog.scale=1;
   milkBottle2.visible=false;
 }

 var PlayInGarden=createButton("Let's Play In The Park");
 PlayInGarden.position(670,160);

 if(PlayInGarden.mousePressed(function(){
   gameState=6;
   database.ref('/').update({'gameState':gameState});
 }));
 if(gameState===6){
   dog.addImage(garden);
   dog.y=175;
   dog.scale=1;
   milkBottle2.visible=false;
 }
  


  

  drawSprites();
  textSize(17);
  fill("black");
  text("Milk Bottles Remaining  "+foodS,178,440);
  

}

function readStock(data){
  foodS=data.val();
  

}

function writeStock(x){
  database.ref('/').update({
    food:x
  });
}



function update(state){

  database.ref('/').update({
    gameState:state
  })

}
