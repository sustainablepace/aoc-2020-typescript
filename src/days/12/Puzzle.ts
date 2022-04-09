import Puzzle from '../../types/AbstractPuzzle';

const example1 = `F10
N3
F7
R90
F11`;

export default class ConcretePuzzle extends Puzzle {

    private parse(input: string): [string, number][] {
        return input
            .split('\n')
            .filter((line: string) => line !== '')
            .map((line: string) => [line.slice(0, 1), parseInt(line.slice(1), 10)]);
    }

    private manhattanDistance(directions: [string, number][]): number {
        let coordinates = [0, 0];
        let orientation = 'E';

        directions.forEach(([command, value]) => {
            if (command === 'F') {
                if (orientation === 'N') {
                    coordinates = [coordinates[0], coordinates[1] + value];
                } else if (orientation === 'E') {
                    coordinates = [coordinates[0] + value, coordinates[1]];
                } else if (orientation === 'W') {
                    coordinates = [coordinates[0] - value, coordinates[1]];
                } else if (orientation === 'S') {
                    coordinates = [coordinates[0], coordinates[1] - value];
                }
            } else if (command === 'L') {
                if (orientation === 'N') {
                    if (value === 90) {
                        orientation = 'W';
                    } else if (value === 180) {
                        orientation = 'S';
                    } else if (value === 270) {
                        orientation = 'E';
                    }
                } else if (orientation === 'E') {
                    if (value === 90) {
                        orientation = 'N';
                    } else if (value === 180) {
                        orientation = 'W';
                    } else if (value === 270) {
                        orientation = 'S';
                    }
                } else if (orientation === 'W') {
                    if (value === 90) {
                        orientation = 'S';
                    } else if (value === 180) {
                        orientation = 'E';
                    } else if (value === 270) {
                        orientation = 'N';
                    }
                } else if (orientation === 'S') {
                    if (value === 90) {
                        orientation = 'E';
                    } else if (value === 180) {
                        orientation = 'N';
                    } else if (value === 270) {
                        orientation = 'W';
                    }
                }
            } else if (command === 'R') {
                if (orientation === 'N') {
                    if (value === 90) {
                        orientation = 'E';
                    } else if (value === 180) {
                        orientation = 'S';
                    } else if (value === 270) {
                        orientation = 'W';
                    }
                } else if (orientation === 'E') {
                    if (value === 90) {
                        orientation = 'S';
                    } else if (value === 180) {
                        orientation = 'W';
                    } else if (value === 270) {
                        orientation = 'N';
                    }
                } else if (orientation === 'W') {
                    if (value === 90) {
                        orientation = 'N';
                    } else if (value === 180) {
                        orientation = 'E';
                    } else if (value === 270) {
                        orientation = 'S';
                    }
                } else if (orientation === 'S') {
                    if (value === 90) {
                        orientation = 'W';
                    } else if (value === 180) {
                        orientation = 'N';
                    } else if (value === 270) {
                        orientation = 'E';
                    }
                }
            } else if (command === 'N') {
                coordinates = [coordinates[0], coordinates[1] + value];
            } else if (command === 'E') {
                coordinates = [coordinates[0] + value, coordinates[1]];
            } else if (command === 'W') {
                coordinates = [coordinates[0] - value, coordinates[1]];
            } else if (command === 'S') {
                coordinates = [coordinates[0], coordinates[1] - value];
            }
        });
        return Math.abs(coordinates[0]) + Math.abs(coordinates[1]);
    }

    private manhattanDistance2(directions: [string, number][]): number {
        let coordinates = [0, 0];
        let waypoint = [10, 1];

        directions.forEach(([command, value]) => {
            if (command === 'N') {
                waypoint = [waypoint[0], waypoint[1] + value];
            } else if (command === 'E') {
                waypoint = [waypoint[0] + value, waypoint[1]];
            } else if (command === 'W') {
                waypoint = [waypoint[0] - value, waypoint[1]];
            } else if (command === 'S') {
                waypoint = [waypoint[0], waypoint[1] - value];
            } else if (command === 'F') {
                coordinates = [coordinates[0] + value * waypoint[0], coordinates[1] + value * waypoint[1]];
            } else if (command === 'L') {
                if (value === 90) {
                    waypoint = [-waypoint[1], waypoint[0]];
                } else if (value === 180) {
                    waypoint = [-waypoint[0], -waypoint[1]];
                } else if (value === 270) {
                    waypoint = [waypoint[1], -waypoint[0]];
                }
            } else if (command === 'R') {
                if (value === 270) {
                    waypoint = [-waypoint[1], waypoint[0]];
                } else if (value === 180) {
                    waypoint = [-waypoint[0], -waypoint[1]];
                } else if (value === 90) {
                    waypoint = [waypoint[1], -waypoint[0]];
                }
            }
        });
        return Math.abs(coordinates[0]) + Math.abs(coordinates[1]);
    }

    public solveFirst(): string {
        const exampleDirections = this.parse(example1);
        expect(this.manhattanDistance(exampleDirections)).toEqual(25);

        const directions = this.parse(this.input);
        const res = this.manhattanDistance(directions);
        return `${res}`;
    }

    public solveSecond(): string {
        const exampleDirections = this.parse(example1);
        expect(this.manhattanDistance2(exampleDirections)).toEqual(286);

        const directions = this.parse(this.input);
        const res = this.manhattanDistance2(directions);
        return `${res}`;
    }

    public getFirstExpectedResult(): string {
        return '2270';
    }

    public getSecondExpectedResult(): string {
        return '138669';
    }
}
