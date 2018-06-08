class Dungeon  {
  constructor(size = 50) {
    this.map_data = new Matrix(size,size,0);
    //this.light_map.random(0,10);
    this.size = size;
    this.rooms = [];
    this.chests = [];
    this.batch_size = 50;
    this.fully_lit = false;
    this.viewport = [0,0,50/Zoom,50/Zoom];
    this.generate(1);
    this.light_map = this.generate_light_map();
    this.player_spawn = this.PlayerSpawn();
  }

  generate(iterations = 1) {
    let b_start = 1;
    for(let iter=0;iter<iterations;iter++) {
    let max_rooms = 5//random(this.size/5,this.size/4);
    let min_roomsize = 5;
    let max_roomsize = 10;
    this.rooms[0] = {x:random(1,50/Zoom-10),y:random(1,50/Zoom-10),w:random(5,10),h:random(5,10)}; //first Room in viewport
    for(let i=1;i<max_rooms;i++) {
      let room = {};
        room.x = random(1,this.batch_size-1-max_roomsize);
        room.y = random(1,this.batch_size-1-max_roomsize);
        room.w = random(min_roomsize,max_roomsize);
        room.h = random(min_roomsize,max_roomsize);

      if(this.RoomCollide(room,"",2)) {
        i--;
        continue;
      }

      room.w--;
      room.h--;
      this.rooms.push(room);
      this.SquashRooms(10);
    }
  }
    this.build_rooms();
    this.build_corridors(1);
    this.build_walls();
    this.SpawnChests();
}

  build_rooms() {
    this.rooms.forEach(room => {
      for(let i=0;i<=room.w;i++) {
        for(let j=0;j<=room.h;j++) {
          this.map_data.data[room.y+j][room.x+i] = 1;
        }
      }
    });
  }

  build_corridors(corridors_per_room = 1) {
    for(let i=0;i<corridors_per_room;i++) {
    this.rooms.forEach(room => {
      let roomA = room;
      let roomB = this.ClosestRoom(roomA);
      let roomC = this.rooms[random(0,this.rooms.length-1)];

      let PointA = {
        x:random(roomA.x,roomA.x+roomA.w-1),
        y:random(roomA.y,roomA.y+roomA.h-1)
      };
      let PointB = {
        x:random(roomB.x,roomB.x+roomB.w-1),
        y:random(roomB.y,roomB.y+roomB.h-1)
      };
      let PointC = {
        x:random(roomC.x,roomC.x+roomC.w-1),
        y:random(roomC.y,roomC.y+roomC.h-1)
      };

      while((PointB.x != PointA.x) || (PointB.y != PointA.y)) {
        if(PointB.x != PointA.x) {
          PointB.x = (PointA.x < PointB.x) ? PointB.x-1 : PointB.x+1;
        }
         else if(PointA.y != PointB.y) {
          PointB.y = (PointA.y < PointB.y) ? PointB.y-1 : PointB.y+1;
        }
        this.map_data.data[PointB.y][PointB.x] = 1;
      }

      // while((PointC.x != PointA.x) || (PointC.y != PointA.y)) {
      //   if(PointC.x != PointA.x) {
      //     PointC.x = (PointA.x < PointC.x) ? PointC.x-1 : PointC.x+1;
      //   }
      //    else if(PointA.y != PointC.y) {
      //     PointC.y = (PointA.y < PointC.y) ? PointC.y-1 : PointC.y+1;
      //   }
      //   this.map_data.data[PointC.y][PointC.x] = 1;
      // }
    });
  }
  }

  build_walls() {
    for(let rows = 1; rows<this.map_data.rows-1; rows++) {
      for(let cols = 1; cols<this.map_data.cols-1; cols++) {
        if(this.map_data.data[rows][cols] == 1) {
          if(this.map_data.data[rows-1][cols] == 0)   {this.map_data.data[rows-1][cols]    = 2} //Top
          if(this.map_data.data[rows+1][cols] == 0)   {this.map_data.data[rows+1][cols]    = 2} //Bottom
          if(this.map_data.data[rows][cols-1] == 0)   {this.map_data.data[rows][cols-1]    = 3} //Left
          if(this.map_data.data[rows][cols+1] == 0)   {this.map_data.data[rows][cols+1]    = 4} //Right
        }
      }
    }
    for(let rows = 1; rows<this.map_data.rows-1; rows++) {
      for(let cols = 1; cols<this.map_data.cols-1; cols++) {
        if(this.map_data.data[rows][cols] == 1) {
          if(this.map_data.data[rows-1][cols-1] == 0) {this.map_data.data[rows-1][cols-1]  = 5} //Top-Left
          if(this.map_data.data[rows-1][cols+1] == 0) {this.map_data.data[rows-1][cols+1]  = 6} //Top-Right
          if(this.map_data.data[rows+1][cols+1] == 0) {this.map_data.data[rows+1][cols+1]  = 2} //Bottom-Right
          if(this.map_data.data[rows+1][cols-1] == 0) {this.map_data.data[rows+1][cols-1]  = 2} //Bottom-Left
        }
      }
    }
  }

  RoomCollide(room,ignore,buffer=0) {
    for(let i in this.rooms) {
      if(i==ignore) {continue}
      let check = this.rooms[i];
      if(!((check.x + check.w + buffer < room.x) || (check.y + check.h + buffer < room.y) || (check.x > room.x + room.w + buffer) || (check.y > room.y + room.h + buffer))) {
        return true
      }
    }
  }

  SquashRooms(amount = 10) { // condenses the rooms [avoiding large gaps];
    for(let i=0;i<amount;i++) {
      this.rooms = this.rooms.map((room,index) => {
        let temp_room = room;
        temp_room.x--;
        temp_room.y--;
        if((this.RoomCollide(temp_room,index,2) || room.x<1 || room.y<1)) {
          temp_room.x++;
          temp_room.y++;
        }
        return temp_room;
      });
    }
  }

  SpawnChests(frequency = 0.1) {
    this.rooms.forEach(room => {
      if(random(0,1/frequency) == 0) {
        let rows = room.y+random(1,room.h-2);
        let cols = room.x+random(1,room.w-2);
        this.map_data.data[rows][cols] = 7;
        this.chests.push(new Chest(["small","medium","large"][random(0,2)]));
      }
    });
  }

  ClosestRoom(room) {
    let min_dist = Infinity;
    let closest = null;
    this.rooms.forEach(iterator => {
      if(iterator == room) {return}
      const curr_dist = Dungeon.dist_between_rooms(room,iterator);
      if(curr_dist<min_dist) {
        min_dist = curr_dist;
        closest = iterator;
      }
    });
    return closest;
  }

  static dist_between_rooms(roomA,roomB) {
    let dx = roomA.x-roomB.x;
    let dy = roomA.y-roomB.y;
    return Math.sqrt(dx*dx+dy*dy);
  }

  PlayerSpawn() {
    let Spawnroom = this.ClosestRoom({x:0,y:0,w:1,h:1});
    return {x:Spawnroom.x+Math.floor(Spawnroom.w/2),y:Spawnroom.y+Math.floor(Spawnroom.h/2)};
  }

  draw() {
    for(let cols=this.viewport[0];cols<this.viewport[2];cols++) {
      for(let rows=this.viewport[1];rows<this.viewport[3];rows++) {

        if(this.light_map.data[rows][cols] > 0) {

          switch(this.map_data.data[rows][cols]) {
            case 1: //Floor
              Floor_Texture.draw((cols-this.viewport[0])*16*Zoom,(rows-this.viewport[1])*16*Zoom);
            break;
            case 2: //Wall Top/Bot
              Wall_Top_Bottom.draw((cols-this.viewport[0])*16*Zoom,(rows-this.viewport[1])*16*Zoom);
            break;
            case 3: //Wall Left
              Wall_Left.draw((cols-this.viewport[0])*16*Zoom,(rows-this.viewport[1])*16*Zoom);
            break;
            case 4: //Wall Right
              Wall_Right.draw((cols-this.viewport[0])*16*Zoom,(rows-this.viewport[1])*16*Zoom);
            break;
            case 5: //Corner TL
              Wall_Corner_TL.draw((cols-this.viewport[0])*16*Zoom,(rows-this.viewport[1])*16*Zoom);
            break;
            case 6: //Corner TR
              Wall_Corner_TR.draw((cols-this.viewport[0])*16*Zoom,(rows-this.viewport[1])*16*Zoom);
            break;
            case 7: //Chest
              Floor_Texture.draw((cols-this.viewport[0])*16*Zoom,(rows-this.viewport[1])*16*Zoom);
              Chest_Texture.draw((cols-this.viewport[0])*16*Zoom,(rows-this.viewport[1])*16*Zoom);
            break;
          }
        } else {
          Canvas.Rectangle((cols-this.viewport[0])*16*Zoom,(rows-this.viewport[1])*16*Zoom,16*Zoom,16*Zoom,"fill","black");
        }
      }
    }
    this.draw_light_map();
  }

  draw_light_map() {
    for(let cols=this.viewport[0];cols<this.viewport[2];cols++) {
      for(let rows=this.viewport[1];rows<this.viewport[3];rows++) {
        if(this.light_map.data[rows][cols] > 0 && this.light_map.data[rows][cols] < 10) {
        Canvas.Rectangle((cols-this.viewport[0])*16*Zoom,(rows-this.viewport[1])*16*Zoom,16*Zoom,16*Zoom,"fill","black",1/(this.light_map.data[rows][cols]+1));
        }
      }
    }
  }

  generate_light_map() {
    let lightmap = this.map_data.copy();
    lightmap.map(x => x = (x==0) ? 10 : 0);
    return lightmap;
  }

  check_fully_lit() {
    return this.light_map.data.every(rows => {
      return rows.every(cols => {
        return cols == 10;
      });
    });
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

  clear_light_map() {
      this.light_map = new Matrix(this.size,this.size,10);
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
