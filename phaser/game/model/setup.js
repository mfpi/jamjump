function JumpSetup() {

  this.players = [
    { name:"player1",
      skin:1,
      id:1,
      controller:'keyb'
    },
    { name:"player2",
      skin:2,
      id:2,
      controller:'gamepad'
    },
    /*{ name:"player3",
      skin:2,
      id:3,
      controller:'gamepad2'
    },*/
  ];

  this.level = {};
  this.level_skin = 'blub';
  this.sound = 'blah';

}

JumpSetup.prototype = {
}

module.exports = JumpSetup;
