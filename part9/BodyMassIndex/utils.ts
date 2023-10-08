type TParsedArgumentsResult = { height: number, weight: number } | { dailyExerciseHours: Array<number>, target: number } | { error: string };

export const isNotNumber = (argument: unknown): boolean =>
    isNaN(Number(argument));

export const isCLI = process.argv.length >= 2 && ["bmiCalculator", "exerciseCalculator"].includes(process.argv[1]);

export const parseArguments = (args: Array<string>): TParsedArgumentsResult => {

    if (args.length < 2) throw new Error('Not enough arguments');
    if (args.length > 2) throw new Error('Too many arguments');

    const fileName = args[1]?.split("\\")?.pop()?.split("/")?.pop()?.split(".")?.[0];

    if (!fileName) {
        throw new Error("Filename is not provided or could not be parsed.");
    }

    let message = '';
    switch (fileName) {
        case "bmiCalculator":
            message = 'Correct usage: npm run calculateBmi <height> <weight>';
            if (args.length < 4) throw new Error(`Not enough arguments, \n${message}`);
            if (args.length > 4) throw new Error(`Too many arguments, \n${message}`);

            const height = Number(args[2]);
            const weight = Number(args[3]);
            if (isNotNumber(height)) throw new Error('Height must be a number');
            if (isNotNumber(weight)) throw new Error('Weight must be a number');
            return {
                height,
                weight,
            };

        case "exerciseCalculator":
            message = 'Correct usage: npm run calculateExercises <target> <daily exercise hours for 7 days>';

            if (args.length < 10) throw new Error(`Not enough arguments, \n${message}`);
            if (args.length > 10) throw new Error(`Too many arguments, \n${message}`);

            const target = Number(args[2]);
            if (isNotNumber(target)) throw new Error('Target must be a number');

            const dailyExerciseHours: Array<number> = [];
            for (let i = 3; i <= 9; i++) {
                const hour = Number(args[i]);
                if (isNotNumber(hour)) throw new Error(`Exercise hours for day ${i - 3} must be a number, \n${message}`);
                dailyExerciseHours.push(hour);
            }
            return {
                dailyExerciseHours,
                target,
            };
        default:
            throw new Error('Unknown command');
    }
};