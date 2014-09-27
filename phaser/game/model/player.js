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
  },

};


module.exports = JumpPlayer;
