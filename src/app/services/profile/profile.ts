import { Injectable } from '@angular/core';

export interface LocalProfile {
  name: string;
  email: string;
  phone: string;
  city: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly storageKey = 'honestbite_profile';

  getProfile(): LocalProfile | null {
    const storedProfile = localStorage.getItem(this.storageKey);
    return storedProfile ? JSON.parse(storedProfile) : null;
  }

  saveProfile(profile: LocalProfile): void {
    localStorage.setItem(this.storageKey, JSON.stringify(profile));
  }

  clearProfile(): void {
    localStorage.removeItem(this.storageKey);
  }
}