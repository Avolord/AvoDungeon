class Inventory {
  constructor(size = 8) {
    this.data = new Array(size).fill(0);
  }

  add(Item) {
    
  }
}

class Chest {
  constructor(size = "small",loot_table = "standard") {
    switch(size) {
      case "small":
      this.inv = new Inventory(8);
      break;
      case "medium":
      this.inv = new Inventory(16);
      break;
      case "large":
      this.inv = new Inventory(32);
      break;
    }
  }
}
