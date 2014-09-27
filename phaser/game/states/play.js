
  'use strict';
  var JumpPlayer = require('../model/player')
  function Play() {}
  Play.prototype = {
    create: function() {
      var i, sp;

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
        sp = this.block_group.create(i*25, this.game.height-150);
        sp.loadTexture('allblocks', 2);
        sp.body.immovable = true;
      }

     for (i=10; i<20; i++) {
        sp = this.block_group.create(i*25, this.game.height-350);
        sp.loadTexture('allblocks', 2);
        sp.body.immovable = true;
      }


      // Keyb control
      this.cursors = this.game.input.keyboard.createCursorKeys();

      // game.physics.enable( this.block_group , Phaser.Physics.ARCADE);
    },
    update: function() {

      this.myGameModelObject.update();

      var max_x_vel = 300;

      this.game.physics.arcade.collide(this.block_group, this.sprite);

      if (this.cursors.left.isDown) {
          this.sprite.body.velocity.x -= 30;
      }
      if (this.cursors.right.isDown) {
          this.sprite.body.velocity.x+= 30;
      }
      if (this.cursors.up.isDown) {

        // funny double jump mechanic
        if ( Math.abs(this.sprite.body.velocity.y) < 1) {
          this.sprite.body.velocity.y -= 250;
        }
      }
      if (this.cursors.down.isDown) {
        this.addBlock(this.sprite);
      }

      this.sprite.body.velocity.x *= 0.93;

      if ( this.sprite.body.velocity.x < - max_x_vel) {
        this.sprite.body.velocity.x = - max_x_vel;
      }
      if ( this.sprite.body.velocity.x > max_x_vel) {
        this.sprite.body.velocity.x = max_x_vel;
      }

    },
    clickListener: function() {
      this.game.state.start('gameover');
    },

    addBlock: function(sprite) {
        var sp, x, y,
          gridsize=25, comparetime;

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
