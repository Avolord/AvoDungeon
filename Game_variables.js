let Character_isCreated = false;
let Zoom = 2;
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
let Chest_Texture = new Texture("Graphics/x32/Chest_32.png",64,0);
