function JumpPlayer(game, sprite, controller) {
    // Initialise with reference to game and sprite
    this.game = game;
    this.sprite = sprite;
    this.controller = controller;
}

JumpPlayer.prototype = {
  setPosition: function (x, y) {
    this.sprite.body.x = x;
    this.sprite.body.y = y;
  },

  init: function() {
    // First thing is to enable physics
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    // Set parameters of physics
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.setSize(19, 14, 0, 5);
    this.sprite.body.gravity.y = 350;
    this.sprite.allowGravity = true;
    this.sprite.loadTexture('allblocks', 22);
  },

  update: function() {
    // console.log(this.controller.getDirection());
    // update ....
    // console.log("update");

    var max_x_vel = 300;

    this.moveVector = this.sprite.body.velocity;


    // Direct mapping of controller-x to player velocity
    this.sprite.body.velocity.x = this.controller.getDirection().x*140;

    if (this.controller.getButtonB()) {
        // funny double jump mechanic
        if ( Math.abs(this.moveVector.y) < 1) {
          this.moveVector.y -= 250;
        }
    }

    if (this.controller.getButtonA()) {
        this.game.addBlock(this.sprite);
    }

    // When doing physics / "velocity based" slide x controlls:
    //if (this.cursors.right.isDown) {
    //      this.moveVector.x += 30;
    // }
    // this.moveVector.x *= 0.98;
  },

};


module.exports = JumpPlayer;
