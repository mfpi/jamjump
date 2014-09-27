  'use strict';
  var JumpPlayer = require('../model/player');
  var JumpController = require('../model/controller');
  var WorldBlocks = require('../model/world');
  function Play() {}
  Play.prototype = {
    create: function() {
      var i, sp, ctrl,
        that = this,
        cursors,
        gamepad,
        temp_sprite,
        temp_player,
        controller_map;

      // this.game.load.tilemap('platformer', 'assets/platformer.json', null, Phaser.Tilemap.TILED_JSON);
      // this.game.load.image('spritesheet', 'assets/spritesheet.png');

      // var map = this.game.add.tilemap('platformer');
      // map.addTilesetImage('spritesheet', 'spritesheet');
      // var layer = map.createLayer('World1');
      // layer.resizeWorld();

      // Enable physics for game
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      if (typeof this.game.gameSetup === 'undefined') {
        throw "Error : please make sure a game setup is initialised";
      }

      //
      // Set up available controllers
      //
      cursors = this.game.input.keyboard.createCursorKeys();
      gamepad = this.game.input.gamepad;
      gamepad.start();
      gamepad.addCallbacks(this, {
          onConnect: function onConnect(i) {
              console.log("connect");
          },
          onDown: function onDown(b, i, s) {
              console.log("down");
          }});

      controller_map = {
          'keyb': cursors,
          'gamepad':gamepad.pad1,
      };


      //
      // Set up the players according to gameSetup
      //
      this.game.players = [];
      this.game.gameSetup.players.forEach(function(o){
        // console.log(o);
        temp_sprite = that.game.add.sprite(
          Math.random() * that.game.width,
          Math.random() * that.game.height);

        temp_player = new JumpPlayer(
          that,
          temp_sprite,
          o.id,
          new JumpController(
            o.controller,
            controller_map[o.controller])
          );
          temp_player.init();
          temp_player.chooseSkin(o.skin);
          that.game.players.push(temp_player);
      });


      //
      // Set up the world / blocks
      //
      this.wb = new WorldBlocks(this.game);
      for (i=0; i<30; i++) {
        this.wb.addBlock(i, 18);
      }
     for (i=10; i<20; i++) {
        this.wb.addBlock(i, 8);
      }
    },
    update: function() {
      this.wb.update();

      this.game.physics.arcade.collide(this.wb.block_group, this.game.players[0].sprite);
      this.game.physics.arcade.collide(this.wb.block_group, this.game.players[1].sprite);

      this.game.players.forEach(function(o) { o.update(); });

      this.game.gui.update();
    },

    addBlock: function(player) {
        console.log("addblock");
        var sp, x, y,
          gridsize=19, comparetime;
        var sprite = this.game.players[0].sprite;
        var otherSprite = this.game.players[1].sprite;
        if (player == 1) {
            sprite = this.game.players[0].sprite;
            otherSprite = this.game.players[1].sprite;
        } else if (player == 2) {
            sprite = this.game.players[1].sprite;
            otherSprite = this.game.players[0].sprite;
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


