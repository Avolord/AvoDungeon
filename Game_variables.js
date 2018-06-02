let Character_isCreated = false;
let Zoom = 2;
let Character,
    CurrentDungeon;

class Texture {
  constructor(src) {
    this.data = new Image();
    this.data.src = src;
  }
  draw(start_x,start_y,end_x,end_y,x,y) {
    Canvas.ctx.drawImage(this.data,start_x,start_y,end_x,end_y,x,y,16*Zoom,16*Zoom);
  }
}
let Floor_Texture = new Texture("Graphics/x32/Tile_32.bmp");
let Wall_Texture;
let Chest_Closed = new Texture("Graphics/x32/Chest_32.bmp");
