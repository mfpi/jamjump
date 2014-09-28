function JumpController(controllerType, controllerHandler, keyHandler) {
    if (controllerType == 'keyb') {
      return new JumpKeyboardController(controllerHandler, keyHandler);
    } else if (controllerType == 'gamepad') {
      return new JumpGamepadController(controllerHandler);
    } else {
      throw "Unknown controller-type ! Use 'keyb' or 'gamepad'";
    }
}


function JumpKeyboardController(controllerHandler, keyHandler) {
  this.handler = controllerHandler;
  this.keyHandler = keyHandler;
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
    // if (this.handler.isDown(Phaser.Keyboard.KEY_W) {
    //   y-=1.0;
    // }
    // if (this.handler.down.isDown) {
    //   y+=1.0;
    // }
    return {x:x, y:y};
  },

  getButtonA: function() {
    return this.handler.up.isDown;
  },
    
  getButtonBUp: function() {
    //return this.handler.up.isUp;
    var k = this.keyHandler.addKey(Phaser.Keyboard.SPACEBAR);
    return k.isUp;
  },

  getButtonB: function() {
    //return this.handler.up.isDown;
    return this.keyHandler.isDown(Phaser.Keyboard.SPACEBAR);
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
    return this.handler.isDown(Phaser.Gamepad.XBOX360_X);
  },

  getButtonB: function() {
    return this.handler.isDown(Phaser.Gamepad.XBOX360_A);
  },

  getButtonBUp: function() {
    return this.handler.isUp(Phaser.Gamepad.XBOX360_A);
  },

};


module.exports = JumpController;
