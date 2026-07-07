import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestaurantDetail, RestaurantListItem } from 'src/app/models/restaurant.model';

@Injectable({ providedIn: 'root' })
export class RestaurantsService {
  private apiUrl = `${environment.apiBaseUrl}/restaurants`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<RestaurantListItem[]> {
    return this.http.get<RestaurantListItem[]>(this.apiUrl);
  }

  getById(id: number): Observable<RestaurantDetail> {
    return this.http.get<RestaurantDetail>(`${this.apiUrl}/${id}`);
  }

  search(name?: string, categoryId?: number): Observable<RestaurantListItem[]> {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    if (categoryId != null) params = params.set('categoryId', categoryId);
    return this.http.get<RestaurantListItem[]>(`${this.apiUrl}/search`, { params });
  }
}