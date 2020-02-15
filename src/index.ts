import * as PIXI from 'pixi.js';
import * as Honycomb from 'honeycomb-grid';

// https://www.redblobgames.com/grids/hexagons/
// https://www.npmjs.com/package/honeycomb-grid

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

declare var require;
const flat = require("../images/hexes/grass.png");
const soldiers = require("../images/units/timber2.png");
const black = require("../images/hexes/black.png");
const app = new PIXI.Application();

document.body.appendChild(app.view);

const Hex = Honycomb.extendHex({
    orientation:'flat',
    size:0.5
});
const Grid = Honycomb.defineGrid(Hex);
const grid = Grid.rectangle({width:33, height:21});

const gridContainer = new PIXI.Container();
const unitContainer = new PIXI.Container();

const stage = app.stage;
const board = new PIXI.Container();
board.scale.set(32);
board.position.x = 100;
stage.addChild(board);
board.addChild(gridContainer);
board.addChild(unitContainer);

let marker = new PIXI.Sprite(PIXI.Texture.from(black));
marker.width = 1;
marker.height = 1;
board.addChild(marker);

board.interactive = true;
board.addListener("mousedown", (e)=>
{
    let p = e.data.getLocalPosition(board);
});

board.addListener("mousemove", (e)=>
{
    let p = e.data.getLocalPosition(board);
    let hexCoord = Grid.pointToHex(p);
    let hex = grid.get(hexCoord);
    if (hex != null)
    {
        marker.visible = true;
        let p = hex.toPoint();
        marker.position.set(p.x, p.y);
    }
    else
    {
        marker.visible = false;
    }
});

const sprites = new Map<object, PIXI.Sprite>(); 

app.ticker.add(()=>{
    grid.forEach(hex=>
    {
        if (!sprites.has(hex))
        {
            let s = new PIXI.Sprite(PIXI.Texture.from(flat));
            gridContainer.addChild(s);
            sprites.set(hex, s);
            s.width = 1;
            s.height = 1;
        }
        else
        {
            let w = 1;
            let h = 1;
            let p = hex.toPoint();
            let s = sprites.get(hex);
            s.position.x = p.x * w;
            s.position.y = p.y * h;
        }
    });
});

{
    let s = new PIXI.Sprite(PIXI.Texture.from(soldiers));
    s.width = 1;
    s.height = 1;
    unitContainer.addChild(s);

    let p = grid.get({x:1, y:1}).toPoint();
    s.position.set(p.x, p.y);
}

{
    let s = new PIXI.Sprite(PIXI.Texture.from(soldiers));
    s.width = 1;
    s.height = 1;
    unitContainer.addChild(s);

    let p = grid.get({x:3, y:2}).toPoint();
    s.position.set(p.x, p.y);
}