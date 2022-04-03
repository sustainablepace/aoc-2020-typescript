import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
    private parse = (input: string) => input.split('\n').map((s: string) => parseInt(s));

    public solveFirst(): string {
        const numbers = this.parse(this.input);
        let res = 0;
        for (let i = 0; i < numbers.length; i++) {
            for (let j = i + 1; j < numbers.length; j++) {
                if (numbers[i] + numbers[j] == 2020) {
                    res = numbers[i] * numbers[j];
                }
            }
        }
        return `${res}`;
    }

    public solveSecond(): string {
        const numbers = this.parse(this.input);
        let res = 0;
        for (let i = 0; i < numbers.length; i++) {
            for (let j = i + 1; j < numbers.length; j++) {
                for (let k = j + 1; k < numbers.length; k++) {
                    if (numbers[i] + numbers[j] + numbers[k] == 2020) {
                        res = numbers[i] * numbers[j] * numbers[k];
                    }
                }
            }
        }
        return `${res}`;
    }

    public getFirstExpectedResult(): string {
        return '703131';
    }

    public getSecondExpectedResult(): string {
        return '272423970';
    }
}
