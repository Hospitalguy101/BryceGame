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

let enemies;
let enemyCatalog; //list of every kind of enemy
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
  enemyCatalog = [];
  enemyCatalog.push(new Enemy("Goblin (1 exp)", 1, 10, 5, 0, 3));
  enemyCatalog.push(new Enemy("Hobgoblin (3 exp)", 3, 8, 3, 6, 8));

  let newEnemyY = 25;
  let enemySelectList = [];
  addEnemyButton = createButton("Add Enemy");
  textSize(12);
  addEnemyButton.position(width/2 + textWidth("Number of enemies: ")/2, 60 - addEnemyButton.size().height/2);
  addEnemyButton.mousePressed(() => {
    let enemySelect = createSelect();
    for (const e in enemyCatalog) {
      enemySelect.option(enemyCatalog[e].name);
    }
    enemySelect.position(width/2 - enemySelect.size().width/2, 100 + newEnemyY);
    enemySelectList.push(enemySelect);
    newEnemyY += 25;
  });


  combatButton = createButton("Create Combat");
  combatButton.position(width/2 - combatButton.size().width/2, 100 - combatButton.size().height/2);
  combatButton.mousePressed(() => {
    inBattle = !inBattle
    combatButton.hide();
    addEnemyButton.hide();
    enemies = [];
    for (const s in enemySelectList) {
      enemies.push(enemySelectList[s].value());
      enemySelectList[s].hide();
    }
  });
}

function draw() {
  background(255);

  //TODO: fix right side bars to align with changing screen size

  // for (let e in enemies) {
  //   enemies[e].display();
  // }
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

  else {
    stroke(0);
    noFill();
    rectMode(CENTER);
    rect(width/2, height/2, width/3 + enemies.length*width/15, height/3);

    noStroke();
    fill(0);
    //evenly distributes names across box for any aspect ratio
    let enemyTextX = width/3 - enemies.length*width/30 + (width/3 + enemies.length*width/15) / (enemies.length + 1);
    for (const e in enemies) {
      let enemy;
      for (const o in enemyCatalog) {
        if (enemies[e] === enemyCatalog[o].name) enemy = enemyCatalog[o];
      }
      textSize(25);
      text(enemy.name, enemyTextX - textWidth(enemy.name)/2, height/3 + height/20);
      textSize(20);
      text("Hp: " + enemy.hp, enemyTextX - textWidth("Hp: " + enemy.hp)/2, height/3 + height/10);
      text("Atk: " + enemy.atk, enemyTextX - textWidth("Atk: " + enemy.atk)/2, height/3 + height*3/20);
      text("Matk: " + enemy.matk, enemyTextX - textWidth("Matk: " + enemy.matk)/2, height/3 + height*4/20);
      text("Emr: " + enemy.emr, enemyTextX - textWidth("Emr: " + enemy.emr)/2, height/3 + height*5/20);
      enemyTextX += (width/3 + enemies.length*width/15) / (enemies.length + 1)
    }

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
  constructor(_name, _xp, _hp, _atk, _matk, _emr) {
    this.name = _name;
    this.xp = _xp;
    this.hp = _hp;
    this.atk = _atk;
    this.matk = _matk;
    this.emr = _emr;
  }
}
