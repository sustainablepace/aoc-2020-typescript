import Puzzle from '../../types/AbstractPuzzle';

interface Passport {
    [attribute: string]: string
}

const invalidPassports = `
eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007
`;

const validPassports = `
pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719
`;

export default class ConcretePuzzle extends Puzzle {
    private parse = (input: string): Passport[] => {
        const lines = input.split('\n')
            .flatMap((line: string) => line.split(' '));
        const passports = [];
        let passport: Passport = {};
        while (lines.length > 0) {
            const line = lines.pop();
            if (line !== undefined && line != '') {
                const keyValue: string[] = line.split(':');
                passport[keyValue[0]] = keyValue[1];
            } else {
                if (passport !== {}) {
                    passports.push(passport);
                    passport = {};
                }
            }
        }
        return passports;
    };

    public solveFirst(): string {
        const passports = this.parse(this.input);

        const res = passports.filter((passport: Passport) =>
            passport.byr && passport.pid && passport.hcl && passport.hgt && passport.iyr && passport.eyr && passport.ecl
        ).length;
        return `${res}`;
    }

    private isValidBirthYear(year: number) {
        return year >= 1920 && year <= 2002;
    }
    private isValidIssueYear(year: number) {
        return year >= 2010 && year <= 2020;
    }
    private isValidExpirationYear(year: number) {
        return year >= 2020 && year <= 2030;
    }
    private isValidHeight(hgt: string) {
        return (
            hgt.slice(-2) == 'cm' && parseInt(hgt.slice(0, 3), 10) >= 150 && parseInt(hgt.slice(0, 3), 10) <= 193 ||
            hgt.slice(-2) == 'in' && parseInt(hgt.slice(0, 2), 10) >= 59 && parseInt(hgt.slice(0, 2), 10) <= 76
        );
    }
    private isValidHairColour(hcl: string) {
        return new RegExp(/#[0-9a-f]{6}/).test(hcl);
    }
    private isValidEyeColour(ecl: string) {
        return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(ecl) !== -1;
    }
    private isValidPassportId(pid: string) {
        return new RegExp(/^[0-9]{9}$/).test(pid);
    }

    private isValidPassport(passport: Passport) {
        return passport.byr && this.isValidBirthYear(parseInt(passport.byr, 10)) &&
            passport.iyr && this.isValidIssueYear(parseInt(passport.iyr, 10)) &&
            passport.eyr && this.isValidExpirationYear(parseInt(passport.eyr, 10)) &&
            passport.hgt && this.isValidHeight(passport.hgt) &&

            passport.ecl && this.isValidEyeColour(passport.ecl) &&
            passport.hcl && this.isValidHairColour(passport.hcl) &&
            passport.pid && this.isValidPassportId(passport.pid);
    }

    public solveSecond(): string {
        expect(this.isValidBirthYear(2002)).toEqual(true);
        expect(this.isValidBirthYear(2003)).toEqual(false);
        expect(this.isValidHeight('60in')).toEqual(true);
        expect(this.isValidHeight('190cm')).toEqual(true);
        expect(this.isValidHeight('190in')).toEqual(false);
        expect(this.isValidHeight('190')).toEqual(false);
        expect(this.isValidHairColour('#123abc')).toEqual(true);
        expect(this.isValidHairColour('#123abz')).toEqual(false);
        expect(this.isValidHairColour('123abc')).toEqual(false);
        expect(this.isValidEyeColour('brn')).toEqual(true);
        expect(this.isValidEyeColour('wat')).toEqual(false);
        expect(this.isValidPassportId('000000001')).toEqual(true);
        expect(this.isValidPassportId('0123456789')).toEqual(false);

        expect(this.parse(invalidPassports).filter((p: Passport) => this.isValidPassport(p))).toHaveLength(0);
        expect(this.parse(validPassports).filter((p: Passport) => this.isValidPassport(p))).toHaveLength(4);

        const passports = this.parse(this.input);
        const allValidPassports = passports.filter((passport: Passport) => this.isValidPassport(passport));
        const res = allValidPassports.length;
        return `${res}`;
    }

    public getFirstExpectedResult(): string {
        return '216';
    }

    public getSecondExpectedResult(): string {
        return '150';
    }
}
