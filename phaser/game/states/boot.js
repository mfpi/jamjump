
'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
      
    this.game.scale.startFullScreen(false);
      

  }
};

module.exports = Boot;
