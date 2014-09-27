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
  ];

  this.level = {};
  this.level_skin = 'blub';
  this.sound = 'blah';

}

JumpSetup.prototype = {
}

module.exports = JumpSetup;
