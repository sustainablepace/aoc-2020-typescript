import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
    private parse = (input: string) => input.split('\n').map((s: string) => parseInt(s));

    public solveFirst(): string {
        const numbers = this.parse(this.input);
        let res = 0;
        numbers.map((first: number) => {
                numbers.map((second: number) => {
                        if (first + second == 2020) {
                            res = first * second;
                        }
                    }
                );
            }
        );
        return `${res}`;
    }

    public solveSecond(): string {
        const numbers = this.parse(this.input);
        let res = 0;
        numbers.map((first: number) => {
                numbers.map((second: number) => {
                        numbers.map((third: number) => {
                                if (first + second + third == 2020) {
                                    res = first * second * third;
                                }
                            }
                        );
                    }
                );
            }
        );
        return `${res}`;
    }

    public getFirstExpectedResult(): string {
        return '703131';
    }

    public getSecondExpectedResult(): string {
        return '272423970';
    }
}
