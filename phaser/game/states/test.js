
'use strict';
function TestState() {}

TestState.prototype = {
  preload: function () {

  },
  create: function () {
    var map = this.add.tilemap('map'); // Preloaded tilemap

    console.log(map);

    // map.addTilesetImage('tileset', 0); // Preloaded tileset
    // var layer = map.createLayer('Stones'); // This is the default name of the first layer in Tiled
    // layer.resizeWorld(); // Sets the world size to match the size of this layer.
  },
  update: function () {

      //
      // Test for pause key
      //
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
          this.game.state.start("menu");
      }
  }
};
module.exports = TestState;
