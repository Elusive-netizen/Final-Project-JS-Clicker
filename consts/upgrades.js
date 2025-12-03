const defaultValues = [
    {name: 'drill', image: './assets/upgrades/drill.png', cost: 25, increase: 1, state: 'per click'},
    {name: 'drone', image: './assets/upgrades/drone.png', cost: 100, increase: 1, state: 'per second'},
    {name: 'excavator', image: './assets/upgrades/excavator.png', cost: 500, increase: 2, state: 'per second'},
    {name: 'station', image: './assets/upgrades/station.png', cost: 2000, increase: 4, state: 'per second'},
    {name: 'laser-core', image: './assets/upgrades/blank.png', cost: 10000, increase: 10, state: 'per second'},
    {name: 'nano-swarm', image: './assets/upgrades/blank.png', cost: 45000, increase: 20, state: 'per second'},
    {name: 'graviton', image: './assets/upgrades/blank.png', cost: 120000, increase: 50, state: 'per second'},
    {name: 'dyson-ring', image: './assets/upgrades/blank.png', cost: 375000, increase: 100, state: 'per second'},
    {name: 'void-extractor', image: './assets/upgrades/blank.png', cost: 999999, increase: 200, state: 'per second'},
    {name: 'multiverse', image: './assets/upgrades/blank.png', cost: 4237271, increase: 314, state: 'per second'},
]

function createUpgrades() {
    const upgradesContainer = document.getElementById('upgrades-container')
    const template = document.getElementById('upgrade-template').textContent

    defaultValues.forEach((obj) => {
        let html = template;

        Object.keys(obj).forEach((key) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            html = html.replace(regex, obj[key])
        });

        upgradesContainer.innerHTML += html
    })
}

createUpgrades()

export const upgrades = [
    {
        name: 'drill',
        cost: document.querySelector('.drill-cost'),
        parsedCost: parseFloat(document.querySelector('.drill-cost').innerHTML),
        increase: document.querySelector('.drill-increase'),
        parsedIncrease: parseFloat(document.querySelector('.drill-increase').innerHTML),
        level: document.querySelector('.drill-level'),
        powerUps: 
        [
            {
                name: '2x drilling',
                description: 'double your drilling power',
                multiplier: 2,
            },
            {
                name: '3x drilling',
                description: 'triple your drilling power',
                multiplier: 3,
            },
            {
                name: '4x drilling',
                description: '4x your drilling power',
                multiplier: 4,
            },
            {
                name: '5x drilling',
                description: '5x your drilling power',
                multiplier: 5,
            },
        ],
        power: 1,
        savedCost: 0,
        oreMultiplier: 1,
        costMultiplier: 1.25,

    },
    {
        name: 'drone',
        cost: document.querySelector('.drone-cost'),
        parsedCost: parseFloat(document.querySelector('.drone-cost').innerHTML),
        increase: document.querySelector('.drone-increase'),
        parsedIncrease: parseFloat(document.querySelector('.drone-increase').innerHTML),
        level: document.querySelector('.drone-level'),
        powerUps: 
        [
            {
                name: '2x efficiency',
                description: 'double drone output',
                multiplier: 2,
            },
            {
                name: '3x efficiency',
                description: 'triple drone output',
                multiplier: 3,
            },
            {
                name: '4x efficiency',
                description: '4x drone output',
                multiplier: 4,
            },
            {
                name: '5x efficiency',
                description: '5x drone output',
                multiplier: 5,
            },
        ],
        power: 0,
        savedCost: 0,
        oreMultiplier: 1.035,
        costMultiplier: 1.25,

    },
    {
        name: 'excavator',
        cost: document.querySelector('.excavator-cost'),
        parsedCost: parseFloat(document.querySelector('.excavator-cost').innerHTML),
        increase: document.querySelector('.excavator-increase'),
        parsedIncrease: parseFloat(document.querySelector('.excavator-increase').innerHTML),
        level: document.querySelector('.excavator-level'),
        powerUps: 
        [
            {
                name: '2x efficiency',
                description: 'double excavator output',
                multiplier: 2,
            },
            {
                name: '3x efficiency',
                description: 'triple excavator output',
                multiplier: 3,
            },
            {
                name: '4x efficiency',
                description: '4x excavator output',
                multiplier: 4,
            },
            {
                name: '5x efficiency',
                description: '5x excavator output',
                multiplier: 5,
            },
        ],
        power: 0,
        savedCost: 0,
        oreMultiplier: 1.04,
        costMultiplier: 1.25,

    },
    {
        name: 'station',
        cost: document.querySelector('.station-cost'),
        parsedCost: parseFloat(document.querySelector('.station-cost').innerHTML),
        increase: document.querySelector('.station-increase'),
        parsedIncrease: parseFloat(document.querySelector('.station-increase').innerHTML),
        level: document.querySelector('.station-level'),
        powerUps: 
        [
            {
                name: '2x efficiency',
                description: 'double station output',
                multiplier: 2,
            },
            {
                name: '3x efficiency',
                description: 'triple station output',
                multiplier: 3,
            },
            {
                name: '4x efficiency',
                description: '4x station output',
                multiplier: 4,
            },
            {
                name: '5x efficiency',
                description: '5x station output',
                multiplier: 5,
            },
        ],
        power: 0,
        savedCost: 0,
        oreMultiplier: 1.05,
        costMultiplier: 1.25,

    },
    {
        name: 'laser-core',
        cost: document.querySelector('.laser-core-cost'),
        parsedCost: parseFloat(document.querySelector('.laser-core-cost').innerHTML),
        increase: document.querySelector('.laser-core-increase'),
        parsedIncrease: parseFloat(document.querySelector('.laser-core-increase').innerHTML),
        level: document.querySelector('.laser-core-level'),
        powerUps: 
        [
            {
                name: '2x efficiency',
                description: 'double laser-core output',
                multiplier: 2,
            },
            {
                name: '3x efficiency',
                description: 'triple laser-core output',
                multiplier: 3,
            },
            {
                name: '4x efficiency',
                description: '4x laser-core output',
                multiplier: 4,
            },
            {
                name: '5x efficiency',
                description: '5x laser-core output',
                multiplier: 5,
            },
        ],
        power: 0,
        savedCost: 0,
        oreMultiplier: 1.05,
        costMultiplier: 1.25,

    },
    {
        name: 'nano-swarm',
        cost: document.querySelector('.nano-swarm-cost'),
        parsedCost: parseFloat(document.querySelector('.nano-swarm-cost').innerHTML),
        increase: document.querySelector('.nano-swarm-increase'),
        parsedIncrease: parseFloat(document.querySelector('.nano-swarm-increase').innerHTML),
        level: document.querySelector('.nano-swarm-level'),
        powerUps: 
        [
            {
                name: '2x efficiency',
                description: 'double nano-swarm output',
                multiplier: 2,
            },
            {
                name: '3x efficiency',
                description: 'triple nano-swarm output',
                multiplier: 3,
            },
            {
                name: '4x efficiency',
                description: '4x nano-swarm output',
                multiplier: 4,
            },
            {
                name: '5x efficiency',
                description: '5x nano-swarm output',
                multiplier: 5,
            },
        ],
        power: 0,
        savedCost: 0,
        oreMultiplier: 1.05,
        costMultiplier: 1.2,

    },
    {
        name: 'graviton',
        cost: document.querySelector('.graviton-cost'),
        parsedCost: parseFloat(document.querySelector('.graviton-cost').innerHTML),
        increase: document.querySelector('.graviton-increase'),
        parsedIncrease: parseFloat(document.querySelector('.graviton-increase').innerHTML),
        level: document.querySelector('.graviton-level'),
        powerUps: 
        [
            {
                name: '2x efficiency',
                description: 'double graviton output',
                multiplier: 2,
            },
            {
                name: '3x efficiency',
                description: 'triple graviton output',
                multiplier: 3,
            },
            {
                name: '4x efficiency',
                description: '4x graviton output',
                multiplier: 4,
            },
            {
                name: '5x efficiency',
                description: '5x graviton output',
                multiplier: 5,
            },
        ],
        power: 0,
        savedCost: 0,
        oreMultiplier: 1.05,
        costMultiplier: 1.2,

    },
    {
        name: 'dyson-ring',
        cost: document.querySelector('.dyson-ring-cost'),
        parsedCost: parseFloat(document.querySelector('.dyson-ring-cost').innerHTML),
        increase: document.querySelector('.dyson-ring-increase'),
        parsedIncrease: parseFloat(document.querySelector('.dyson-ring-increase').innerHTML),
        level: document.querySelector('.dyson-ring-level'),
        powerUps: 
        [
            {
                name: '2x efficiency',
                description: 'double dyson-ring output',
                multiplier: 2,
            },
            {
                name: '3x efficiency',
                description: 'triple dyson-ring output',
                multiplier: 3,
            },
            {
                name: '4x efficiency',
                description: '4x dyson-ring output',
                multiplier: 4,
            },
            {
                name: '5x efficiency',
                description: '5x dyson-ring output',
                multiplier: 5,
            },
        ],
        power: 0,
        savedCost: 0,
        oreMultiplier: 1.05,
        costMultiplier: 1.2,

    },
    {
        name: 'void-extractor',
        cost: document.querySelector('.void-extractor-cost'),
        parsedCost: parseFloat(document.querySelector('.void-extractor-cost').innerHTML),
        increase: document.querySelector('.void-extractor-increase'),
        parsedIncrease: parseFloat(document.querySelector('.void-extractor-increase').innerHTML),
        level: document.querySelector('.void-extractor-level'),
        powerUps: 
        [
            {
                name: '2x efficiency',
                description: 'double void-extractor output',
                multiplier: 2,
            },
            {
                name: '3x efficiency',
                description: 'triple void-extractor output',
                multiplier: 3,
            },
            {
                name: '4x efficiency',
                description: '4x void-extractor output',
                multiplier: 4,
            },
            {
                name: '5x efficiency',
                description: '5x void-extractor output',
                multiplier: 5,
            },
        ],
        power: 0,
        savedCost: 0,
        oreMultiplier: 1.05,
        costMultiplier: 1.1,

    },
    {
        name: 'multiverse',
        cost: document.querySelector('.multiverse-cost'),
        parsedCost: parseFloat(document.querySelector('.multiverse-cost').innerHTML),
        increase: document.querySelector('.multiverse-increase'),
        parsedIncrease: parseFloat(document.querySelector('.multiverse-increase').innerHTML),
        level: document.querySelector('.multiverse-level'),
        powerUps: 
        [
            {
                name: '2x efficiency',
                description: 'double multiverse output',
                multiplier: 2,
            },
            {
                name: '3x efficiency',
                description: 'triple multiverse output',
                multiplier: 3,
            },
            {
                name: '4x efficiency',
                description: '4x multiverse output',
                multiplier: 4,
            },
            {
                name: '5x efficiency',
                description: '5x multiverse output',
                multiplier: 5,
            },
        ],
        power: 0,
        savedCost: 0,
        oreMultiplier: 1.05,
        costMultiplier: 1.05,

    },

]

export const powerUpIntervals = [10, 25, 50, 100]