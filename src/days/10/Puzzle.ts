import Puzzle from '../../types/AbstractPuzzle';

const example1 = `
16
10
15
5
1
11
7
19
6
12
4`;

const example2 = `
28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

export default class ConcretePuzzle extends Puzzle {
    private parse(input: string): number[] {
        return input
            .split('\n')
            .filter((line: string) => line !== '')
            .map((line: string) => parseInt(line, 10));
    }

    private productOfDiff1AndDiff3(adapters: number[]): number {
        adapters.sort((a, b) => a - b);
        let diffOf1 = 0;
        let diffOf3 = 0;
        adapters.unshift(0);
        adapters.push(adapters[adapters.length - 1] + 3);
        for (let i = 0; i < adapters.length - 1; i++) {
            if (adapters[i + 1] - adapters[i] === 1) {
                diffOf1++;
            }
            if (adapters[i + 1] - adapters[i] === 3) {
                diffOf3++;
            }
        }
        return diffOf3*diffOf1;
    }

    private numCombinations(adapters: number[]): number {
        adapters.sort((a, b) => a - b);
        adapters.unshift(0);
        adapters.push(adapters[adapters.length - 1] + 3);

        let index = 0;
        const mapp = new Map<number, number>();

        while (index < adapters.length-1) {
            const n = adapters[index];
            adapters.slice(index+1, Math.min(adapters.length, index+4)).filter(
                (num: number) => num-n <= 3
            ).forEach(
                (num:number) => mapp.set(num, (mapp.get(n) ?? 1) + (mapp.get(num) ?? 0))
            );
            index++;
        }
        return mapp.get(adapters.pop() ?? 0) ?? 0;
    }
    public solveFirst(): string {
        const example1Adapters = this.parse(example1);
        expect(this.productOfDiff1AndDiff3(example1Adapters)).toEqual(35);

        const example2Adapters = this.parse(example2);
        expect(this.productOfDiff1AndDiff3(example2Adapters)).toEqual(220);

        const adapters = this.parse(this.input);
        const res = this.productOfDiff1AndDiff3(adapters);
        return `${res}`;
    }

    public solveSecond(): string {
        const example1Adapters = this.parse(example1);
        expect(this.numCombinations(example1Adapters)).toEqual(8);

        const example2Adapters = this.parse(example2);
        expect(this.numCombinations(example2Adapters)).toEqual(19208);

        const adapters = this.parse(this.input);
        const res = this.numCombinations(adapters);
        return `${res}`;
    }

    public getFirstExpectedResult(): string {
        return '2201';
    }

    public getSecondExpectedResult(): string {
        return '169255295254528';
    }
}
