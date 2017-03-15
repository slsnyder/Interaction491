

function Cell(game, xIndex, yIndex) {
    this.alive = START_STATE[xIndex][yIndex];
    this.x = xIndex * CELL_W;
    this.y = yIndex * CELL_H;
};

Cell.prototype = new Entity();
Cell.prototype.constructor = Cell;

Cell.prototype.someFunction = function () {
    return 0;
};

Cell.prototype.update = function () {
    Entity.prototype.update.call(this);
};

Cell.prototype.draw = function (ctx) {
    if (this.alive) {
        ctx.fillStyle = "forestgreen";
        ctx.fillRect(this.x, this.y, this.x + CELL_W, this.y + CELL_H);
    }
    ctx.strokeStyle = "lightgreen";
    ctx.strokeRect(this.x, this.y, this.x + CELL_W, this.y + CELL_H);
};


var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/bg.jpg");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    for (var i = 0; i < (CANVAS_H / CELL_H); i++) {
        for (var j = 0; j < (CANVAS_W / CELL_W); j++) {
            var cell = new Cell(gameEngine, i, j);
            gameEngine.addEntity(cell);
        }
    }
    gameEngine.init(ctx);
    gameEngine.start();
});
