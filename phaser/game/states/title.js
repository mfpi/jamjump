
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align:'center'};
    var style_small = { font: '16px Arial', fill: '#ffffff'};
    var temp_sprite = this.game.add.sprite(0,0, 'background3');
    this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'titlecharacter');
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.setTo(5,5);
    this.sprite.angle = -20;
    this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    this.titleText = this.game.add.text(this.game.world.centerX, 280, 'JamJump', style);
    this.titleText.anchor.setTo(0.5, 0.5);
    this.startText = this.game.add.text(this.game.world.centerX, 340, 'HIT ENTER TO START!',
      { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.startText.anchor.setTo(0.5, 0.5);

     this.instructionsText = this.game.add.text(40, 400,
       'HOWTO: \nBoth players must reach the glowing pink stone' +
       '\nControls: WASD and Arrows\nPress down mid-air to create block',
       style_small);

    this.creditsText = this.game.add.text(this.game.world.centerX+40, 400,
      'CREDITS:\nGraphics: \nDorothea Prem, Daniel Perz\n' +
      'Programming: \nMatthias Frey, Daniel Perz, Marco Fruhwirth\n' +
      'Music and Sound: \nDaniel Perz',
    style_small);


  },

  update: function() {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
      this.game.state.start('play');
    }
  }

};

module.exports = Menu;
