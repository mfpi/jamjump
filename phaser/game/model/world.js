function Block() {
}

Block.prototype.handlePlayerCollision = function (playerSprite) {
}

function DefaultBlock() {
    this.texture = ['redboxblock', 1];
}

DefaultBlock.prototype = new Block();

function StoneBlock() {
    this.texture = ['stoneblock', 1];
}

StoneBlock.prototype = new Block();

function DeathBlock(game) {
    this.game = game;
    this.texture = ['deathblock', 1];
}

DeathBlock.prototype = new Block();
DeathBlock.prototype.handlePlayerCollision = function (player) {
    player.sprite.kill();
    this.game.stateWinSuccess = false;
    this.game.state.start('status');
}

function WinBlock(game) {
    this.game = game;
    this.texture = ['winblock', 1];
}

WinBlock.prototype = new Block();
WinBlock.prototype.handlePlayerCollision = function (player) {
    this.game.winMap[p.playerId] = true;
    if (this.game.winMap['1'] && that.game.winMap['2']) {
        this.game.level = (this.game.level + 1) % this.game.levelData.length;
        this.game.stateWinSuccess = true;
        this.game.state.start('status');
    }
}

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

    this.blocktypes = {
        'default': {
            constr:new DefaultBlock(),
            perma:false,
            texture:['redboxblock', 1],
            kills:false,
        },
        'stone': {
            constr:new StoneBlock(),
            perma:true,
            texture:['stoneblock', 1],
            kills:false,
        },
        'death': {
            constr:new DeathBlock(game),
            perma:true,
            texture:['deathblock', 1],
            kills:true,
        },
        'win': {
            constr:new WinBlock(game),
            perma:true,
            texture:['winblock', 1],
            kills:false,
            win:true,
        },

    };
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
    addBlock: function(x, y, t) {
        var t = t || 'default';
        this.pendingAdds.push({x:x, y:y, t:t});
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
        var blockCoords2 = this.fromWorldCoords(x, y);
        var blockCoords = {x:blockCoords2.x+1, y:blockCoords2.y};
        var that = this;
        var nearCoords = [];
        var keys = Object.keys(this.blocks);

        var coords = [
            [blockCoords.x, blockCoords.y],
            [blockCoords.x, blockCoords.y - 1],
            [blockCoords.x - 1, blockCoords.y - 1],
            [blockCoords.x + 1, blockCoords.y - 1],
            [blockCoords.x, blockCoords.y + 1],
            [blockCoords.x-1, blockCoords.y],
            [blockCoords.x+1, blockCoords.y],
            [blockCoords.x-1, blockCoords.y+1],
            [blockCoords.x, blockCoords.y+1],
            [blockCoords.x+1, blockCoords.y+1],

            [blockCoords.x-2, blockCoords.y-2],
            [blockCoords.x-1, blockCoords.y-2],
            [blockCoords.x, blockCoords.y-2],
            [blockCoords.x+1, blockCoords.y-2],
            [blockCoords.x+2, blockCoords.y-2],

            [blockCoords.x-2, blockCoords.y+2],
            [blockCoords.x-1, blockCoords.y+2],
            [blockCoords.x, blockCoords.y+2],
            [blockCoords.x+1, blockCoords.y+2],
            [blockCoords.x+2, blockCoords.y+2],

            [blockCoords.x-2, blockCoords.y-1],
            [blockCoords.x+2, blockCoords.y-1],
            [blockCoords.x-2, blockCoords.y],
            [blockCoords.x+2, blockCoords.y],
            [blockCoords.x-2, blockCoords.y+1],
            [blockCoords.x+2, blockCoords.y+1],

            [blockCoords.x-3, blockCoords.y-3],
            [blockCoords.x-2, blockCoords.y-3],
            [blockCoords.x-1, blockCoords.y-3],
            [blockCoords.x, blockCoords.y-3],
            [blockCoords.x+1, blockCoords.y-3],
            [blockCoords.x+2, blockCoords.y-3],
            [blockCoords.x+3, blockCoords.y-3],

            [blockCoords.x-3, blockCoords.y+3],
            [blockCoords.x-2, blockCoords.y+3],
            [blockCoords.x-1, blockCoords.y+3],
            [blockCoords.x, blockCoords.y+3],
            [blockCoords.x+1, blockCoords.y+3],
            [blockCoords.x+2, blockCoords.y+3],
            [blockCoords.x+3, blockCoords.y+3],

            [blockCoords.x-3, blockCoords.y+2],
            [blockCoords.x+3, blockCoords.y+2],
            [blockCoords.x-3, blockCoords.y+1],
            [blockCoords.x+3, blockCoords.y+1],
            [blockCoords.x-3, blockCoords.y],
            [blockCoords.x+3, blockCoords.y],
            [blockCoords.x-3, blockCoords.y-1],
            [blockCoords.x+3, blockCoords.y-1],
            [blockCoords.x-3, blockCoords.y-2],
            [blockCoords.x+3, blockCoords.y-2],

            [blockCoords.x-4, blockCoords.y+4],
            [blockCoords.x-3, blockCoords.y+4],
            [blockCoords.x-2, blockCoords.y+4],
            [blockCoords.x-1, blockCoords.y+4],
            [blockCoords.x, blockCoords.y+4],
            [blockCoords.x+1, blockCoords.y+4],
            [blockCoords.x+2, blockCoords.y+4],
            [blockCoords.x+3, blockCoords.y+4],
            [blockCoords.x+4, blockCoords.y+4],


            [blockCoords.x-4, blockCoords.y-4],
            [blockCoords.x-3, blockCoords.y-4],
            [blockCoords.x-2, blockCoords.y-4],
            [blockCoords.x-1, blockCoords.y-4],
            [blockCoords.x, blockCoords.y-4],
            [blockCoords.x+1, blockCoords.y-4],
            [blockCoords.x+2, blockCoords.y-4],
            [blockCoords.x+3, blockCoords.y-4],
            [blockCoords.x+4, blockCoords.y-4],

            [blockCoords.x-4, blockCoords.y+3],
            [blockCoords.x+4, blockCoords.y+3],
            [blockCoords.x-4, blockCoords.y+2],
            [blockCoords.x+4, blockCoords.y+2],
            [blockCoords.x-4, blockCoords.y+1],
            [blockCoords.x+4, blockCoords.y+1],
            [blockCoords.x-4, blockCoords.y],
            [blockCoords.x+4, blockCoords.y],
            [blockCoords.x-4, blockCoords.y-1],
            [blockCoords.x+4, blockCoords.y-1],
            [blockCoords.x-4, blockCoords.y-2],
            [blockCoords.x+4, blockCoords.y-2],
            [blockCoords.x-4, blockCoords.y-3],
            [blockCoords.x+4, blockCoords.y-3],

            [blockCoords.x-5, blockCoords.y+4],
            [blockCoords.x+5, blockCoords.y+4],
            [blockCoords.x-5, blockCoords.y+3],
            [blockCoords.x+5, blockCoords.y+3],
            [blockCoords.x-5, blockCoords.y+2],
            [blockCoords.x+5, blockCoords.y+2],
            [blockCoords.x-5, blockCoords.y+1],
            [blockCoords.x+5, blockCoords.y+1],
            [blockCoords.x-5, blockCoords.y],
            [blockCoords.x+5, blockCoords.y],
            [blockCoords.x-5, blockCoords.y-1],
            [blockCoords.x+5, blockCoords.y-1],
            [blockCoords.x-5, blockCoords.y-2],
            [blockCoords.x+5, blockCoords.y-2],
            [blockCoords.x-5, blockCoords.y-3],
            [blockCoords.x+5, blockCoords.y-3],
            [blockCoords.x-5, blockCoords.y-4],
            [blockCoords.x+5, blockCoords.y-4],

            [blockCoords.x-4, blockCoords.y-5],
            [blockCoords.x-3, blockCoords.y-5],
            [blockCoords.x-2, blockCoords.y-5],
            [blockCoords.x-1, blockCoords.y-5],
            [blockCoords.x, blockCoords.y-5],
            [blockCoords.x+1, blockCoords.y-5],
            [blockCoords.x+2, blockCoords.y-5],
            [blockCoords.x+3, blockCoords.y-5],
            [blockCoords.x+4, blockCoords.y-5],
            [blockCoords.x+5, blockCoords.y-5],

            [blockCoords.x-4, blockCoords.y+5],
            [blockCoords.x-3, blockCoords.y+5],
            [blockCoords.x-2, blockCoords.y+5],
            [blockCoords.x-1, blockCoords.y+5],
            [blockCoords.x, blockCoords.y+5],
            [blockCoords.x+1, blockCoords.y+5],
            [blockCoords.x+2, blockCoords.y+5],
            [blockCoords.x+3, blockCoords.y+5],
            [blockCoords.x+4, blockCoords.y+5],
            [blockCoords.x+5, blockCoords.y+5],
        ];


        var foundNothing = coords.every(function (v, k) {
            if (that.blocks[hash(v[0], v[1])]) {
                var b = that.blocks[hash(v[0], v[1])];
                if (!that.blocktypes[b.k.t].perma)
                {
                    that.pendingRemoves.push({key:that.blocks[hash(v[0], v[1])]})
                    return false;
                }
            }
            return true;
            });

        if (foundNothing == false) {
            return;
            }
        //console.log(blockCoords);
        //console.log(that.pendingRemoves);

        keys.forEach(function (v, k) {

            // Consider only blocks that do not have perma-flag
            if ( ! that.blocktypes[that.blocks[v].k.t].perma ) {
                nearCoords.push(that.blocks[v]);
            }
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
            sp.loadTexture(that.blocktypes[v.t].texture[0], that.blocktypes[v.t].texture[1]);
            sp.body.immovable = true;
            sp.body.setSize(20, 20, 2, 2);
            sp.model = that.blocktypes[v.t].constr;
            that.blocks[hash(v.x, v.y)] = {k:v, v:sp};

            });
        this.pendingAdds = [];

        this.pendingRemoves.forEach(function (v, i) {
            if (v.key) {
                v.key.v.kill();
                delete that.blocks[hash(v.key.k.x, v.key.k.y)]
            }
        });
        this.pendingRemoves = [];
    }
};

module.exports = WorldBlocks
