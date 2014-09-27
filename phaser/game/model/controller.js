function JumpController(controllerType, controllerHandler) {
    if (controllerType == 'keyb') {
      return new JumpKeyboardController(controllerHandler);
    } else {
      return new JumpGamepadController(controllerHandler);
    } else {
      throw "Unknown controller-type ! Use 'keyb' or 'gamepad'";
    }
}


function JumpKeyboardController(controllerHandler) {
  this.handler = controllerHandler;
}

JumpKeyboardController.prototype = {
  getDirection: function() {
    var x=0, y=0;

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
    return {x:x, y:y};
  },

  getButtonA: function() {
    return this.handler.down.isDown;
  },

  getButtonB: function() {
    return this.handler.up.isDown;
  },
};


function JumpGamepadController(controllerHandler) {
    this.handler = controllerHandler;
}

JumpGamepadController.prototype = {

  getDirection: function() {
      var x = this.handler.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X);
      var y = this.handler.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y);
      return {x:x, y:y};
  },

  getButtonA: function() {
    return this.handler.isDown(Phaser.Gamepad.XBOX360_A);
  },

  getButtonB: function() {
    return this.handler.isDown(Phaser.Gamepad.XBOX360_X);
  },
};


module.exports = JumpController;
