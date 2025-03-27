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
  mediaTemperatura!:any;
  filteredForecasts: Forecast[] = []; // Lista com previsões filtradas por dia e hora atual

  // Propriedade para os mocks devido à restrição de permissões na API
  lastForecast!: Forecast;
  mockWeather!:WeatherData;

  @Input() cidade:string = 'Serra';

  @Output() forecastsChange = new EventEmitter<Forecast[]>();

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getWeatherData(this.cidade).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.createMockForecasts(); // Chama a função para criar os mocks
        console.log(data);
      },
      complete: () => {
        this.filteredForecasts = this.getDailyForecasts(this.weatherData.forecasts);
      },
      error: (error) => console.error('Erro ao buscar dados da API:', error),

    });
  }
  calculateAverageTemperature() {
    const allForecasts = [...this.filteredForecasts, ...(this.mockWeather?.forecasts || [])];
    this.mediaTemperatura = allForecasts.reduce((sum, forecast) => sum + forecast.tempC, 0) / allForecasts.length;
    this.mediaTemperatura = this.mediaTemperatura.toFixed(1);
    return this.mediaTemperatura;
  }


  // Função para criar mocks de previsões
  createMockForecasts = () => {
    if (!this.weatherData || !this.weatherData.forecasts || this.weatherData.forecasts.length === 0) {
      console.error('Não há dados de previsão disponíveis para criar mocks.');
      return;
    }

    // Obter condições únicas do clima e ícones
    const uniqueConditions = Array.from(new Set(this.weatherData.forecasts.map(forecast => forecast.condicaoCeu)));
    const uniqueIcons = Array.from(new Set(this.weatherData.forecasts.map(forecast => forecast.icon)));

    this.lastForecast = this.weatherData.forecasts[this.weatherData.forecasts.length - 1];
    const lastDate = new Date(this.lastForecast.data.split('/').reverse().join('-')); // Converte a string para Date
    this.mockWeather = { ...this.weatherData }; // Clona os dados do weatherData

    this.mockWeather.forecasts = Array.from({ length: 4 }, (_, i) => {
      const newDate = new Date(lastDate);
      newDate.setDate(lastDate.getDate() + i + 1); // Incrementa os dias

      return {
        data: newDate.toLocaleDateString('pt-BR'),
        horario: this.lastForecast.horario,
        tempC: this.lastForecast.tempC + (Math.random() * 2 - 1), // Variação de temperatura
        tempF: this.lastForecast.tempF + (Math.random() * 2 - 1), // Variação de temperatura
        condicaoCeu: uniqueConditions[Math.floor(Math.random() * uniqueConditions.length)], // Condição aleatória
        icone: uniqueIcons[Math.floor(Math.random() * uniqueIcons.length)], // Ícone aleatório
      };
    });

    this.calculateAverageTemperature();
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
        this.createMockForecasts();
        this.calculateAverageTemperature();
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

    this.calculateAverageTemperature();

    this.sendData(filtered);
    return filtered;
  }

  sendData(data:Forecast[]){
    this.forecastsChange.emit(data);
  }
}
