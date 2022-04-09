import Puzzle from '../../types/AbstractPuzzle';

const example1 = `
L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

export default class ConcretePuzzle extends Puzzle {

    private parse(input: string): string[][] {
        return input
            .split('\n')
            .filter((line) => line !== '')
            .map((line) => line.split(''));
    }

    private neighbours = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

    private countAdjacentOccupied(seatPlan: string[][], row: number, col: number): number {
        const currentNeighbours = this.neighbours.map((c) => [c[0] + row, c[1] + col]);
        return currentNeighbours
            .filter(([r, c]) => r >= 0 && r < seatPlan.length && c >= 0 && c < seatPlan[0].length)
            .map(([r, c]): number => seatPlan[r][c] == '#' ? 1 : 0)
            .reduce((previousValue = 0, currentValue) => previousValue + currentValue);
    }

    private countFirstVisibleOccupied(seatPlan: string[][], row: number, col: number): number {
        return this.neighbours.filter(([r, c]): boolean => {
            let step = 1;
            while (true) {
                const [x, y] = [step*r + row, step*c + col];
                if (x >= 0 && x < seatPlan.length && y >= 0 && y < seatPlan[0].length) {
                    if (seatPlan[x][y] === '#') {
                        return true;
                    }
                    if (seatPlan[x][y] === 'L') {
                        return false;
                    }
                } else {
                    break;
                }
                step++;
            }
            return false;
        }).length;

    }

    private waitUntilStableThenCountOccupied(originalSeatplan: string[][]): number {
        let seatplan = originalSeatplan;
        while (true) {
            const emptySeatPlan = [...Array(originalSeatplan.length)].map(() => [...Array(originalSeatplan[0].length)]);
            for (let row = 0; row < seatplan.length; row++) {
                for (let col = 0; col < seatplan[row].length; col++) {
                    const status = seatplan[row][col];
                    if (status == '.') {
                        emptySeatPlan[row][col] = '.';
                    } else if (status == '#') {
                        if (this.countAdjacentOccupied(seatplan, row, col) >= 4) {
                            emptySeatPlan[row][col] = 'L';
                        } else {
                            emptySeatPlan[row][col] = '#';
                        }
                    } else {
                        if (this.countAdjacentOccupied(seatplan, row, col) === 0) {
                            emptySeatPlan[row][col] = '#';
                        } else {
                            emptySeatPlan[row][col] = 'L';
                        }
                    }
                }
            }
            if (seatplan.toString() === emptySeatPlan.toString()) {
                break;
            }
            seatplan = emptySeatPlan;
        }

        return seatplan.flatMap((i) => i).filter((i) => i === '#').length;
    }

    private waitUntilStableFirstVisibleThenCountOccupied(originalSeatplan: string[][]): number {
        let seatplan = originalSeatplan;
        while (true) {
            const emptySeatPlan = [...Array(originalSeatplan.length)].map(() => [...Array(originalSeatplan[0].length)]);
            for (let row = 0; row < seatplan.length; row++) {
                for (let col = 0; col < seatplan[row].length; col++) {
                    const status = seatplan[row][col];
                    if (status == '.') {
                        emptySeatPlan[row][col] = '.';
                    } else if (status == '#') {
                        if (this.countFirstVisibleOccupied(seatplan, row, col) >= 5) {
                            emptySeatPlan[row][col] = 'L';
                        } else {
                            emptySeatPlan[row][col] = '#';
                        }
                    } else {
                        if (this.countFirstVisibleOccupied(seatplan, row, col) === 0) {
                            emptySeatPlan[row][col] = '#';
                        } else {
                            emptySeatPlan[row][col] = 'L';
                        }
                    }
                }
            }
            if (seatplan.toString() === emptySeatPlan.toString()) {
                break;
            }
            seatplan = emptySeatPlan;
        }

        return seatplan.flatMap((i) => i).filter((i) => i === '#').length;

    }
    public solveFirst(): string {
        const example1SeatPlan = this.parse(example1);
        expect(this.waitUntilStableThenCountOccupied(example1SeatPlan)).toEqual(37);

        const seatPlan = this.parse(this.input);
        const res = this.waitUntilStableThenCountOccupied(seatPlan);
        return `${res}`;
    }

    public solveSecond(): string {
        const example1SeatPlan = this.parse(example1);
        expect(this.waitUntilStableFirstVisibleThenCountOccupied(example1SeatPlan)).toEqual(26);

        const seatPlan = this.parse(this.input);
        const res = this.waitUntilStableFirstVisibleThenCountOccupied(seatPlan);
        return `${res}`;
    }

    public getFirstExpectedResult(): string {
        return '2251';
    }

    public getSecondExpectedResult(): string {
        return '2019';
    }
}
