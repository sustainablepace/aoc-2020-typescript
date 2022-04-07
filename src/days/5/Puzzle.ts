import Puzzle from '../../types/AbstractPuzzle';

type BoardingPass = {
    row: number,
    column: number
}

function seatId(pass: BoardingPass): number {
    return 8* pass.row + pass.column;
}

export default class ConcretePuzzle extends Puzzle {
    private parse = (input: string): BoardingPass[] => {
        return input.split('\n')
            .flatMap((line: string) => this.parseBoardingPass(line));
    };

    private parseBoardingPass = (input: string): BoardingPass => {
        return {
            row: parseInt(input.slice(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2),
            column: parseInt(input.slice(7, 10).replace(/L/g, '0').replace(/R/g, '1'), 2)
        };
    };

    public solveFirst(): string {
        expect(this.parseBoardingPass('FBFBBFFRLR')).toEqual({
            row: 44,
            column: 5
        });
        expect(seatId(this.parseBoardingPass('FBFBBFFRLR'))).toEqual(357);

        const boardingPasses = this.parse(this.input);
        const res = boardingPasses
            .map((b: BoardingPass) => seatId(b))
            .sort((a:number, b:number) => a-b)
            .pop();
        return `${res}`;
    }

    public solveSecond(): string {
        const boardingPasses = this.parse(this.input);

        function difference(a: Array<number>, b: Array<number>) {
            const _difference = new Set(a);
            for (const elem of b) {
                _difference.delete(elem);
            }
            return Array.from(_difference);
        }

        const allSeats = Array.from(Array(871).keys()); // 871 is solution from part 1
        const takenSeats = boardingPasses.map((b: BoardingPass) => seatId(b));

        const res = difference(allSeats, takenSeats);
        return `${res.pop()}`;
    }

    public getFirstExpectedResult(): string {
        return '871';
    }

    public getSecondExpectedResult(): string {
        return '640';
    }
}
