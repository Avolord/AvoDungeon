class Dungeon  {
  constructor(size = 52) {
    this.map_data = new Matrix(size,size);
    this.map_data.random();
    this.size = size;
    this.viewport = [0,0,50/Zoom,50/Zoom];
  }

  draw() {
    for(let cols=this.viewport[0];cols<this.viewport[2];cols++) {
      for(let rows=this.viewport[1];rows<this.viewport[3];rows++) {
        switch(this.map_data.data[rows][cols]) {
          case 0:
            Floor_Texture.draw(0,0,16*Zoom,16*Zoom,(cols-this.viewport[0])*16*Zoom,(rows-this.viewport[1])*16*Zoom);
          break;
          default:
            //Chest_Closed.draw(0,0,16*Zoom,16*Zoom,(cols-this.viewport[0])*16*Zoom,(rows-this.viewport[1])*16*Zoom);
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

  Zoom(value = 2) {

  }

}
