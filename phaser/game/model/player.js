function JumpPlayer(game, sprite, controller) {
    // Initialise with reference to game and sprite
    this.game = game;
    this.sprite = sprite;
    this.controller = controller;
}

JumpPlayer.prototype = {

  init: function() {

    // First thing is to enable physics
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    // Set parameters of physics
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.gravity.y = 350;
    this.sprite.allowGravity = true;
    this.sprite.loadTexture('allblocks', 22);

  },

  update: function() {
    // console.log(this.controller.getDirection());
    // update ....
    // console.log("update");
  },

};


module.exports = JumpPlayer;
