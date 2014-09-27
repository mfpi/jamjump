function JumpController(controllerType, controllerHandler) {
    if (controllerType !== 'keyb' && controllerType !== 'gamepad') {
        throw "Unknown controller-type ! Use 'keyb' or 'gamepad'";
    }

    // this.direction = {x:0.0, y:0.0};
    this.type = controllerType;
    this.handler = controllerHandler;

}

JumpController.prototype = {

  getDirection: function() {

    var x=0, y=0;

    if (this.type == 'keyb') {
        if (this.handler.right.isDown) {
          x+=1.0;
        }
        if (this.handler.left.isDown) {
          x-=1.0;
        }
        if (this.handler.up.isDown) {
          y-=1.0;
        }
        if (this.handler.down.isDown) {
          y+=1.0;
        }
    } else if (this.type == 'gamepad') {
        return this.handler.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X);
    }

    return {x:x, y:y};
  },

  getButtonA: function() {
    if (this.type == 'keyb') {
        return this.handler.down.isDown;
    } else if (this.type == 'gamepad') {
        return this.isDown(Phaser.Gamepad.XBOX360_A);
    }
  },

  getButtonB: function() {
    if (this.type == 'keyb') {
        return this.handler.up.isDown;
    } else if (this.type == 'gamepad') {
        return this.isDown(Phaser.Gamepad.XBOX360_X);
    }
  },
};


module.exports = JumpController;
