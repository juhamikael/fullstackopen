export interface TDiary {
    id: number;
    date: string;
    weather: TWeather;
    visibility: TVisibility;
    comment: string;
}

// Omit Id  from TDiary
export type TNewDiary = Omit<TDiary, 'id'>;

export interface TDiaryForm extends TNewDiary {
    comment: string;
}

export type TWeather = 'sunny' |
    'rainy' |
    'cloudy' |
    'stormy' |
    'windy';

export type TVisibility = 'great' | 'good' | 'ok' | 'poor';


