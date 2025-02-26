import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { WeatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'http://localhost:5122/WeatherForecast';

  constructor(private http: HttpClient) {}

  getWeatherData(city: string): Observable<WeatherData> {
    return this.http.get<any>(`${this.apiUrl}/${city}/week`).pipe(
      map(response => new WeatherData(response.dados)) // Convertendo para a model
    );
  }
}
