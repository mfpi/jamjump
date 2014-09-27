function GUI(game, font) {
    this.game = game;
    this.game.gui = this;
    this.font = font;
    this.bmpText;
    this.textpos=0;

    // keep tracks of textparts on the screen
    //this.texts=[];

    //this.lines=['Test'];
    //this.linecounter = 0;
}

GUI.prototype = {

    create: function () {

    },

    update: function () {
        this.bmpText = this.game.add.bitmapText(
            this.textpos,
            this.game.camera.view.height - 100,
            'nokia',
            "HALLO", 64);
        this.bmpText.fixedToCamera = true;

    }
};

module.exports = GUI;
