import Puzzle from '../../types/AbstractPuzzle';

enum Landscape {
    Snow, Tree
}

export default class ConcretePuzzle extends Puzzle {
    private parse = (input: string): Landscape[][] => input.split('\n')
        .map((s: string) => s.split('').map((c: string) => c == '#' ? Landscape.Tree : Landscape.Snow));

    private calculateNumberOfTrees(landscape: Landscape[][], slope: [number, number]) {
        let column = 0;
        let numTrees = 0;
        for (let row = 0; row < landscape.length; row += slope[1]) {
            if (column >= landscape[row].length) {
                column = column % landscape[row].length;
            }
            if (landscape[row][column] == Landscape.Tree) {
                numTrees++;
            }
            column += slope[0];
        }
        return numTrees;
    }

    public solveFirst(): string {
        const landscape = this.parse(this.input);
        const res = this.calculateNumberOfTrees(landscape, [3, 1]);
        return `${res}`;
    }

    public solveSecond(): string {
        const landscape = this.parse(this.input);
        const slopes: [number, number][] = [
            [1, 1],
            [3, 1],
            [5, 1],
            [7, 1],
            [1, 2]
        ];
        const res = slopes.map((slope: [number, number]) =>
            this.calculateNumberOfTrees(landscape, slope)
        ).reduce((previousValue = 0, currentValue: number) =>
            previousValue * currentValue
        );
        return `${res}`;
    }

    public getFirstExpectedResult(): string {
        return '232';
    }

    public getSecondExpectedResult(): string {
        return '3952291680';
    }
}
