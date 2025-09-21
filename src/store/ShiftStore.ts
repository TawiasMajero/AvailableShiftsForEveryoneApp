import { makeAutoObservable } from 'mobx';
import { Shift } from '../types/shift';
import { fetchShifts } from '../services/ApiService';

class ShiftStore {
  shifts: Shift[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchShifts(lat: number, lon: number) {
    this.loading = true;
    this.error = null;
    try {
      this.shifts = await fetchShifts(lat, lon);
    } catch (err) {
      this.error = 'Ошибка загрузки смен';
    } finally {
      this.loading = false;
    }
  }
}

export const shiftStore = new ShiftStore();
