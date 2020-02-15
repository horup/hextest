import * as PIXI from 'pixi.js';
import * as Honycomb from 'honeycomb-grid';
declare var require;
const flat = require("../images/hexes/grass.png");

export const Hex = Honycomb.extendHex({
    orientation:'flat',
    size:0.5
});
export const Grid = Honycomb.defineGrid(Hex);


export class Board extends PIXI.Container
{
    gridContainer:PIXI.Container = new PIXI.Container();
    grid = Grid.rectangle({width:33, height:21});
    hexSprites = new Map<object, PIXI.Sprite>(); 
    
    constructor()
    {
        super();
        this.scale.set(32);
        this.addChild(this.gridContainer);
    }

    update()
    {
        this.grid.forEach(hex=>
        {
            if (!this.hexSprites.has(hex))
            {
                let s = new PIXI.Sprite(PIXI.Texture.from(flat));
                this.gridContainer.addChild(s);
                this.hexSprites.set(hex, s);
                s.width = 1;
                s.height = 1;
            }
            else
            {
                let w = 1;
                let h = 1;
                let p = hex.toPoint();
                let s = this.hexSprites.get(hex);
                s.position.x = p.x * w;
                s.position.y = p.y * h;
            }
        });
    }
}