class Dungeon  {
  constructor(size = 50) {
    this.map_data = new Matrix(size,size,1);
    this.size = size;
    this.generate();
    this.viewport = [0,0,50/Zoom,50/Zoom];
  }

  generate() {
    let max_rooms = Math.floor(this.size/5);
    let min_roomsize = Math.floor(this.size/20);
    let max_roomsize = Math.ceil(this.size/5);
    for(let i=0;i<max_rooms;i++) {
      let cols = random(0,this.size-1-max_roomsize);
      let rows = random(0,this.size-1-max_roomsize);
      let width = random(min_roomsize,max_roomsize);
      let height = random(min_roomsize,max_roomsize);
      for(let j=0;j<width;j++) {
        for(let k=0;k<height;k++) {
          this.map_data.data[rows+k][cols+j] = 0;
        }
      }
    }

  }

  // move_map_by_character() {
  //   switch(Character.pos.x) {
  //     case
  //   }
  // }

  draw() {
    //this.move_map_by_character();
    for(let cols=this.viewport[0];cols<this.viewport[2];cols++) {
      for(let rows=this.viewport[1];rows<this.viewport[3];rows++) {
        switch(this.map_data.data[rows][cols]) {
          case 0:
            Floor_Texture.draw((cols-this.viewport[0])*16*Zoom,(rows-this.viewport[1])*16*Zoom);
          break;
          default:
            Wall_Texture.draw((cols-this.viewport[0])*16*Zoom,(rows-this.viewport[1])*16*Zoom);
          break;
        }
      }
    }
  }

  scroll(direction = "w") {
    switch(direction) {
      case "w":
      if(this.viewport[3] < this.size) {
        this.viewport[3]++;
        this.viewport[1]++;
      }
      break;
      case "a":
      if(this.viewport[2] < this.size) {
        this.viewport[0]++;
        this.viewport[2]++;
      }
      break;
      case "s":
      if(this.viewport[1] > 0) {
        this.viewport[3]--;
        this.viewport[1]--;
      }
      break;
      case "d":
      if(this.viewport[0] > 0) {
        this.viewport[0]--;
        this.viewport[2]--;
      }
      break;
    }
  }

}

 function zoom(value = 2) {
  Zoom = (50/value <= CurrentDungeon.size) ? value : Zoom;
  CurrentDungeon.viewport = [0,0,50/Zoom,50/Zoom];
}

function checkMap(x,y) {
  if(x<0 || x>CurrentDungeon.size || y<0 || y>CurrentDungeon.size)
  return 1;
  else
  return CurrentDungeon.map_data.data[y][x];
}
