function hash(x, y) {
    return (x + ',' + y);
}

function WorldBlocks (game) {
    this.game = game;
    this.blocks = {};
    this.pendingRemoves = [];
    this.pendingAdds = [];
    this.block_group = this.game.add.group();
    this.block_group.enableBody = true;
    this.block_group.allowGravity = false;
    this.block_group.immovable = true;
}

WorldBlocks.prototype = {
    addBlock: function(x, y) {
        this.pendingAdds.push([x, y]);
    },
    toWorldCoords: function(x, y) {
        return [x*19, y*19];
    },
    update: function() {
        var that = this;
        this.pendingAdds.forEach(function (v, i) {
            that.blocks[hash(v[0], v[1])] = true;
            var coords = that.toWorldCoords(v[0], v[1]);
            sp = that.block_group.create(coords[0], coords[1]);
            sp.loadTexture('allblocks', 2);
            sp.body.immovable = true;
            sp.body.setSize(20, 20, 2, 2);
            });
        this.pendingAdds = [];
    }
};

module.exports = WorldBlocks
