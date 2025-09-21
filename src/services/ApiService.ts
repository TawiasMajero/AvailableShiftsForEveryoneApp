import axios from 'axios';
import { Shift } from '../types/shift';

const API_BASE =
  'https://mobile.handswork.pro/api/shifts/map-list-unauthorized';

export async function fetchShifts(lat: number, lon: number): Promise<Shift[]> {
  try {
    const response = await axios.get(
      `${API_BASE}?latitude=${lat}&longitude=${lon}`,
    );
    return response.data.data;
  } catch (error) {
    throw new Error('Не удалось загрузить смены. Проверьте соединение.');
  }
}
