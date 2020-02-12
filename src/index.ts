import * as PIXI from 'pixi.js';
import * as Honycomb from 'honeycomb-grid';

// https://www.redblobgames.com/grids/hexagons/
// https://www.npmjs.com/package/honeycomb-grid

declare var require;
const flat = require("../images/nogrid/hexset_grid_boreal_flat_01.png");
const app = new PIXI.Application();

document.body.appendChild(app.view);


const Grid = Honycomb.defineGrid();
const grid = Grid.rectangle({width:24, height:24});

const gridContainer = new PIXI.Container;
app.stage.addChild(gridContainer);

const sprites = new Map<object, PIXI.Sprite>(); 

app.ticker.add(()=>{
    grid.forEach(hex=>
    {
        if (!sprites.has(hex))
        {
            let s = new PIXI.Sprite(PIXI.Texture.from(flat));
            gridContainer.addChild(s);
            sprites.set(hex, s);
        }
        else
        {
            let w = 18;
            let h = 14;
            let p = hex.toPoint();
            let s = sprites.get(hex);
            s.position.x = p.x * w;
            s.position.y = p.y * h;
        }
    });
});

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