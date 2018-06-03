
class Player {
  constructor(name) {
    Character_isCreated = true;
    Character = this;
    this.name = name;
    this.level = 1;
    this.inv = new Inventory(8);
    this.state = "free";
    this.pos = {x:50/Zoom/2,y:50/Zoom/2};
  }

  move(direction="north") {
    switch(direction) {
      case "w":
      if(checkMap(this.pos.x,this.pos.y-1)==0) {
      this.pos.y--;
      if(this.pos.y <= CurrentDungeon.size-50/Zoom/2) {
      CurrentDungeon.scroll("s");
      }
      }
      break;
      case "a":
      if(checkMap(this.pos.x-1,this.pos.y)==0) {
      this.pos.x--;
      if(this.pos.x <= CurrentDungeon.size-50/Zoom/2) {
      CurrentDungeon.scroll("d");
      }
      }
      break;
      case "s":
      if(checkMap(this.pos.x,this.pos.y+1)==0) {
      this.pos.y++;
      if(this.pos.y >= 50/Zoom/2) {
      CurrentDungeon.scroll("w");
      }
      }
      break;
      case "d":
      if(checkMap(this.pos.x+1,this.pos.y)==0) {
      this.pos.x++;
      if(this.pos.x >= 50/Zoom/2) {
      CurrentDungeon.scroll("a");
      }
      }
      break;
    }
  }

  draw() {
    Chest_Texture.draw((this.pos.x-CurrentDungeon.viewport[0])*16*Zoom,(this.pos.y-CurrentDungeon.viewport[1])*16*Zoom);
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
