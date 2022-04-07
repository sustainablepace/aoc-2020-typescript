import Puzzle from '../../types/AbstractPuzzle';

const exampleRulesStr = `
light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

type Bag = string;

class Rule {
    public container: Bag;
    public containedBags: [number, Bag][];

    constructor(container: Bag, containedBags: [number, Bag][]) {
        this.container = container;
        this.containedBags = containedBags;
    }

    public mustContain(bag: Bag): boolean {
        return this.containedBags.some(([, containedBag]) => containedBag === bag);
    }
}

export default class ConcretePuzzle extends Puzzle {

    private parse(input: string): Rule[] {
        return input
            .split('\n')
            .filter((line: string) => line !== '')
            .map((line: string) => {
                const [container, containedStr] = line
                    .replace('.', '')
                    .replaceAll(' bags', '')
                    .replaceAll(' bag', '')
                    .split(' contain ');
                const contained: [number, Bag][] = (containedStr === 'no other' ? [] : containedStr.split(', '))
                    .map((containedBag: string) => {
                        const indexOfSeparator = containedBag.indexOf(' ');
                        const numberOfBags = parseInt(containedBag.slice(0, indexOfSeparator), 10);
                        const bag = containedBag.slice(indexOfSeparator + 1);
                        return [numberOfBags, bag];
                    });

                return new Rule(container, contained);
            });
    }

    private numberOfContainedBags(rules: Rule[], originalBag: Bag): number {
        let bagsToFind: [number, Bag][] = [[1, originalBag]];
        let foundBags = 0;
        while (bagsToFind.length > 0) {
            bagsToFind.forEach(
                ([num, bag]) => bag !== originalBag && (foundBags += num)
            );
            bagsToFind = rules.flatMap(
                (rule: Rule) => bagsToFind
                    .flatMap(([m, currentBagToFind]) =>
                        rule.container !== currentBagToFind ? [] : rule.containedBags.map(
                            ([n, containedBag]): [number, Bag] => [m * n, containedBag]
                        )
                    )
            );
        }
        return foundBags;
    }

    private findContainingBags(rules: Rule[], bagToFind: Bag): Set<Bag> {
        let bagsToFind = new Set([bagToFind]);
        const foundBags = new Set<Bag>();
        while (bagsToFind.size > 0) {
            bagsToFind = new Set(rules
                .filter((rule: Rule) => {
                    let found = false;
                    bagsToFind.forEach((bag: Bag) => {
                        found = found || rule.mustContain(bag);
                        if (bag !== bagToFind) {
                            foundBags.add(bag);
                        }
                    });
                    return found;
                })
                .map((rule: Rule) => rule.container));

        }
        return foundBags;
    }

    public solveFirst(): string {
        const exampleRules = this.parse(exampleRulesStr);
        expect(exampleRules).toHaveLength(9);
        expect(this.findContainingBags(exampleRules, 'shiny gold').size).toEqual(4);

        const rules = this.parse(this.input);
        const foundBags = this.findContainingBags(rules, 'shiny gold');
        return `${(foundBags.size)}`;
    }

    public solveSecond(): string {
        const exampleRules = this.parse(exampleRulesStr);
        expect(exampleRules).toHaveLength(9);
        expect(this.numberOfContainedBags(exampleRules, 'shiny gold')).toEqual(32);

        const rules = this.parse(this.input);
        const res = this.numberOfContainedBags(rules, 'shiny gold');
        return `${res}`;
    }

    public getFirstExpectedResult(): string {
        return '172';
    }

    public getSecondExpectedResult(): string {
        return '39645';
    }
}
