function JumpPlayer(state, sprite, playerId, controller) {
    // Initialise with reference to game and sprite
    this.gamestate = state;
    this.game = state.game;
    this.sprite = sprite;
    this.controller = controller;
    this.playerId = playerId;

    this.lastUpdate = this.game.time.now;

    // Physic/Behavioral Constants
    this.JUMPFORCE = 300;
    this.BLOCKFART = 0;
    this.BLOCKCOST = 300;
    this.MAXBLOCKPOWER = 1000;
    this.NOREPEAT = 100;

    // Player state
    this.blockpower = this.MAXBLOCKPOWER;

    this.actionTimers = {};

}

JumpPlayer.prototype = {
  setPosition: function (x, y) {
    this.sprite.body.x = x;
    this.sprite.body.y = y;
  },

  attemptAction: function(actionName) {
    // Pass in an action name,
    // this method will check if the action can be performed,
    // or if it is still blocked (timing constraints)
    // (in case it is possible, it will automatically reset the timer)
    var t = this.game.time.now;
    if ( this.actionTimers[actionName] === undefined ||
        t - this.actionTimers[actionName] > this.NOREPEAT) {
        this.actionTimers[actionName] = t;
        return true;
    } else {
        return false;
    }
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

  registerBlockTouch: function(block) {
    // called from phyics collision testing ...
    // console.log("touched");
    // console.log(block);


  },

  update: function() {
    var v = this.sprite.body.velocity,
        time_passed;

    time_passed = this.game.time.now - this.lastUpdate;
    this.lastUpdate = this.game.time.now;

    // Fill up blockpower
    this.blockpower += time_passed;
    if (this.blockpower > this.MAXBLOCKPOWER) {
        this.blockpower = this.MAXBLOCKPOWER;
    }

    // Direct mapping of controller-x to player velocity
    this.sprite.body.velocity.x = this.controller.getDirection().x*140;

    if (this.controller.getButtonB()) {
        // funny double jump mechanic
        if ( Math.abs(v.y) < 1) {
          v.y -= this.JUMPFORCE; // jump force
        }
    }

    if (this.controller.getButtonA()) {
        // Set a block !

        // Is blockforce high enough =
        if(this.blockpower > 0 && this.attemptAction('setblock')) {
          this.gamestate.addBlock(this.playerId);
          this.lastBlockSet = this.game.time.now;
          v.y -= this.BLOCKFART;

          this.blockpower -= this.BLOCKCOST;
        }

    }

    // When doing physics / "velocity based" slide x controlls:
    // var max_x_vel = 300;
    //if (this.cursors.right.isDown) {
    //      v.x += 30;
    // }
    // v.x *= 0.98;
  },

};


module.exports = JumpPlayer;
