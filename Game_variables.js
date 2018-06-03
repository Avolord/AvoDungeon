let Character_isCreated = false;
let Zoom = 1;
let Character,
    CurrentDungeon;

class Texture {
  constructor(src,start_x,start_y,end_x,end_y) {
    this.data = new Image();
    this.start = [start_x || 0,start_y || 0];
    this.end = [end_x || 32,end_y ||32];
    this.data.src = src;
  }
  draw(x,y) {
    Canvas.ctx.drawImage(this.data,this.start[0],this.start[1],this.end[0],this.end[1],x,y,16*Zoom,16*Zoom);
  }
}
let Floor_Texture = new Texture("Graphics/x32/Tile_32.bmp");
let Wall_Texture  = new Texture("Graphics/x32/Wall_32.bmp") ;
let Chest_Texture = new Texture("Graphics/x32/Chest_32.png");

let Wall_Top_Bottom = new Texture("Graphics/x32/Wall_32.bmp");
let Wall_Left =       new Texture("Graphics/x32/Wall_Left_32.png");
let Wall_Right =       new Texture("Graphics/x32/Wall_Right_32.png");
let Wall_Corner_TL =  new Texture("Graphics/x32/Wall_CornerTL_32.bmp");
let Wall_Corner_TR =  new Texture("Graphics/x32/Wall_CornerTR_32.bmp");
