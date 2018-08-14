var Engine = function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;
    canvas.width = 707;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        update(dt);
        render();

        lastTime = now;

        if (game_over === true) {
            refresh();
        }
        win.requestAnimationFrame(main);
    }
    function init() {
        generate();
        lastTime = Date.now();
        main();
    }
    function update(dt) {
        updateEntities(dt);
        if (start === true) {
            if (allEnemies[allEnemies.length - 1].x > 100) {
                generate();
            }
        }    
        checkCollisions();
        prize.render();
    }
    function updateEntities(dt) {       
        prize.update();
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }
    function render() {
        ctx.clearRect(0, 0, 707, 100);
        ctx.clearRect(0, 588, 707, 50);
        var rowImages = [
                '/images/grass-block.png',   // Top row is grass
                '/images/stone-block.png',   // Row 1 of 3 of stone
                '/images/stone-block.png',   // Row 2 of 3 of stone
                '/images/stone-block.png',   // Row 3 of 3 of stone
                '/images/grass-block.png',   // Row 1 of 2 of grass
                '/images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 7,
            row, col;
        var grid = [];
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                grid.push([row, col]);
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        renderEntities();
        if (start === false) {
            title();
        }
    }
    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        if (start === true) {
            prize.render();
            player.render();
        }
    }
    Resources.load([
        '/images/stone-block.png',
        '/images/grass-block.png',
        '/images/enemy-bug.png',
        '/images/char-boy.png',
        '/images/Gem Blue.png'
    ]);
    Resources.onReady(init);
    global.ctx = ctx;
}

window.onload = function () {
    window.onload = Engine(this);
}
