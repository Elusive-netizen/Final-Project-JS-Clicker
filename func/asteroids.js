const asteroidImages = [
    "./assets/asteroids/asteroid-1.png",
    "./assets/asteroids/asteroid-2.png",
    "./assets/asteroids/asteroid-3.png",
    "./assets/asteroids/asteroid-4.png",
    "./assets/asteroids/asteroid-5.png",
    "./assets/asteroids/asteroid-6.png",
   
];

export let asteroid = {
    maxHp: 15,
    hp: 15,
    prize: 150,
    hpMultiplier: 1.5,
    prizeMultiplier: 1.35,
    level: 1,
    element: document.getElementById("asteroid"),
    healthbar: document.querySelector(".healthbar"),
    hpText: document.getElementById("hp-text")
};

export function updateAsteroidUI() {
    asteroid.healthbar.max = asteroid.maxHp;
    asteroid.healthbar.value = asteroid.hp;

    asteroid.hpText.textContent = `HP: ${Math.ceil(asteroid.hp)} / ${Math.ceil(asteroid.maxHp)}`;
}

export function spawnAsteroid() {

    const randomImg = asteroidImages[Math.floor(Math.random() * asteroidImages.length)];
    asteroid.element.src = randomImg;


    asteroid.hp = asteroid.maxHp;
    updateAsteroidUI();


    asteroid.element.style.transition = "none";
    asteroid.element.style.position = "relative";
    asteroid.element.style.left = "calc(100vw + 200px)";


    requestAnimationFrame(() => {

        asteroid.element.style.transition = "left 3s ease-out";
        asteroid.element.style.left = "calc(50% - 200px)"; 
        asteroid.element.style.animation = "approach 2.5s";
        setTimeout(() => {
            asteroid.healthbar.style.display = "block";
            asteroid.healthbar.style.animation = "fade-in 2s";
            asteroid.hpText.style.display = "block";
            asteroid.hpText.style.animation = "fade-in 2s";
        }, 3000)
    });
}

export function destroyAsteroid() {
    asteroid.prize = parseFloat((asteroid.prize * asteroid.prizeMultiplier * 1.004 ** asteroid.level).toFixed(2));
    asteroid.maxHp = parseFloat((asteroid.maxHp * asteroid.hpMultiplier * 1.004 ** asteroid.level).toFixed(2));
    asteroid.level++
    asteroid.element.style.pointerEvents = "none";
    asteroid.element.style.opacity = "0";
    asteroid.element.style.animation = "none";
    asteroid.healthbar.style.display = "none";
    asteroid.healthbar.style.animation = "none"; 
    asteroid.hpText.style.display = "none";
    asteroid.hpText.style.animation = "none"; 

    setTimeout(() => {
        spawnAsteroid();
        asteroid.element.style.pointerEvents = "auto";
        asteroid.element.style.opacity = "1";
    }, 350);
}

function createBackgroundAsteroid() {
    const bgasteroid = document.createElement("img");
    bgasteroid.src = asteroidImages[Math.floor(Math.random() * asteroidImages.length)];
    bgasteroid.classList.add("bgasteroid");

    const minY = 50;
    const maxY = 800;
    const y = Math.random() * (maxY - minY) + minY;
    bgasteroid.style.top = y + "px";


    const startX = window.innerWidth + 100; 
    bgasteroid.style.left = startX + "px";


    const size = Math.random() * 100 + 100; 
    bgasteroid.style.width = size + "px";
    bgasteroid.style.height = size + "px";


    document.body.appendChild(bgasteroid);


    const speed = Math.random() * 0.1 + 0.1; 
    let currentX = startX;

    function move() {
        currentX -= speed * 16; 
        bgasteroid.style.left = currentX + "px";

        if (currentX + size < 0) {
            bgasteroid.remove();
        } else {
            requestAnimationFrame(move);
        }
    }

    requestAnimationFrame(move);
}


setInterval(createBackgroundAsteroid, 1500); 