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

var gridsize=19;

WorldBlocks.prototype = {
    canAddBlock: function(x,y) {
	    var that = this;
	    if(that.blocks[hash(x, y)])
		{
		    return 0;
		}
        return 1;			
	    
	},
    addBlock: function(x, y) {
	    
        this.pendingAdds.push({x:x, y:y});
    },
    toWorldCoords: function(x, y) {
        return {x:x*19, y:y*19};
    },
    fromWorldCoords: function (x, y) {
        x = Math.floor(x / gridsize);
        y = Math.floor(y / gridsize + 1);
        return {x:x, y:y};
    },
    removeClosestTo: function (x, y) {
        var blockCoords = this.fromWorldCoords(x, y);
        var that = this;
        var nearCoords = [];
        var keys = Object.keys(this.blocks);
        keys.forEach(function (v, k) {
            nearCoords.push(that.blocks[v]);
            });

        nearCoords.sort(function (a, b) {
            if ((a.x - blockCoords.x)^2 + (a.y - blockCoords.y)^2 >
                (b.x - blockCoords.x)^2 + (b.y - blockCoords.y)^2)
                {
                    return 1;
                } else if ((a.x - blockCoords.x)^2 + (a.y - blockCoords.y)^2 == (b.x - blockCoords.x)^2 + (b.y - blockCoords.y)^2)
                {
                    return 0;
                } else  {
                    return -1;
                }
            });

        var v = nearCoords[0];
        that.pendingRemoves.push(
            {key:v
            });
        return;
    },
    update: function() {
        var that = this;
        this.pendingAdds.forEach(function (v, i) {
            var coords = that.toWorldCoords(v.x, v.y);
			
            sp = that.block_group.create(coords.x, coords.y);
            sp.loadTexture('redboxblock', 1);
            sp.body.immovable = true;
            sp.body.setSize(20, 20, 2, 2);
			

            // HACK !
            // TODO : introduce a block type or so ...
            //  this curde check prevnents "the ground" from beeing indexed,
            //  thus, it is never considered for deletion
            if (v.y < 30) {
                that.blocks[hash(v.x, v.y)] = {k:v, v:sp};
            }

            });
        this.pendingAdds = [];

        this.pendingRemoves.forEach(function (v, i) {
            // console.log(v);
            if (v.key) {
                v.key.v.kill();
                delete that.blocks[hash(v.key.k.x, v.key.k.y)]
            }
        });
        this.pendingRemoves = [];
    }
};

module.exports = WorldBlocks
