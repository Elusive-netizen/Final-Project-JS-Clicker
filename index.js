import { powerUpIntervals, upgrades } from "./func/upgrades.js";
import { spawnAsteroid, destroyAsteroid, asteroid, updateAsteroidUI} from "./func/asteroids.js";
export let isMuted = false;

window.onload = () => {
    spawnAsteroid();
    let sidebarOpacity = document.querySelector('.sidebar');
    setTimeout(() => {
            sidebarOpacity.classList.remove("unclickable");
            sidebarOpacity.style.opacity = "1";
            sidebarOpacity.style.animation = "fade-in 2s";
        }, 3000)
    setTimeout(() => {
            sidebarOpacity.style.animation = "";
        }, 5100)

   
};

let ore = document.querySelector('.ore-cost');
let parsedOre = parseFloat(ore.innerHTML);

let asteroidImgContainer = document.querySelector('.asteroid-img-container');

let opcText = document.getElementById('opc-text');
let opsText = document.getElementById('ops-text');
let opc = 1;
let ops = 0;
let asteroidCooldown = false;


const bgm = new Audio('./assets/audio/bgm.mp3')
bgm.volume = 0.2

function incrementOre(event) {
    if (!isMuted){
        const clickSound = new Audio('./assets/audio/click.mp3')
        clickSound.volume = 0.5
        clickSound.play();
    }
    ore.innerHTML =  Math.round(parsedOre += opc);

    const x = event.offsetX
    const y = event.offsetY

    const div = document.createElement('div')
    div.innerHTML = `+${Math.round(opc)}` 
    div.style.cssText = `
            color: white; 
            position: absolute; 
            top: ${y}px; 
            left: ${x}px; 
            font-size: 15px; 
            pointer-events: none;
            z-index: 3;
        `
    asteroidImgContainer.appendChild(div)

    div.classList.add('fade-up');

    timeout(div);

    asteroid.hp -= opc;
    updateAsteroidUI();
    if (asteroid.hp <= 0 && !asteroidCooldown) {
       
        if (!isMuted) {
            const prizeSound = new Audio('./assets/audio/prize.mp3')
            prizeSound.volume = 0.5
            prizeSound.play();
        }
        destructionEffect();
        destroyAsteroid();
        asteroidCooldown = true;
        setTimeout(() => {
            asteroidCooldown = false; 
        }, 2000)
    }
}
function drillBgAsteroid(bgast, event) {
    if (!isMuted){
        const clickSound = new Audio('./assets/audio/prize.mp3')
        clickSound.volume = 0.5
        clickSound.play();
    }
    ore.innerHTML =  Math.round(parsedOre = parsedOre + opc * 2);
    
    const x = event.pageX+10;
    const y = event.pageY-10;

    const div = document.createElement('div')
    div.innerHTML = `+${Math.round(opc * 2)}` 
    div.style.cssText = `
            color: gold; 
            position: absolute; 
            top: ${y}px; 
            left: ${x}px; 
            font-size: 25px; 
            font-weight: bold;
            pointer-events: none;
            z-index: 3;
        `
    document.body.appendChild(div);

    div.classList.add('fade-up');

    timeout(div);
    bgast.remove();
}

const timeout = (div) => {
    setTimeout( () => {
        div.remove()
    }, 900)
}
export function destructionEffect() {
    const bigDiv = document.createElement('div');
    bigDiv.innerHTML = `+${Math.round(asteroid.prize)}`;
    ore.innerHTML =  Math.round(parsedOre += asteroid.prize);
    bigDiv.style.cssText = `
            color: gold;
            position: absolute;
            font-size: 40px;
            font-weight: bold;
            text-shadow: 2px 2px 5px white;
            pointer-events: none;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 3;
        `;
    asteroidImgContainer.appendChild(bigDiv);
    bigDiv.classList.add('fade-up');
    timeout(bigDiv);
}

function buyUpgrade(upgrade) {
    const mu = upgrades.find((u) => {
        if (u.name === upgrade) return u;
    })

    const upgradeDiv = document.getElementById(`${mu.name}-upgrade`)
    const nextlevelDiv = document.getElementById(`${mu.name}-next-level`)
    const nextlevelP = document.getElementById(`${mu.name}-next-p`)

    if (parsedOre >= mu.parsedCost) {
       
        const upgradeSound = new Audio('./assets/audio/upgrade.mp3')
        upgradeSound.volume = 0.3
        if (!isMuted){
        upgradeSound.play()
        }
        if(mu.name === 'drill') {
            opc += mu.parsedIncrease;
        } else {
            mu.power += mu.parsedIncrease;
            ops += mu.parsedIncrease;
        }
        
        ore.innerHTML =  Math.round(parsedOre -= mu.parsedCost);

        let index = powerUpIntervals.indexOf(parseFloat(mu.level.innerHTML));

        if (index !== -1) {
            if (!isMuted) {
            upgradeSound.pause()
            const upgradeBigSound = new Audio('./assets/audio/upgradebig.mp3')
            upgradeBigSound.volume = 0.3
            upgradeBigSound.play()
            }
            upgradeDiv.style.cssText = `border-color: white`;
            nextlevelDiv.style.cssText = 'background: linear-gradient(90deg,rgb(141, 141, 141) 0%, rgba(90, 90, 90, 1) 100%); font-weight: normal';
            mu.parsedCost = mu.savedCost;

            if (mu.name === 'drill') {
                opc -= mu.parsedIncrease;

                opc *= mu.powerUps[index].multiplier;
                mu.parsedIncrease = parseFloat((mu.parsedIncrease * mu.powerUps[index].multiplier).toFixed(2));
                nextlevelP.innerHTML =  `+${mu.parsedIncrease} ore <br /> per click`;
            } else {
                mu.power -= mu.parsedIncrease;
                ops -= mu.parsedIncrease;

                ops -= mu.power;
                mu.power *= mu.powerUps[index].multiplier;
                ops += mu.power;
                mu.parsedIncrease = parseFloat((mu.parsedIncrease * mu.powerUps[index].multiplier).toFixed(2));
                nextlevelP.innerHTML =  `+${mu.parsedIncrease} ore <br /> per second`;
                
            }
        }

        mu.level.innerHTML ++;

        mu.parsedIncrease = parseFloat((mu.parsedIncrease * mu.oreMultiplier).toFixed(2));
        mu.increase.innerHTML = mu.parsedIncrease;


        index = powerUpIntervals.indexOf(parseFloat(mu.level.innerHTML));

        if (index !== -1) {
            upgradeDiv.style.cssText = `border-color: gold`;
            nextlevelDiv.style.cssText = 'background: linear-gradient(90deg,rgba(107, 74, 255, 1) 0%, rgba(63, 43, 150, 1) 100%); font-weight: bold';
            nextlevelP.innerText = mu.powerUps[index].description;

            mu.savedCost = mu.parsedCost;
            mu.parsedCost = Math.round(mu.parsedCost * 2.5 * 1.004 ** parseFloat(mu.level.innerHTML));
            mu.cost.innerHTML = mu.parsedCost;

        } else if (mu.name === 'drill') {
                mu.parsedCost *= mu.costMultiplier;
                mu.parsedCost = Math.round(mu.parsedCost);
                mu.cost.innerHTML = mu.parsedCost;
                
                nextlevelP.innerHTML =  `+${mu.parsedIncrease} ore <br /> per click`;
                
            } else {
                mu.parsedCost *= mu.costMultiplier;
                mu.parsedCost = Math.round(mu.parsedCost);
                mu.cost.innerHTML = mu.parsedCost;

                nextlevelP.innerHTML =  `+${mu.parsedIncrease} ore <br /> per second`;
            }

    
    } else if (!isMuted) {
        const upgradeDeny = new Audio('./assets/audio/upgradedeny.mp3')
        upgradeDeny.volume = 0.3
        upgradeDeny.play()
    } 

}

function closeUpgrades() {
    const sidebar = document.querySelector(".sidebar");
    const arrow = document.querySelector(".open-arrow");

   if (sidebar.style.display == "none") {
        sidebar.style.display = "block"
        arrow.style.display = "none"
   }
   else {
        arrow.style.display = "block"
        sidebar.style.display = "none"
        
        
   }
}

function soundToggle() {
    const soundImg = document.getElementById("soundIcon")
    if (!isMuted){
        soundImg.src = "./assets/no-sound.png"
        // bgm.pause();
        // bgm.currentTime = 0;
        isMuted = true
    } else {
        soundImg.src = "./assets/volume.png"
        isMuted = false
    }
}

function save() {
    localStorage.clear()

    upgrades.map((upgrade) => {
        const savedObj = JSON.stringify({
            power: upgrade.power,
            savedCost: upgrade.savedCost,
            parsedLevel: parseFloat(upgrade.level.innerHTML),
            parsedCost: upgrade.parsedCost,
            parsedIncrease: upgrade.parsedIncrease
        })

        localStorage.setItem(upgrade.name, savedObj)

    })
    localStorage.setItem('opc', JSON.stringify(opc))
    localStorage.setItem('ops', JSON.stringify(ops))
    localStorage.setItem('ore', JSON.stringify(parsedOre))
    
    localStorage.setItem('savedAsteroidImage', JSON.stringify(asteroid.element.src))
    localStorage.setItem('savedAsteroidHp', JSON.stringify(asteroid.hp))
    localStorage.setItem('savedAsteroidMaxHp', JSON.stringify(asteroid.maxHp))
    localStorage.setItem('savedAsteroidPrize', JSON.stringify(asteroid.prize))
    localStorage.setItem('savedAsteroidLevel', JSON.stringify(asteroid.level))
    if (!isMuted){
        const saveSound = new Audio('./assets/audio/save.mp3')
        saveSound.volume = 0.3
        saveSound.play()
    }

    console.log(localStorage)
}
function load() {
    upgrades.map((upgrade) => {
        const savedValues = JSON.parse(localStorage.getItem(upgrade.name))

        upgrade.parsedCost = savedValues.parsedCost
        upgrade.parsedIncrease = savedValues.parsedIncrease
        upgrade.power = savedValues.power
        upgrade.savedCost = savedValues.savedCost

        upgrade.level.innerHTML = savedValues.parsedLevel
        upgrade.cost.innerHTML = Math.round(upgrade.parsedCost)
        upgrade.increase.innerHTML = upgrade.parsedIncrease
        

        console.log(upgrade.name, savedValues)
    })
    opc = JSON.parse(localStorage.getItem('opc'))
    ops = JSON.parse(localStorage.getItem('ops'))
    parsedOre = JSON.parse(localStorage.getItem('ore'))
    ore.innerHTML = Math.round(parsedOre)

    asteroid.element.src = JSON.parse(localStorage.getItem('savedAsteroidImage'))
    asteroid.hp = JSON.parse(localStorage.getItem('savedAsteroidHp'))
    asteroid.maxHp = JSON.parse(localStorage.getItem('savedAsteroidMaxHp'))
    asteroid.prize = JSON.parse(localStorage.getItem('savedAsteroidPrize'))
    asteroid.level = JSON.parse(localStorage.getItem('savedAsteroidLevel'))
    if (!isMuted){
        const loadSound = new Audio('./assets/audio/load.mp3')
        loadSound.volume = 0.3
        loadSound.play()
    }

}

setInterval(() => {
ore.innerHTML = Math.round(parsedOre)
opcText.innerHTML = Math.round(opc)
opsText.innerHTML = Math.round(ops)
if (!asteroidCooldown) {
    parsedOre += ops / 10
    asteroid.hp -= ops / 10;
    updateAsteroidUI();
    if (asteroid.hp <= 0) {
        if (!isMuted) {
            const prizeSound = new Audio('./assets/audio/prize.mp3')
            prizeSound.volume = 0.5
            prizeSound.play();
        }
        destructionEffect();
        destroyAsteroid();
        asteroidCooldown = true;
        setTimeout(() => {
            asteroidCooldown = false; 
        }, 2000)
        }
}
}, 100)

setInterval(() => {
    if (!isMuted) {
        // bgm.play()
    }
}, 1000)

window.closeUpgrades = closeUpgrades
window.incrementOre = incrementOre
window.drillBgAsteroid = drillBgAsteroid
window.buyUpgrade = buyUpgrade
window.soundToggle = soundToggle
window.save = save
window.load = load
