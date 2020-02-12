import * as PIXI from 'pixi.js';
import * as Honycomb from 'honeycomb-grid';

// https://www.redblobgames.com/grids/hexagons/
// https://www.npmjs.com/package/honeycomb-grid

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

declare var require;
const flat = require("../images/hexes/grass.png");
const soldiers = require("../images/units/soldiers.png");
const app = new PIXI.Application();

document.body.appendChild(app.view);

const Hex = Honycomb.extendHex({
    orientation:'flat',
    size:0.5
});
const Grid = Honycomb.defineGrid(Hex);
const grid = Grid.rectangle({width:33, height:21});

app.stage.scale.set(32);
const gridContainer = new PIXI.Container();
const unitContainer = new PIXI.Container();
app.stage.addChild(gridContainer);
app.stage.addChild(unitContainer);

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

//PIXI.Loader.shared.add("hex", "hex")
 /*
// load the texture we need
PIXI.loader.add('bunny', 'bunny.png').load((loader, resources) => {
 
    // This creates a texture from a 'bunny.png' image.
    const bunny = new PIXI.Sprite(resources.bunny.texture);
 
    // Setup the position of the bunny
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;
 
    // Rotate around the center
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;
 
    // Add the bunny to the scene we are building.
    app.stage.addChild(bunny);
 
    // Listen for frame updates
    app.ticker.add(() => {
         // each frame we spin the bunny around a bit
        bunny.rotation += 0.01;
    });
});*/