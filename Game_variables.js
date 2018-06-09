let Character_isCreated = false;
let Zoom = 2;
let Character,
    CurrentDungeon;
let MouseOnMap = {x:0,y:0};

class Texture {
  constructor(src,start_x,start_y,end_x,end_y) {
    this.data = new Image();
    this.start = [start_x || 0,start_y || 0];
    this.end = [end_x || 32,end_y ||32];
    this.data.src = src;
    this.states = 1;
    this.state = 1;
  }
  draw(x,y) {
    Canvas.ctx.drawImage(this.data,this.start[0],this.start[1],this.end[0],this.end[1],x,y,16*Zoom,16*Zoom);
  }
  set_states(amount = 1) {
    this.states = amount;
  }
  switch_state(state = "next") {
    if(state == "next") {
      this.state = (this.state < this.states) ? this.state+1 : 1;
    } else {
      this.state = (state <= this.states && state > 0) ? state : this.state;
    }
    this.start[0] = this.end[0]*(this.state-1);
  }

}
let Floor_Texture = new Texture("Graphics/x32/Tile_32.bmp");
let Wall_Texture  = new Texture("Graphics/x32/Wall_32.bmp") ;
let Chest_Texture = new Texture("Graphics/x32/Chest_32.png");
    Chest_Texture.set_states(3);

let Wall_Top_Bottom = new Texture("Graphics/x32/Wall_32.bmp");
let Wall_Left =       new Texture("Graphics/x32/Wall_Left_32.png");
let Wall_Right =       new Texture("Graphics/x32/Wall_Right_32.png");
let Wall_Corner_TL =  new Texture("Graphics/x32/Wall_CornerTL_32.bmp");
let Wall_Corner_TR =  new Texture("Graphics/x32/Wall_CornerTR_32.bmp");

let Field_Marker = new Texture("Graphics/x32/Field_Marker_32.png");
let Field_Marker2 = new Texture("Graphics/x32/Field_Marker2_32.png");

//let Chest_Texture = new Texture("Graphics/x32/Chest_32.png");
