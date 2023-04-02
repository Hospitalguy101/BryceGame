let p1Name;
let p1Text;
let p1Xp;
let p1Level;
let p1XpCap;

let p1Stats = {
  hp: 10,
  atk: 5,
  mAtk: 5,
  emr: 0, //elemntal resonance
  luck: 0
}

let p2Name;
let p2Text;
let p2Xp;
let p2Level;
let p2XpCap;

let p2Stats = {
  hp: 10,
  atk: 5,
  mAtk: 5,
  emr: 0,
  luck: 0
}

let width;

let enemyList; //list of every kind of enemy
let inBattle = false;
let combatButton;
let numEnemiesInput;

function setup() {
  createCanvas(document.documentElement.clientWidth - 17, document.documentElement.clientHeight - 17);
  width = document.documentElement.clientWidth;

  //p1 menu
  p1Name = "Player 1";
  p1Text = createInput(p1Name);
  p1Xp = 0;
  p1Level = 1;
  p1XpCap = 20;
  p1Text.position(25, 20);
  p1Text.size(593, 30);
  p1Text.style("font-size", "30px");

  //p2 menu
  p2Name = "Player 2";
  p2Text = createInput(p2Name);
  p2Xp = 0;
  p2Level = 1;
  p2XpCap = 20;
  p2Text.position(width - 642, 20);
  p2Text.size(593, 30);
  p2Text.style("font-size", "30px");

  enemies = [];
  enemyList = [];
  enemyList.push(new Enemy("Goblin (1 exp)", 1, width/2 - 100, 200));
  enemyList.push(new Enemy("Hobgoblin (3 exp)", 3, width/2 + 100, 200));

  numEnemiesInput = createInput();
  numEnemiesInput.size(20);
  textSize(12);
  numEnemiesInput.position(width/2 + textWidth("Number of enemies: ")/2, 60 - numEnemiesInput.size().height/2);

  combatButton = createButton("Create Combat");
  combatButton.position(width/2 - combatButton.size().width/2, 100 - combatButton.size().height/2);
  combatButton.mousePressed(() => inBattle = !inBattle);
}

function draw() {
  background(255);

  //TODO: fix right side bars to align with changing screen size

  for (let e in enemies) {
    enemies[e].display();
  }
  //p1 menu
  stroke(0);
  fill(255);
  rectMode(CORNER);
  rect(25, 75, 600, 30);

  //p2 menu
  rect(width - 642, 75, 600, 30);

  //p1 bar
  fill(27, 176, 245);
  noStroke();
  rect(25, 75, (p1Xp/p1XpCap)*600, 30);

  //p2 bar
  rect(width - 642, 75, (p2Xp/p2XpCap)*600, 30);
  textSize(15);
  fill(0);

  //xp counters
  text(p1Xp + "/" + p1XpCap, 25, 125);
  text(p2Xp + "/" + p2XpCap, width - 642, 125);

  //p1 stats
  stroke(0);
  noFill();
  rect(25, 150, 300, 200);
  textSize(20);
  noStroke();
  fill(0);
  text("Hp: " + p1Stats.hp, 35, 175);
  text("Atk: " + p1Stats.atk, 35, 205);
  text("MAtk: " + p1Stats.mAtk, 35, 235);
  text("Emr: " + p1Stats.emr, 35, 265);
  text("Luck: " + p1Stats.luck, 35, 295);

  //p2 stats
  stroke(0);
  noFill();
  rect(width - 342, 150, 300, 200);
  textSize(20);
  noStroke();
  fill(0);
  text("Hp: " + p2Stats.hp, width - 332, 175);
  text("Atk: " + p2Stats.atk, width - 332, 205);
  text("MAtk: " + p2Stats.mAtk, width - 332, 235);
  text("Emr: " + p2Stats.emr, width - 332, 265);
  text("Luck: " + p2Stats.luck, width - 332, 295);

  //combat menu
  if (!inBattle) {
    stroke(0);
    noFill();
    rectMode(CENTER);
    rect(width/2, 80, 350, 125);
    noStroke();
    fill(0);
    textSize(12);
    text("Number of enemies: ", width/2 - (textWidth("Number of enemies: "))/2, 65)
  }
}

function addXp(player, amount) {
  if (player === 1) {
    p1Xp += amount;
    if (p1Xp >= p1XpCap) {
      p1Level++;
      p1Xp = 0;
      p1XpCap *= 1.2;
    }
  } else {
    p2Xp += amount;
    if (p2Xp >= p2XpCap) {
      p2Level++;
      p2Xp = 0;
      p2XpCap *= 1.2;
    }
  }
}

class Enemy {
  constructor(_name, _xp, _x, _y) {
    this.name = _name;
    this.xp = _xp;
    this.x = _x;
    this.y = _y;
  }

  display() {
    rectMode(CENTER);
    stroke(0);
    fill(255);
    rect(this.x, this.y, 150, 25);
    textSize(15);
    fill(0);
    noStroke();
    text(this.name, this.x - (textWidth(this.name) / 2), this.y + 5);
    this.p1Button = createButton("Player 1");
    this.p1Button.position(this.x - 75, this.y + 25);
    this.p1Button.mousePressed(() => addXp(1, this.xp));
    this.p2Button = createButton("Player2");
    this.p2Button.position(this.x + 20, this.y + 25);
    this.p2Button.mousePressed(() => addXp(2, this.xp));
  }
}
