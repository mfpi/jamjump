
  'use strict';
  var JumpPlayer = require('../model/player')
  function Play() {}
  Play.prototype = {
    create: function() {
      var i, sp;
      // this.game.load.tilemap('platformer', 'assets/platformer.json', null, Phaser.Tilemap.TILED_JSON);
      // this.game.load.image('spritesheet', 'assets/spritesheet.png');

      // var map = this.game.add.tilemap('platformer');
      // map.addTilesetImage('spritesheet', 'spritesheet');
      // var layer = map.createLayer('World1');
      // layer.resizeWorld();

      this.myGameModelObject = new JumpPlayer();

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.sprite = this.game.add.sprite(
        this.game.width/2,
        this.game.height/2);
      this.sprite.loadTexture('allblocks', 22);

      // this.sprite.inputEnabled = true;

      this.game.physics.arcade.enable(this.sprite);
      this.sprite.body.collideWorldBounds = true;
      //this.sprite.body.bounce.setTo(1,1);
      this.sprite.body.gravity.y = 350;

      this.sprite.allowGravity = true;

      //this.sprite.body.velocity.x = this.game.rnd.integerInRange(-500,500);
      //this.sprite.body.velocity.y = this.game.rnd.integerInRange(-500,500);
      // this.sprite.events.onInputDown.add(this.clickListener, this);

      // Add some blocks to the world
      this.block_group = this.game.add.group();
      this.block_group.enableBody = true;
      this.block_group.allowGravity = false;
      this.block_group.immovable = true;

      for (i=0; i<30; i++) {
        sp = this.block_group.create(i*22, this.game.height-150);
        sp.loadTexture('allblocks', 2);
        sp.body.immovable = true;
      }

     for (i=10; i<20; i++) {
        sp = this.block_group.create(i*22, this.game.height-350);
        sp.loadTexture('allblocks', 2);
        sp.body.immovable = true;
      }


      // Keyb control
      this.cursors = this.game.input.keyboard.createCursorKeys();
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
        
      var w = this.game.input.keyboard.addKey(Phaser.Keyboard.W);

      // game.physics.enable( this.block_group , Phaser.Physics.ARCADE);
    },
    update: function() {

      this.myGameModelObject.update();

      var max_x_vel = 300;

      this.game.physics.arcade.collide(this.block_group, this.sprite);
        
      if (this.cursors.left.isDown) {
          this.moveVector.x -= 30;
      }
        
      this.moveVector.x += 30*this.gamepad.pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X);
        
      console.log(this.gamepad.pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X));

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
          gridsize=22, comparetime;

        comparetime = sprite.lastBlockSet || 0;

        if(this.game.time.now - comparetime > 1000) {

          x = Math.floor(sprite.body.x / gridsize) * gridsize;
          y = Math.floor(sprite.body.y / gridsize + 1) * gridsize;

          sp = this.block_group.create(x, y);
          sp.loadTexture('allblocks', 2);
          sp.body.immovable = true;

          sprite.lastBlockSet = this.game.time.now;
        }
    }
};

  module.exports = Play;


