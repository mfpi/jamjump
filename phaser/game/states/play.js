  'use strict';
  var JumpPlayer = require('../model/player')
  var JumpController = require('../model/controller')
  var WorldBlocks = require('../model/world')
  function Play() {}
  Play.prototype = {
    create: function() {
      var i, sp, ctrl;
      // this.game.load.tilemap('platformer', 'assets/platformer.json', null, Phaser.Tilemap.TILED_JSON);
      // this.game.load.image('spritesheet', 'assets/spritesheet.png');

      // var map = this.game.add.tilemap('platformer');
      // map.addTilesetImage('spritesheet', 'spritesheet');
      // var layer = map.createLayer('World1');
      // layer.resizeWorld();

      // Enable physics for game
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.cursors = this.game.input.keyboard.createCursorKeys();

      // Create a player object
      this.sprite = this.game.add.sprite(
        this.game.width/2,
        this.game.height/2);

      // Player object will further be handled by JumpPlayer class
      this.myGameModelObject = new JumpPlayer(
          this.game,
          this.sprite,
          new JumpController('keyb',
            this.game.input.keyboard.createCursorKeys())
          );
      this.myGameModelObject.init();

      this.wb = new WorldBlocks(this.game);

      // Add some blocks to the world

      for (i=0; i<30; i++) {
        this.wb.addBlock(i, 18);
      }
     for (i=10; i<20; i++) {
        this.wb.addBlock(i, 8);
      }

      // Set up controls control

      this.gamepad = this.game.input.gamepad;
      this.game.input.gamepad.start();
      this.game.input.gamepad.start();
      this.gamepad.start();
      this.moveVector = new Phaser.Point(0, 0);

      this.game.input.gamepad.addCallbacks(this, {
          onConnect: function onConnect(i) {
              console.log("connect");
          },
          onDown: function onDown(b, i, s) {
              console.log("down");
          }});

      //
      // Uncomment to set gamepad as controller :
      //
      //this.myGameModelObject.controller = new JumpController('gamepad',
      //this.game.input.gamepad.pad2);*/

      // var w = this.game.input.keyboard.addKey(Phaser.Keyboard.W);

      // game.physics.enable( this.block_group , Phaser.Physics.ARCADE);
    },
    update: function() {
      this.wb.update();

      this.myGameModelObject.update();

      var max_x_vel = 300;

      this.game.physics.arcade.collide(this.wb.block_group, this.sprite);

      if (this.cursors.left.isDown) {
          this.moveVector.x -= 30;
      }

      this.moveVector.x += 30*this.gamepad.pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X);

      // console.log(this.gamepad.pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X));

      if (this.cursors.right.isDown) {
          this.moveVector.x += 30;
      }
      if (this.cursors.up.isDown || this.gamepad.pad2.isDown(Phaser.Gamepad.XBOX360_A)) {

        // funny double jump mechanic
        if ( Math.abs(this.moveVector.y) < 1) {
          this.moveVector.y -= 250;
        }
      }
      if (this.cursors.down.isDown || this.gamepad.pad2.isDown(Phaser.Gamepad.XBOX360_X)) {
        this.addBlock(this.sprite);
      }

      this.moveVector.x *= 0.93;

      if ( this.moveVector.x < - max_x_vel) {
        this.moveVector.x = - max_x_vel;
      }

      if ( this.moveVector.x > max_x_vel) {
        this.moveVector.x = max_x_vel;
      }
      this.moveVector.x *= 0.98;

      this.sprite.body.velocity = this.moveVector;
    },
    clickListener: function() {
      this.game.state.start('gameover');
    },

    addBlock: function(sprite) {
        var sp, x, y,
          gridsize=19, comparetime;

        comparetime = sprite.lastBlockSet || 0;

        if(this.game.time.now - comparetime > 1000) {

          x = Math.floor(sprite.body.x / gridsize);
          y = Math.floor(sprite.body.y / gridsize + 1);

          this.wb.addBlock(x, y);

          sprite.lastBlockSet = this.game.time.now;
        }
    },
    render: function() {
        //this.game.debug.quadTree(game.physics.arcade.quadTree);
    }
};

  module.exports = Play;


