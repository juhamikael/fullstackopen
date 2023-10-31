import axios from 'axios';
import { TDiary, TDiaryForm } from "../types/diary";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAll = async () => {
    const response = await axios.get<TDiary>(`${baseUrl}/all`);
    return response.data;
}

export const create = async (object: TDiaryForm) => {
    const response = await axios.post<TDiaryForm>(baseUrl, object);
    return response.data;
}

