import Puzzle from '../../types/AbstractPuzzle';

const example = `
35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

export default class ConcretePuzzle extends Puzzle {

    private parse(input: string): number[] {
        return input.split('\n').filter((line: string) => line !== '').map((num:string) => parseInt(num, 10));
    }

    private findInvalidNumber(transmission: number[], preamble: number) : number {
        let index = preamble;
        let sumFound = false;
        while (index < transmission.length) {
            const window = transmission.slice(index-preamble, index).sort((a, b) => b-a);
            const num = transmission[index];
            sumFound = false;
            for (let i=0; i<window.length; i++) {
                if (window[i] > num) {
                    continue;
                }
                for (let j=i+1; j<window.length; j++) {
                    if (window[i]+window[j] === num) {
                        sumFound = true;
                        break;
                    }
                    if (window[i]+window[j] < num) {
                        break;
                    }
                }
                if (sumFound) {
                    break;
                }
            }
            if (sumFound) {
                index++;
            } else {
                return transmission[index];
            }
        }
        return 0;
    }

    private findEncryptionWeakness(transmission: number[], preamble: number): number {
        const invalidNumber = this.findInvalidNumber(transmission, preamble);

        for (let windowSize=2; windowSize<transmission.length; windowSize++) {
            for (let i=0; i<transmission.length-windowSize; i++) {
                const window = transmission.slice(i, i+windowSize);
                const sum = window.reduce((previousValue = 0, currentValue) => previousValue + currentValue);
                if (sum === invalidNumber) {
                    return Math.min(...window)+Math.max(...window);
                }
            }
        }
        return 0;

    }
    public solveFirst(): string {

        const exampleCipher = this.parse(example);
        expect(this.findInvalidNumber(exampleCipher, 5)).toEqual(127);

        const cipher = this.parse(this.input);
        const res = this.findInvalidNumber(cipher, 25);
        return `${res}`;
    }

    public solveSecond(): string {
        const exampleCipher = this.parse(example);
        expect(this.findEncryptionWeakness(exampleCipher, 5)).toEqual(62);

        const cipher = this.parse(this.input);
        const res = this.findEncryptionWeakness(cipher, 25);

        return `${res}`;
    }

    public getFirstExpectedResult(): string {
        return '1212510616';
    }

    public getSecondExpectedResult(): string {
        return '171265123';
    }
}
