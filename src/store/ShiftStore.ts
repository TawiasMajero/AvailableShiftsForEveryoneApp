import { makeAutoObservable } from 'mobx';
import { Shift } from '../types/shift';

class ShiftStore {
  shifts: Shift[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchShifts(/** Не забыть вписать параметры */) {
    this.loading = true;
    this.error = null;
    try {
      this.shifts = []; // Здесь будет заглушка для API
    } catch (err) {
      this.error = 'Ошибка загрузки смен';
    } finally {
      this.loading = false;
    }
  }
}

export const shiftStore = new ShiftStore();
