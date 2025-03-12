import { Component,EventEmitter ,Input, OnInit, Output } from '@angular/core';
import { WeatherService } from '../../services/get-weather-service.service';
import { WeatherData, Forecast } from '../../models/weather.model';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css'],

  imports: [FormsModule]
})
export class WeatherComponent implements OnInit {
  weatherData!: WeatherData;
  filteredForecasts: Forecast[] = []; // Lista com previsões filtradas por dia e hora atual
  @Input() cidade:string = 'Serra';

  @Output() forecastsChange = new EventEmitter<Forecast[]>();

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getWeatherData(this.cidade).subscribe({
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

  getWeatherByCity() {
    if (!this.cidade.trim()) {
      alert("Por favor, insira uma cidade válida!");
      return;
    }

    this.weatherService.getWeatherData(this.cidade).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.filteredForecasts = this.getDailyForecasts(data.forecasts);
      },
      error: (error) => console.error('Erro ao buscar dados da API:', error),
    });
    this.sendData(this.filteredForecasts);
  }

  getDailyForecasts(forecasts: Forecast[]): Forecast[] {
    const now = new Date();
    const currentHour = now.getHours().toString().padStart(2, '0') + ':00';

    const uniqueDays = new Set<string>();
    const filtered: Forecast[] = [];

    for (const forecast of forecasts) {
      if (!uniqueDays.has(forecast.data) && forecast.horario === currentHour) {
        forecast.data = new Date(forecast.data).toLocaleDateString('pt-BR');
        uniqueDays.add(forecast.data);
        filtered.push(forecast);
      }
    }
    this.sendData(filtered);
    return filtered;
  }



  sendData(data:Forecast[]){
    this.forecastsChange.emit(data);
  }
}
