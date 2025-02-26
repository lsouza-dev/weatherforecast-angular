import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/get-weather-service.service';
import { WeatherData, Forecast } from '../../models/weather.model';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherComponent implements OnInit {
  weatherData!: WeatherData;
  filteredForecasts: Forecast[] = []; // Lista com previsões filtradas por dia e hora atual

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    const cidade = 'Serra'; // Cidade fixa ou dinâmica

    this.weatherService.getWeatherData(cidade).subscribe({
      next: (data) => {
        this.weatherData = data;
        console.log(data);
      },
      complete: () => {
        this.filteredForecasts = this.getDailyForecasts(this.weatherData.forecasts);

      },
      error: (error) => console.error('Erro ao buscar dados da API:', error),

    });
  }

  getDailyForecasts(forecasts: Forecast[]): Forecast[] {
    const now = new Date();
    const currentHour = now.getHours().toString().padStart(2, '0') + ':00';

    const uniqueDays = new Set<string>(); // Para evitar repetição de dias
    const filtered: Forecast[] = [];

    for (const forecast of forecasts) {
      if (!uniqueDays.has(forecast.data) && forecast.horario === currentHour) {
        forecast.data = new Date(forecast.data).toLocaleDateString('pt-BR');
        uniqueDays.add(forecast.data);
        filtered.push(forecast);
      }
    }

    return filtered;
  }
}
