import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from './services/get-weather-service.service';
import { Forecast, WeatherData } from './models/weather.model';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WeatherComponent } from './components/weather-card/weather-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [NavbarComponent, WeatherComponent],
})
export class AppComponent {
  title: string = "Weather App"
  @Input() cidade!: string;
  forecastsData!: Forecast[];
  forecastWarning!: Forecast | undefined;
  // weatherData!: WeatherData;

  // constructor(private weatherService: WeatherService) {}

  // ngOnInit(): void {
  //   const cidade = 'Serra'; // Defina a cidade fixa ou dinamicamente

  //   this.weatherService.getWeatherData(cidade).subscribe({
  //     next: (data) => {
  //       this.weatherData = data;
  //     },
  //     error: (error) => console.error('Erro ao buscar dados da API:', error),
  //   });
  // }

  getWeather(data: Forecast[]) {
    this.forecastsData = data;
    this.getForecastWarning(data);
  }

  getForecastWarning(data: Forecast[]): void {
    const fc = this.forecastsData.find(x => x.tempC > 30 || x.tempC < 10)
    this.forecastWarning = fc;
  }
}
