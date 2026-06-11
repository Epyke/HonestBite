import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private favoriteIds: Set<string> = new Set();

  constructor(private storage: Storage) {
    this.init();
  }

  private async init(): Promise<void> {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();
    const stored = await this.storage.get('favorite_ids');
    this.favoriteIds = new Set(stored ?? []);
  }

  isFavorite(id: string): boolean {
    return this.favoriteIds.has(id);
  }

  async toggle(id: string): Promise<void> {
    if (this.favoriteIds.has(id)) {
      this.favoriteIds.delete(id);
    } else {
      this.favoriteIds.add(id);
    }
    await this.storage.set('favorite_ids', [...this.favoriteIds]);
  }

  getFavoriteIds(): string[] {
    return Array.from(this.favoriteIds);
  }
}