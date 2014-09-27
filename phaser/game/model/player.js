function JumpPlayer(state, sprite, controller) {
    // Initialise with reference to game and sprite
    this.state = state;
    this.game = state.game;
    this.sprite = sprite;
    this.controller = controller;
}

JumpPlayer.prototype = {
  setPosition: function (x, y) {
    this.sprite.body.x = x;
    this.sprite.body.y = y;
  },

  chooseSkin: function (skin_n) {
    if (skin_n < 2) {
        this.sprite.loadTexture('allblocks', 22);
    } else {
        this.sprite.loadTexture('allblocks', 42);
    }
  },

  init: function() {
    // First thing is to enable physics
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    // Set parameters of physics
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.setSize(19, 14, 0, 5);
    this.sprite.body.gravity.y = 1050;
    console.log(this.sprite.body);
    this.sprite.allowGravity = true;

    // Default skin-1
    this.chooseSkin(1);
  },

  update: function() {
    // console.log(this.controller.getDirection());
    // update ....
    // console.log("update");


    this.moveVector = this.sprite.body.velocity;


    // Direct mapping of controller-x to player velocity
    this.sprite.body.velocity.x = this.controller.getDirection().x*140;

    if (this.controller.getButtonB()) {
        // funny double jump mechanic
        if ( Math.abs(this.moveVector.y) < 1) {
          this.moveVector.y -= 300; // jump force
        }
    }

    if (this.controller.getButtonA()) {
        // Maybe we can should move addBlock to game ?
        this.state.addBlock(this.sprite);
    }

    // When doing physics / "velocity based" slide x controlls:
    // var max_x_vel = 300;
    //if (this.cursors.right.isDown) {
    //      this.moveVector.x += 30;
    // }
    // this.moveVector.x *= 0.98;
  },

};


module.exports = JumpPlayer;
