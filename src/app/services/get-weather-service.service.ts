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
      map((response) => {
        const dados = response.dados;

        // Criar o objeto WeatherData com os novos dados
        return new WeatherData({
          cidade: dados.cidade,
          estado: dados.estado,
          pais: dados.pais,
          tempC: dados.tempC,
          condicaoCeu: dados.condicaoCeu,
          icon: dados.icon,
          forecasts: dados.forecasts.map((f: any) => ({
            data: f.date, // Atualizado para usar 'date'
            horario: f.hour?.time.split(' ')[1] ?? '00:00', // Extraindo hora do campo correto
            tempC: f.hour?.temp_c ?? 0,
            tempF: f.hour?.temp_f ?? 0,
            icon: f.hour?.condition.icon ?? '', // Pegando o ícone correto
            condicaoCeu: f.hour?.condition.text ?? 'Sem informação',
          })),
        });
      })
    );
  }

}
