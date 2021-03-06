
class Player {
  constructor(name) {
    Character_isCreated = true;
    Character = this;
    this.name = name;
    this.level = 1;
    this.inv = new Inventory(8);
    this.state = "free";
    this.pos = CurrentDungeon.player_spawn;
    this.direction = "w";
    this.Ghost_Mode = false; //Debugging [can fly through Objects]
    this.light_radius = 10;
    this.light_power = 2;
  }

  move(direction="w") {
    switch(direction) {
      case "w":
      this.direction = "w";
      Player_Texture.switch_state(1);
      if(checkMap(this.pos.x,this.pos.y-1)==1 || this.Ghost_Mode) {
      this.pos.y--;
      if(this.pos.y <= CurrentDungeon.size-50/Zoom/2) {
      CurrentDungeon.scroll("s");
      }
      }
      break;
      case "a":
      this.direction = "a";
      Player_Texture.switch_state(3);
      if(checkMap(this.pos.x-1,this.pos.y)==1 || this.Ghost_Mode) {
      this.pos.x--;
      if(this.pos.x <= CurrentDungeon.size-50/Zoom/2) {
      CurrentDungeon.scroll("d");
      }
      }
      break;
      case "s":
      this.direction = "s";
      Player_Texture.switch_state(2);
      if(checkMap(this.pos.x,this.pos.y+1)==1 || this.Ghost_Mode) {
      this.pos.y++;
      if(this.pos.y >= 50/Zoom/2) {
      CurrentDungeon.scroll("w");
      }
      }
      break;
      case "d":
      this.direction = "d";
      Player_Texture.switch_state(4);
      if(checkMap(this.pos.x+1,this.pos.y)==1 || this.Ghost_Mode) {
      this.pos.x++;
      if(this.pos.x >= 50/Zoom/2) {
      CurrentDungeon.scroll("a");
      }
      }
      break;
    }
  }

  draw() {
    Player_Texture.draw((this.pos.x-CurrentDungeon.viewport[0])*16*Zoom,(this.pos.y-CurrentDungeon.viewport[1])*16*Zoom);
    this.light_up_dungeon();
  }

  light_up_dungeon() {
      for(let i=-this.light_radius;i<this.light_radius;i++) {
        for(let j=-this.light_radius;j<this.light_radius;j++) {
          if(this.pos.y+i >= 0 && this.pos.y+i <= CurrentDungeon.size-1 && this.pos.x+j >= 0 && this.pos.x+j <= CurrentDungeon.size-1) {
            let d = this.dist(this.pos.x+j,this.pos.y+i);
            let curr_lightlvl = CurrentDungeon.light_map.data[this.pos.y+i][this.pos.x+j];
            CurrentDungeon.light_map.data[this.pos.y+i][this.pos.x+j] = (this.light_radius*2-d > curr_lightlvl) ? this.light_radius*2+this.light_power-d : curr_lightlvl;
          }
        }
      }
  }

  dist(x,y) { //Pixel-dist [abs(dx+dy)]
    let dx = this.pos.x-x;
    let dy = this.pos.y-y;
    return Math.abs(dx*dx+dy*dy);
  }

}

class Warrior extends Player {
  constructor(name) {
    super(name);
    this.strength = 5;
    this.hp = 5;
    this.stamina = 3;
    this.mana = 1;
    this.power = 1;
  }
}

class Mage extends Player {
  constructor(name) {
    super(name);
    this.strength = 1;
    this.hp = 3;
    this.stamina = 2;
    this.mana = 5;
    this.power = 5;
  }
}

class Assassin extends Player {
  constructor(name) {
    super(name);
    this.strength = 8;
    this.hp = 3;
    this.stamina = 2;
    this.mana = 1;
    this.power = 1;
  }
}

document.onkeydown = function(e) {
  if(!Character_isCreated) {return}
  if(["w","a","s","d"].some(keycode => keycode==e.key)) {
    Character.move(e.key);
    //CurrentDungeon.scroll(e.key);
  }
}

function showMouse() {
  let Marked_pos = CurrentDungeon.map_data.data[MouseOnMap.y+CurrentDungeon.viewport[1]][MouseOnMap.x+CurrentDungeon.viewport[0]];
  if(Marked_pos != 0) {
  if(Marked_pos < 7)
    Field_Marker.draw((MouseOnMap.x)*16*Zoom,(MouseOnMap.y)*16*Zoom);
  else
    Field_Marker2.draw((MouseOnMap.x)*16*Zoom,(MouseOnMap.y)*16*Zoom);
  }
}

Canvas.Element.onmousemove = function(e) {
  MouseOnMap.x = Math.floor((e.pageX - this.offsetLeft)/(16*Zoom));
  MouseOnMap.y = Math.floor((e.pageY - this.offsetTop)/(16*Zoom));
}
