class Dungeon  {
  constructor(size = 50) {
    this.map_data = new Matrix(size,size,1);
    this.size = size;
    this.rooms = [];
    this.generate();
    this.viewport = [0,0,50/Zoom,50/Zoom];
  }

  generate() {
    let max_rooms = random(this.size/3,this.size/2);
    let min_roomsize = Math.floor(this.size/10);
    let max_roomsize = Math.ceil(this.size/5);
    for(let i=0;i<max_rooms;i++) {
      let room = {};
        room.x = random(1,this.size-1-max_roomsize);
        room.y = random(1,this.size-1-max_roomsize);
        room.w = random(min_roomsize,max_roomsize);
        room.h = random(min_roomsize,max_roomsize);

      if(this.RoomCollide(room)) {
        i--;
        continue;
      }

      room.w--;
      room.h--;
      this.rooms.push(room)
    }

    this.rooms.forEach(room => {
      for(let i=0;i<room.w;i++) {
        for(let j=0;j<room.h;j++) {
          this.map_data.data[room.y+j][room.x+i] = 0;
        }
      }
    });
  }

  RoomCollide(room) {
    return this.rooms.some(check => {
      return (!((check.x + check.w < room.x) || (check.y + check.h < room.y) || (check.x > room.x + room.w) || (check.y > room.y + room.h)))
    });
  }

  mazegen() {
    let Points = new Array(this.size).fill(0);
    Points = Points.map(x => {return{row:random(0,this.size-1),col:random(0,this.size-1)}});
    Points[0] = {row:25/Zoom,col:25/Zoom}; //Spawn is always floor
    Points.forEach(x => {
      this.map_data.data[x.row][x.col] = 0;
      let randomP = Points[random(0,this.size-1)];
      let dY = randomP.row-x.row;
      let dX = randomP.col-x.col;
      for(let i=0;i<dY;i+=dY/dY) {
        this.map_data.data[x.row+i][x.col] = 0;
      }
      for(let i=0;i<dX;i+=dX/dX) {
        this.map_data.data[x.row][x.col+i] = 0;
      }
    });
  }

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
