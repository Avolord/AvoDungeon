
class Player {
  constructor(name) {
    Character_isCreated = true;
    Character = this;
    this.name = name;
    this.level = 1;
    this.inv = new Inventory(8);
    this.state = "free";
    this.pos = {x:0,y:0};
  }

  move(direction="north") {
    switch(direction) {
      case "w":
      this.pos.y--;
      break;
      case "a":
      this.pos.x--;
      break;
      case "s":
      this.pos.y++;
      break;
      case "d":
      this.pos.x++;
      break;
    }
  }

  draw() {

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
  }
}
