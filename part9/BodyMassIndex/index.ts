import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        res.send({ error: "malformatted parameters" });
    }

    if (!height || !weight) {
        res.send({ error: "malformatted parameters" });
    }

    const calculatedBMI = calculateBmi(height, weight);

    const message = calculatedBMI.message;
    const bmi = calculatedBMI.bmi;

    res.send({ bmi, message, height, weight });

});

type ExerciseBody = {
    daily_exercises: number[],
    target: number
};

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body as ExerciseBody;

    if (!target || !daily_exercises) {
        res.send({ error: "parameters missing" });
    }

    if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
        res.send({ error: "malformatted parameters" });
    }

    const exercises = calculateExercises(daily_exercises, target);
    res.send(exercises);
});



const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});