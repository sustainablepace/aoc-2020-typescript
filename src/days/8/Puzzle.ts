import Puzzle from '../../types/AbstractPuzzle';

type Program = [string, number][]
type State = 'terminated' | 'infiniteLoop'

export default class ConcretePuzzle extends Puzzle {

    private parse(input: string): Program {
        const program: Program = [];
        input
            .split('\n')
            .filter((l) => l !== '')
            .map((line: string) => {
                const [op, inc] = line.split(' ');
                program.push([op, parseInt(inc, 10) ?? 0]);
            });
        return program;
    }

    private execute(program: Program): [State, number] {
        const executedOperations: Set<number> = new Set();
        let pointer = 0;
        let accumulator = 0;
        let terminated = false;
        while (!terminated && !executedOperations.has(pointer)) {
            executedOperations.add(pointer);

            const [op, inc] = program[pointer];
            if (op === 'nop') {
                pointer++;
            } else if (op === 'acc') {
                accumulator += inc;
                pointer++;
            } else if (op === 'jmp') {
                pointer += inc;
            }
            if (pointer >= program.length) {
                terminated = true;
            }
        }
        return [terminated ? 'terminated' : 'infiniteLoop', accumulator];
    }

    public solveFirst(): string {
        const program = this.parse(this.input);
        const [, res] = this.execute(program);
        return `${res}`;
    }

    private fixProgram([changedIndex, program]: [number, Program]): [number, Program] {
        while (changedIndex < program.length) {
            const [op] = program[changedIndex];
            if (op === 'acc') {
                changedIndex++;
            } else {
                break;
            }
        }

        const fixedProgram = JSON.parse(JSON.stringify(program));
        const [op, inc] = fixedProgram[changedIndex];
        if (op === 'jmp') {
            fixedProgram[changedIndex] = ['nop', inc];
        } else if (op == 'nop') {
            fixedProgram[changedIndex] = ['jmp', inc];
        }
        changedIndex++;
        return [changedIndex, fixedProgram];

    }

    private manipulateUntilTerminates(program: Program): number {
        let s = '';
        let res = 0;
        let lastFixedIndex = 0;
        while (s !== 'terminated') {
            const [newIndex, fixedProgram] = this.fixProgram([lastFixedIndex, program]);
            lastFixedIndex = newIndex;

            const [state, accumulator] = this.execute(fixedProgram);
            s = state;
            res = accumulator;
        }
        return res;
    }

    public solveSecond(): string {
        const exampleProgramCode = `
nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

        const exampleProgram = this.parse(exampleProgramCode);
        expect(this.manipulateUntilTerminates(exampleProgram)).toEqual(8);

        const program = this.parse(this.input);
        const res = this.manipulateUntilTerminates(program);

        return `${res}`;
    }

    public getFirstExpectedResult(): string {
        return '1801';
    }

    public getSecondExpectedResult(): string {
        return '2060';
    }
}
