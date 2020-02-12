import * as PIXI from 'pixi.js';
import { defineGrid } from 'honeycomb-grid';
declare var require;
const flat = require("../images/nogrid/hexset_grid_boreal_flat_01.png");
const app = new PIXI.Application();
// The application will create a canvas element for you that you
// can then insert into the DOM.
document.body.appendChild(app.view);



app.ticker.add(()=>{

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