import { parseArguments } from "./utils";
type Result = { bmi: number, message: string };

const calculateBmi = (height: number, weight: number): Result => {
    const bmi = Number((weight / Math.pow(height / 100, 2)).toFixed(3));
    switch (true) {
        case (bmi < 15):
            return { bmi: bmi, message: "Very severely underweight" };
        case (bmi < 16):
            return { bmi: bmi, message: "Severely underweight" };
        case (bmi < 18.5):
            return { bmi: bmi, message: "Underweight" };
        case (bmi < 25):
            return { bmi: bmi, message: "Normal (healthy weight)" };
        case (bmi < 30):
            return { bmi: bmi, message: "Overweight" };
        case (bmi >= 30):
            return { bmi: bmi, message: "Obese" };
        default:
            return { bmi: bmi, message: "Unknown" };
    }
}

const { height, weight } = parseArguments(process.argv) as { height: number, weight: number };
const bmi = calculateBmi(height, weight);
console.log(bmi);
