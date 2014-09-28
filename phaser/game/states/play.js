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
          //onDown: function onDown(b, i, s) {
          //    console.log("down");
          //}
        });

      controller_map = {
          'keyb': cursors,
          'gamepad':gamepad.pad2,
      };


      //
      // Set up the players according to gameSetup
      //
      this.game.players = [];
      this.game.myPlayerGroup = this.game.add.group();
      this.game.gameSetup.players.forEach(function(o){
        // console.log(o);
        temp_sprite = that.game.add.sprite(
          Math.random() * that.game.width,
          Math.random() * (that.game.height / 2),
          'runner');

        temp_sprite.animations.add('run');
        temp_sprite.animations.play('run', 15, true);

        temp_player = new JumpPlayer(
          that,
          temp_sprite,
          o.id,
          new JumpController(
            o.controller,
            controller_map[o.controller],
            that.game.input.keyboard)
          );
          temp_player.init();
          temp_player.chooseSkin(o.skin);
          that.game.players.push(temp_player);

          // Add sprite to group of players
          that.game.myPlayerGroup.add(temp_sprite);
      });


      //
      // Set up the world / blocks
      //
      this.wb = new WorldBlocks(this.game);


      // LEVEL / BLOCKS --------------------------------------
      // TODO : move this to levelLoader component
      //
      // Load the level from the textfile
      //
      var theLevel = this.game.testMyLevel.file.data;
      var x = -1, y = 0;
      for (var ch in theLevel) {
        if (theLevel[ch] == "\n") {
          y++;
          x = -1;
        }

        if (theLevel[ch] === "1") {
          this.wb.addBlock(x, y);
        } else if (theLevel[ch] === "2") {
          this.wb.addBlock(x, y, 'stone');
        } else if (theLevel[ch] === "3") {
          this.wb.addBlock(x, y, 'death');
        }

        x++;
      }

      // New jump mechanics nees a floor of blocks :
      //for (i=0; i<50; i++) {
      //  this.wb.addBlock(i, 30, 'stone');
      //}

      // ------------------------------------------------------

      // Background
      temp_sprite = this.game.add.sprite(0,0, 'background2');

      // All in group - draws in that order
      this.game.rootGroup = this.game.add.group();
      this.game.rootGroup.add(temp_sprite);
      this.game.rootGroup.add(this.wb.block_group);
      this.game.rootGroup.add(that.game.myPlayerGroup);


      // Set 1 color bg
      this.game.stage.backgroundColor = 0x333333;


    },
    update: function() {
      var that = this;

      // Update world-blocks
      this.wb.update();

      // Update all players
      this.game.players.forEach(function(p) {

        // that.game.debug.body(p.sprite);

        // Physics - check collide
        that.game.physics.arcade.collide(
          that.wb.block_group,
          p.sprite,
          function (sprite, group) {

            if (that.wb.blocktypes[group.model.t].kills) {
              sprite.kill();
            }

            p.registerBlockTouch(group);
          });

        // Player updates
        p.update();
      });

      this.game.gui.update();
    },

    addBlock: function(player) {
      var sp, x, y,
          gridsize=19;

      var sprite = this.game.players[0].sprite;
      var otherSprite = this.game.players[1].sprite;

      if (player == 1) {
          sprite = this.game.players[0].sprite;
          otherSprite = this.game.players[1].sprite;
      } else if (player == 2) {
          sprite = this.game.players[1].sprite;
          otherSprite = this.game.players[0].sprite;
      }

      x = Math.floor(sprite.body.x / gridsize);
      y = Math.floor(sprite.body.y / gridsize + 1);

      if(this.wb.canAddBlock(x,y)) {
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


