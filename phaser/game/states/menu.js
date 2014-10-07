
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    var temp_sprite = this.game.add.sprite(0,0, 'background3');
    this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'titlecharacter');
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.setTo(5,5);

    this.titleText = this.game.add.text(this.game.world.centerX, 300, 'JamJump', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400,
      'Howto play : both players must reach the glowing pink stone... WASD and Arrows ... \n HIT ENTER TO START!',
      { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.sprite.angle = -20;

    this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },

  update: function() {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
      this.game.state.start('play');
    }
  }

};

module.exports = Menu;
