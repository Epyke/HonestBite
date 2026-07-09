import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateRatingRequest, CreateRatingResponse } from 'src/app/models/request.model';

@Injectable({ providedIn: 'root' })
export class RatingsService {
  private apiUrl = `${environment.apiBaseUrl}/ratings`;
  constructor(private http: HttpClient) {}

  create(body: CreateRatingRequest): Observable<CreateRatingResponse> {
    return this.http.post<CreateRatingResponse>(this.apiUrl, body);
  }
}