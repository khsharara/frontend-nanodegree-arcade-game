// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // All the variabels that apply to an Enemy instance
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 75;
    this.height = 50;
    // Sprite is used to represent an image
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += (this.speed * dt);
    // If the enemy leaves the canvas, loop them back infront of the canvas
    if (this.x > 500) {
        this.x = -100;
    }

    // If collision occurs, reset player position
    if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.height + this.y > player.y) {
        player.x = 200;
        player.y = 400;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// PLAYER CLASS
var Player = function() {
    // All the variables that apply to a player instance
    this.x = 200;
    this.y = 400;
    this.width = 50;
    this.height = 50;
    //image of player
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // If player reaches water, reset the player to start position
    if (this.y < 0) {
        this.x = 200;
        this.y = 400;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Allow player to move using the arrow keys
Player.prototype.handleInput = function(event) {
    if (event === 'left' && this.x > 0) {
        this.x -= 100;
    } else if (event === 'right' && this.x < 400) {
        this.x += 100;
    } else if (event === 'up' && this.y > 0) {
        this.y -= 82;
    } else if (event === 'down' && this.y < 400) {
        this.y += 82;
    }
};

// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(-100, 60, 90);
var enemy2 = new Enemy(-400, 145, 150);
var enemy3 = new Enemy(-700, 225, 125);
var allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to Player.handleInput() method
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
