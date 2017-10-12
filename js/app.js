// Whole-script strict mode syntax
'use strict';

// Sets an initial player score of 0.
var score = 0;
document.getElementById('playerScore').innerHTML = score;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    //Variables for the enemy
    this.x = x;
    this.y = y;
    this.speed = speed;

    // Enemy Sprite
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will make the game runs at the same speed for all computers.
    this.x += this.speed * dt;

    // when off canvas, reset enemy position to move again
    if (this.x > 550) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 512);
    }

    // Check for collision between player and enemies and if player collides with enemy game over
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
        //Tell Player Game Over
        document.write("<h1>You Lose! Refresh to Restart</h1>");
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player information for the game
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};
//Player update function
Player.prototype.update = function() {
    // Prevent player from moving beyond canvas wall boundaries
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // Check for player reaching top of canvas,scoring, and have player score again
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
        score++;
      	document.getElementById('playerScore').innerHTML = score;
      	this.reset();

    }
};

//Player rendering
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//How player will move by key Press
Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
    }
};

// Is called when the player is reset to the starting point
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 320;
};

//Creating Enemies Array
var allEnemies = [];

// Position where the enemies will are created
var enemyPosition = [60, 140, 220];
var player = new Player(200, 380, 50);
var enemy;

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
