import Puzzle from '../../types/AbstractPuzzle';

type Answers = Set<string>
type Group = Answers[]

export default class ConcretePuzzle extends Puzzle {
    private parse = (input: string): Group[] => {
        const lines = input.split('\n');

        const groups = [];
        let group: Group = [];
        while (lines.length > 0) {
            const line = lines.shift();
            if (line !== undefined && line != '') {
                const answers: Answers = new Set(line.split(''));
                group.push(answers);
            } else {
                if (group.length > 0) {
                    groups.push(group);
                }
                group = [];
            }
        }
        if (group.length > 0) {
            groups.push(group);
        }
        return groups;
    };

    private union(a: Answers, b: Answers): Answers {
        return new Set(Array.from(a).concat(Array.from(b)));

    }

    private intersect(a: Answers, b: Answers): Answers {
        return new Set(
            Array.from(a).filter(x => b.has(x))
        );
    }

    private findCommonAnswers(group: Group | undefined) {
        return group? group.reduce(((previousValue: Answers, currentValue) => {
            if (previousValue) {
                return this.intersect(previousValue, currentValue);
            } else {
                return currentValue;
            }
        })) : new Set();
    }

    private findAllAnswers(group: Group | undefined) {
        return group? group.reduce(((previousValue: Answers, currentValue) => {
            if (previousValue) {
                return this.union(previousValue, currentValue);
            } else {
                return currentValue;
            }
        })) : new Set();
    }

    public solveFirst(): string {
        const smallGroup = `
abcx
abcy
abcz`;
        expect(this.findAllAnswers(this.parse(smallGroup).shift())).toEqual(new Set(['a', 'b', 'c', 'x', 'y', 'z']));

        const groups = this.parse(this.input);
        const res = groups
            .map((group: Group) => this.findAllAnswers(group))
            .map((a: Answers) => Array.from(a).length)
            .reduce((previousValue = 0, currentValue) => previousValue + currentValue);
        return `${res}`;
    }

    public solveSecond(): string {
        const smallGroup = `
abcx
abcy
abcz`;
        expect(this.findCommonAnswers(this.parse(smallGroup).shift())).toEqual(new Set(['a', 'b', 'c']));

        const groups = this.parse(this.input);
        const res = groups
            .map((group: Group) => this.findCommonAnswers(group))
            .map((a: Answers) => Array.from(a).length)
            .reduce((previousValue = 0, currentValue) => previousValue + currentValue);
        return `${res}`;
    }

    public getFirstExpectedResult(): string {
        return '6335';
    }

    public getSecondExpectedResult(): string {
        return '3392';
    }
}
