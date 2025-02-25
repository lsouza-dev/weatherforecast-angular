import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment'; // Certifique-se que o caminho está correto

@Injectable({
  providedIn: 'root'
})
export class GetWeatherServiceService {

  private BASE_URL = 'http://api.weatherapi.com/v1';
  private apiUrl = `${this.BASE_URL}/forecast.json?q=Serra&days=7&lang=pt&key=${environment.apiKey}`;

  constructor(private http: HttpClient) { }

  getWeatherData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
