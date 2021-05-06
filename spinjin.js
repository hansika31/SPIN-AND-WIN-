/* hello world of PHASER = basic game = single scee in spin and win game
// how to create the basic skeleton for the game
// GAME LOOP */

/* 1.game object 2. game[config] -> scenes -> loading , create objects on screen , continuous update*/


let prizes_config = {
    count:12,
    prize_names : ["3000 Credits" , "35% Off", "Hard Luck","70% off","Swagpack","100% Off","Netflix"," 50% off", "Amazon voucher","2 Extra spin" , "CB Tshirt","CB Book"]

}


let config = {
    type: Phaser.CANVAS ,
    width : 800, 
    height : 600,
    backgroundColor : 0xffcc00 ,
    scene /*level*/ : {

        preload : preload ,
        create : create ,
        update : update ,

    }

};

let game = new Phaser.Game(config);

function preload(){

    console.log("PRELOAD");
    //console.log(this);
   
    //using load object , load some images


    this.load.image('background', 'Assets/back.jpg');
    console.log(this);
    this.load.image('wheel', 'Assets/wheel.png');
    this.load.image('pin', ' Assets/pin.png');
    this.load.image('stand', ' Assets/stand.png')

    
}


function create() {
    console.log("CREATE");
    //display background image
    let  W = game.config.width;
    let H =game.config.height;

    //sprite -> used for images.
    let background = this.add.sprite( W/2 ,H/2, 'background');
    
    background.setScale(0.20);


    //let create the stand

    let stand = this.add.sprite(W/2, H/2 + 250,'stand')
    stand.setScale(0.25)

    //let create wheel object
    this.wheel = this.add.sprite( W/2,H/2,'wheel');
    this.wheel.setScale(0.25);
    this.wheel.apla =0.5; // transparent

    


    //let create a pin
    let pin = this.add.sprite( W/2 , H/2-250, 'pin' )
    pin.setScale(0.25)

  //depth -> more depth is above.
  //scale -> expand
  //wheel.scaleX = 2; //expand

  this.input.on("pointerdown", spinwheel,this);

  //let create a text object

  font_style = {

    font : "bold 30px ROBOTO",
    align : "center" ,
    color: "red" ,

  }
  this.game_text = this.add.text(10,10,"Welcome to spin & win",font_style);

 
}




//gameloop
function update(){

    console.log("INSIDE UPDATE");

    //this.wheel.angle += 1; //move





}

function spinwheel(){

   // console.log("you clicked")

   //this.game_text.setText("You clicked the mouse!!");

    let rounds = Phaser.Math.Between(2,4) //generates any number between 2-5
   // console.log(rounds)

   let degrees = Phaser.Math.Between(0,11)*30;

   let total_angle=rounds*360 + degrees ;
   //console.log(total_angle);

   let idx = prizes_config.count - 1 -
   Math.floor(degrees/(360/prizes_config.count));


    //rotating and stoping of wheel
    tween=this.tweens.add({
        targets : this.wheel ,
        angle:total_angle, //random angle

        ease:"Cubic.easeOut" , //slowing down effect
        duration:6000 ,
        callbackScope:this,
        onComplete: function() {

            this.game_text.setText("you won " + prizes_config.prize_names[idx]);

            console.log("you won");


        }
    });
}
