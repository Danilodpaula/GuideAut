import type { IAppLocalStorage } from "../interface/localStorage.interface";

export class AppLocalStorage {
  static clear(): void {
    try { localStorage.clear(); } catch {}
  }

  static key(index: number): string | null {
    try { return localStorage.key(index); } catch { return null; }
  }

  static removeItem(key: keyof IAppLocalStorage): void {
    try { localStorage.removeItem(key); } catch {}
  }

  static setItem<T extends keyof IAppLocalStorage>(key: T, value: IAppLocalStorage[T]) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }

  static getItem<T extends keyof IAppLocalStorage>(key: T): IAppLocalStorage[T] | undefined {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : undefined;
    } catch {
      return undefined;
    }
  }
}
