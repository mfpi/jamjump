
  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      var i, sp;

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.sprite = this.game.add.sprite(
        this.game.width/2,
        this.game.height/2);
      this.sprite.loadTexture('allblocks', 22);

      // this.sprite.inputEnabled = true;

      this.game.physics.arcade.enable(this.sprite);
      this.sprite.body.collideWorldBounds = true;
      //this.sprite.body.bounce.setTo(1,1);
      this.sprite.body.gravity.y = 250;

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

      this.game.physics.arcade.collide(this.block_group, this.sprite);

      if (this.cursors.left.isDown) {
        this.sprite.body.velocity.x-=5;
      }
      if (this.cursors.right.isDown) {
        this.sprite.body.velocity.x+=5;
      }
      if (this.cursors.up.isDown) {

        // funny double jump mechanic
        if ( Math.abs(this.sprite.body.velocity.y) < 1) {
          this.sprite.body.velocity.y -= 250;
        }
      }
      if (this.cursors.down.isDown) {
      }

    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };

  module.exports = Play;
