import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FavoriteStatus, UserFavorite } from 'src/app/models/favorite.model';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private apiUrl = `${environment.apiBaseUrl}/favorites`;
  constructor(private http: HttpClient) {}

  toggle(userId: number, restaurantId: number): Observable<FavoriteStatus> {
    return this.http.post<FavoriteStatus>(`${this.apiUrl}/user/${userId}/toggle/${restaurantId}`, {});
  }

  getStatus(userId: number, restaurantId: number): Observable<FavoriteStatus> {
    return this.http.get<FavoriteStatus>(`${this.apiUrl}/user/${userId}/status/${restaurantId}`);
  }

  getUserFavorites(userId: number): Observable<UserFavorite[]> {
    return this.http.get<UserFavorite[]>(`${this.apiUrl}/user/${userId}`);
  }
}