'use strict';

    var screenWidth = 1000;
    var screenHeight = 400;
    var hitCounter = 0;

// When the DOM has loaded
$(document).ready(function() {

    // Initialize Crafty
    Crafty.init(screenWidth,screenHeight).canvas.init();
    Crafty.background("black");

    // Creeate player entity
    var player = Crafty.e("Player,2D, Canvas, Color, Twoway, Gravity, Collision")
        .color("yellow")
        .twoway(10)
        .gravity('Floor')
        .gravityConst(3)
        .attr({w:50, h:50, x:10, y:320})

    // Create floor entity
    var floor = Crafty.e("Floor,2D, Canvas, Color, Collision")
        .color("gray")
        .attr({h:30, w:1000, x:0, y:370 })

    // Create text that shows hit count
    var hitText = Crafty.e('2D, DOM, Text')
        .textColor('white')
        .text('Hit:' + hitCounter)
        .attr({
            x: screenWidth - 70,
            y: 10
        })
        .textFont({
          size: '30px',
          weight: 'bold'
        });

// Rain dropping function
function drop()
{   
    // Randomize the x-postition of the rain drop
    var randomx = Math.floor((Math.random() * screenWidth) + 50);

    // Create rain drop entity
    Crafty.e('Drop, 2D, Canvas, Color, Solid, Gravity, Collision')
        .attr({x: randomx, y: 0, w: 2, h: 15})
        .color('#FFFFFF')
        .gravity()
        .gravityConst(.5)

        // When a rain drop hit the Player, increase the hit counter
        .checkHits('Player')
        .bind("HitOn", function(){
            this.destroy();
            hitCounter++;
            hitText.text("Hit: " + hitCounter);

            // if the hit counter becomes 5, reset it
            if (hitCounter == 5)
            {
              player.x = 20;
              hitCounter = 0;
              hitText.text("Hit: " + hitCounter);
            }
        })

        // When it hit the floor, destroy it
        .bind("EnterFrame", function() {
            if (this.y > screenHeight-30)
              this.destroy();
        });
}

// Call "drop" function in order to create many rain drops
Crafty.bind("EnterFrame", function(){
   if (Crafty.frame() % 4 == 0)
    drop();
});


});

 