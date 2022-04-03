import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
    private parse = (input: string): [number, number, string, string][] => input.split('\n')
        .map((s: string) => s.split(': '))
        .map((s: string[]) => s[0].split(' ').concat([s[1]]))
        .map((s: string[]) => {
            const fromTo = s[0].split('-').map((num: string) => parseInt(num, 10));
            return [fromTo[0], fromTo[1], s[1], s[2]];
        });

    public solveFirst(): string {
        const passwords = this.parse(this.input);
        const res = passwords.filter((line: [number, number, string, string]) => {
            const password = line[3];
            const character = line[2];
            const min = line[0];
            const max = line[1];
            let numberOfOccurences = 0;
            for (let i=0; i<password.length; i++) {
                if (password[i] == character) {
                    numberOfOccurences++;
                }
            }
            return numberOfOccurences >= min && numberOfOccurences <= max;
        }).length;

        return `${res}`;
    }

    public solveSecond(): string {
        const passwords = this.parse(this.input);
        const res = passwords.filter((line: [number, number, string, string]) => {
            const password = line[3];
            const character = line[2];
            const pos1 = line[0]-1;
            const pos2 = line[1]-1;

            return (password[pos1] === character ? 1 : 0) ^ (password[pos2] === character ? 1 : 0);
        }).length;

        return `${res}`;
    }

    public getFirstExpectedResult(): string {
        return '614';
    }

    public getSecondExpectedResult(): string {
        return '354';
    }
}
