class Plateau {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    // here iam checking if rovers moving inside the rectangle
    isWithinBorder(x, y) {
        return x >= 0 && x <= this.width && y >= 0 && y <= this.height;
    }
}

class Rover {
    constructor(x, y, direction, plateau) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.plateau = plateau;
    }
// possible facing directions list
    static DIRECTION = {
        'N': {'L': 'W', 'R': 'E'},
        'E': {'L': 'N', 'R': 'S'},
        'S': {'L': 'E', 'R': 'W'},
        'W': {'L': 'S', 'R': 'N'},
    }

    turnLeft(){
        this.direction = Rover.DIRECTION[this.direction]['L'];
    }
    turnRight(){
        this.direction = Rover.DIRECTION[this.direction]['R'];
    }
    moveForward() {
        let newX = this.x;
        let newY = this.y;
        switch (this.direction) {
            case 'N':
                newY += 1;
                break;
            case 'E':
                newX += 1;
                break;
            case 'S':
                newY -= 1;
                break;
            case 'W':
                newX -= 1;
                break;
        }
        if (this.plateau.isWithinBorder(newX, newY)) {
            this.x = newX;
            this.y = newY;
        }
    }
    executeInstructions(instructions) {
        for (let instruction of instructions) {
            switch (instruction) {
                case 'L':
                    this.turnLeft();
                    break;
                case 'R':
                    this.turnRight();
                    break;
                case 'M':
                    this.moveForward();
                    break;
            }
        }
    }
    getPosition() {
        return `${this.x} ${this.y} ${this.direction}`;
    }
}
function parseRoverCoords(input) {
    const lines = input.trim().split('\n');
    const [plateauWidth, plateauHeight] = lines[0].split(' ').map(Number);
    const plateau = new Plateau(plateauWidth, plateauHeight);

    const rovers = [];
    for (let i = 1; i < lines.length; i += 2) {
        const [x, y, direction] = lines[i].split(' ');
        const instructions = lines[i + 1];
        const rover = new Rover(parseInt(x), parseInt(y), direction, plateau);
        rovers.push({ rover, instructions });
    }

    return rovers;
}

function marsRover(input) {
    const rovers = parseRoverCoords(input);
    const results = rovers.map(({ rover, instructions }) => {
        rover.executeInstructions(instructions);
        return rover.getPosition();
    });

    return results.join('\n');
}

function testMarsRover() {
    const testCases = [
        {
            input: `5 5
                    1 2 N
                    LMLMLMLMM
                    3 3 E
                    MMRMMRMRRM`,
            expectedOutput: `1 3 N\n5 1 E`
        },
        {
            input: `10 10
                    0 0 N
                    MMMMMMMMMM
                    5 5 E
                    MMMMM`,
            expectedOutput: `0 10 N\n10 5 E`
        },
        {
            input: `8 8
                    2 3 S
                    MMRMMRMRRM
                    7 8 W
                    LMMLMMRMM`,
            expectedOutput: `2 1 W\n6 8 N` // this is special mistaken case just for checking right working my tests solution ) real output will be: `0 1 S | 8 4 S`
        }
    ];

    let allTestsPassed = true;

    testCases.forEach((testCase, index) => {
        const output = marsRover(testCase.input);
        const passed = output === testCase.expectedOutput;
        console.log(`Test Case ${index + 1}: ${passed ? 'PASSED' : 'FAILED'}`);
        if (!passed) {
            console.log(`Expected: ${testCase.expectedOutput}`);
            console.log(`Got: ${output}`);
            allTestsPassed = false;
        }
    });

    if (allTestsPassed) {
        console.log('All tests passed!');
    } else {
        console.log('Some tests failed.');
    }
}
testMarsRover();
