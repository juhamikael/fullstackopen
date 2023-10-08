import { isCLI, parseArguments } from "./utils";

interface IResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface IRating {
    rating: number,
    ratingDescription: string
}

export const calculateExercises = (dailyExerciseHours: Array<number>, target: number): IResult => {

    const average = dailyExerciseHours.reduce((sum: number, hours: number) => sum + hours
        , 0) / dailyExerciseHours.length;

    const rating = (average: number, target: number): IRating => {
        let rating = 0;
        let ratingDescription = '';
        switch (true) {
            case (average >= target * 1.25):
                rating = 3;
                ratingDescription = 'excellent';
                break;
            case (average >= target / 2):
                rating = 2;
                ratingDescription = 'not too bad but could be better';
                break;
            default:
                rating = 1;
                ratingDescription = 'you should try harder';
                break;
        }
        return {
            rating: rating,
            ratingDescription: ratingDescription
        };
    };
    return {
        periodLength: dailyExerciseHours.length,
        trainingDays: dailyExerciseHours.filter(hours => hours > 0).length,
        success: dailyExerciseHours.every(hours => hours >= target),
        average: Number(average.toFixed(4)),
        rating: rating(average, target).rating,
        ratingDescription: rating(average, target).ratingDescription,
        target: target
    };
};


if (isCLI) {
    const { dailyExerciseHours, target } = parseArguments(process.argv) as { dailyExerciseHours: Array<number>, target: number };
    const userExercises = calculateExercises(dailyExerciseHours, target);
    console.log(userExercises);
}


