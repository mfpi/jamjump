
'use strict';
function TestState() {}

TestState.prototype = {
  preload: function () {
    this.game.load.tilemap('platformer', 'assets/levels/tiled_level.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('platformer_tiles', 'assets/spritesheet.png');

  },
  create: function () {
    var map = this.game.add.tilemap('platformer'); // Preloaded tilemap
    map.addTilesetImage('spritesheet', 'platformer_tiles'); // Preloaded tileset
    this.layer = map.createLayer('Tile Layer 1');
    this.layer.resizeWorld();

    console.log(map);

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
