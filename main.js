const hero = {
  health: 100,
  imgUrl: "./resources/hero.png",
  coins: 0
}

const villian = {
  health: 100,
  imgUrl: "./resources/villian.webp",
  level: 1,
  lowAttack: 3,
  highAttack: 7
}
let totalHealth
let currentVillian = villian

let interval
let bossDamage


function attack() {
  if (currentVillian.health > 0) {
    currentVillian.health -= 5
  }
  if (currentVillian.health <= 0) {
    currentVillian.health == 0
    bossDeath()
  }
  drawCharacters()
}

function drawCharacters() {
  let template = ``
  template += `
  <div class="text-center" id="villian-card">
  <h1 class="lvl-number text-warning p-2 m-auto">Lvl. ${currentVillian.level}</h1>
  <div class="progress w-50 m-auto">
    <div class="progress-bar  text-dark bg-danger" role="progressbar" style="width: ${currentVillian.health / totalHealth * 100}%;" aria-valuenow="${currentVillian.health / totalHealth}"
      aria-valuemin="0" aria-valuemax="${currentVillian.health / totalHealth}">${Math.floor(currentVillian.health / totalHealth * 100)}%</div>
  </div>
  <img src="${currentVillian.imgUrl}" alt="">
</div>
  `

  document.getElementById("villian-card").innerHTML = template

  template = `


<div class="progress w-50 m-auto">
<div class="progress-bar text-dark bg-danger" role="progressbar" style="width: ${hero.health}%;" aria-valuenow="${hero.health}"
  aria-valuemin="0" aria-valuemax="${hero.health}">${hero.health}%</div>
</div>
<img src="./resources/hero.png" alt="">
<h3 class="m-0">Coins : $${hero.coins}</h3>
`
  document.getElementById("player-card").innerHTML = template

}


function bossAttacks() {


  if (hero.health >= 0) {
    hero.health -= bossDamage
  }



  if (hero.health <= 0) {
    bossDamage = 0
    hero.health = 0

    document.getElementById("attack-button").classList.add("disabled")

    //This code is responsible for stopping our boss attacks from happening
    //and stopping the interval from continuing
    stopBossAttacks()
  }



  drawCharacters()
}

function nextLevel() {

  hero.health = 100
  currentVillian.health = 100
  console.log("does this work");
  document.getElementById("attack-button").classList.remove("disabled")
  document.getElementById("next-level-button").classList.add("hidden")
  currentVillian.level += 1
  drawCharacters()
  stopBossAttacks()
  SetBossAttributes()
  setAttackInterval()
}

function resetGame() {
  currentVillian.health = 100
  currentVillian.level = 1
  hero.health = 100
  totalHealth = 100
  hero.coins = 0
  drawCharacters()
  document.getElementById("attack-button").classList.remove("disabled")
}


//change this  to 3000 after testing

function setAttackInterval() {
  interval = setInterval(bossAttacks, 1000)
}

function stopBossAttacks() {
  clearInterval(interval);
}

function bossDeath() {
  stopBossAttacks()
  document.getElementById("next-level-button").classList.remove("hidden")
  document.getElementById("attack-button").classList.add("disabled")
  hero.coins += 100 * villian.level
}

function SetBossAttributes() {
  bossDamage = Math.floor(Math.random() * (currentVillian.highAttack + 1.5 * currentVillian.level - currentVillian.lowAttack) + 1.5 * currentVillian.level + currentVillian.lowAttack + 1.5 * currentVillian.level);

  currentVillian.health = 50 + 50 * currentVillian.level
  totalHealth = 50 + 50 * currentVillian.level
}


// on load
setAttackInterval()
SetBossAttributes()
drawCharacters()