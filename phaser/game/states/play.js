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

      if (typeof this.game.gameSetup === 'undefined') {
        throw "Error : please make sure a game setup is initialised";
      }

      // Create a player object
      this.sprite = this.game.add.sprite(
        this.game.width/2,
        this.game.height/2);
      this.sprite2 = this.game.add.sprite(
        this.game.width/2-100,
        this.game.height/2);

      // Player object will further be handled by JumpPlayer class
      this.myGameModelObject = new JumpPlayer(
          this,
          this.sprite,
          1,
          new JumpController('keyb',
            this.game.input.keyboard.createCursorKeys())
          );
      this.myGameModelObject.init();

      this.myGameModelObject2 = new JumpPlayer(
          this,
          this.sprite2,
          2,
          null);
      this.myGameModelObject2.init();
      this.myGameModelObject2.chooseSkin(2);

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
      this.myGameModelObject2.controller = new JumpController('gamepad', this.game.input.gamepad.pad1);

      // var w = this.game.input.keyboard.addKey(Phaser.Keyboard.W);

      // game.physics.enable( this.block_group , Phaser.Physics.ARCADE);
    },
    update: function() {
      this.wb.update();
      this.game.physics.arcade.collide(this.wb.block_group, this.sprite);
      this.game.physics.arcade.collide(this.wb.block_group, this.sprite2);
      this.myGameModelObject.update();
      this.myGameModelObject2.update();
    },

    addBlock: function(player) {
        console.log("addblock");
        var sp, x, y,
          gridsize=19, comparetime;
        var sprite = this.sprite;
        var otherSprite = this.sprite2;
        if (player == 1) {
            sprite = this.sprite;
            otherSprite = this.sprite2;
        } else if (player == 2) {
            sprite = this.sprite2;
            otherSprite = this.sprite;
        }

        comparetime = sprite.lastBlockSet || 0;

        if(this.game.time.now - comparetime > 1000) {

          x = Math.floor(sprite.body.x / gridsize);
          y = Math.floor(sprite.body.y / gridsize + 1);

          this.wb.addBlock(x, y);
          this.wb.removeClosestTo(otherSprite.body.x, otherSprite.body.y);

          sprite.lastBlockSet = this.game.time.now;
        }
    },
    render: function() {
        //this.game.debug.quadTree(game.physics.arcade.quadTree);
    }
};

  module.exports = Play;


