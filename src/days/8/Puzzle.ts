import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {

    public solveFirst(): string {
        const res = 0;
        return `${res}`;
    }

    public solveSecond(): string {
        const res = 0;
        return `${res}`;
    }

    public getFirstExpectedResult(): string {
        return '0';
    }

    public getSecondExpectedResult(): string {
        return '0';
    }
}
