import * as PIXI from 'pixi.js';
import * as Honycomb from 'honeycomb-grid';
declare var require;
const white = require("../images/hexes/white.png");

export const colors = 
{
    green:
    {
        light:0x2DCC72,
        dark:0x28AC60
    },
    blue:
    {
        light:0x2B82B8,
        dark:0x2B82B8
    },
    grey:
    {
        light:0x95A5A4,
        dark:0x808C8C
    }
}

export const Hex = Honycomb.extendHex({
    orientation:'flat',
    size:0.5
});
export const Grid = Honycomb.defineGrid(Hex);

export class HexPiece extends PIXI.Sprite
{
    constructor()
    {
        super(PIXI.Texture.from(white));
        this.tint = colors.green.light;
    }
}

export class Board extends PIXI.Container
{
    gridContainer:PIXI.Container = new PIXI.Container();
    grid = Grid.rectangle({width:33, height:21});
    pieces = new Map<object, HexPiece>(); 
    
    constructor()
    {
        super();
        this.scale.set(32);
        this.initialize();
    }

    initialize()
    {
        this.removeChildren();
        this.gridContainer = new PIXI.Container();
        this.grid = Grid.rectangle({width:33, height:19});
        this.pieces = new Map<object, HexPiece>(); 
        this.addChild(this.gridContainer);
        
        this.update();
        this.set(15,10, 3, colors.blue.light);
        this.set(10,12, 3, colors.blue.light);
        this.set(17,8, 2, colors.blue.light);
        this.set(20,5, 2, colors.blue.light);

        this.set(5,5, 3, colors.grey.dark);
        this.set(5,5, 2, colors.grey.light);

        this.set(24,15, 5, colors.grey.dark);
        this.set(23,15, 2, colors.grey.light);
        this.set(25,14, 2, colors.grey.light);
    }

    set(cx:number, cy:number, r:number, tint:number)
    {
        let center = this.grid.get({x:cx, y:cy});
        if (center)
        {
            for (let y = cy - r; y <= cy + r; y++)
            for (let x = cx - r; x <= cx + r; x++)
            {
                let hex = this.grid.get({x:x, y:y});
                if (hex)
                {
                    let between = this.grid.hexesBetween(center, hex);
                    if (between.length <= r)
                    {
                        let s = this.pieces.get(hex);
                        if (s!=null)
                        {
                            s.tint = tint;
                        }
                    }
                }
            }
        }
    }

    update()
    {
        this.grid.forEach(hex=>
        {
            let s = this.pieces.get(hex);
            if (!s)
            {
                s = new HexPiece();
                this.gridContainer.addChild(s);
                this.pieces.set(hex, s);
                s.width = 1;
                s.height = 1;
            }

            let w = 1;
            let h = 1 + 1/8;
            let p = hex.toPoint();
            s.position.x = p.x * w;
            s.position.y = p.y * h;
        });
    }
}