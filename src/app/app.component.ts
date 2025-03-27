import { Component, Input } from '@angular/core';
import { Forecast } from './models/weather.model';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WeatherComponent } from './components/weather-card/weather-card.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { NewsComponent } from "./components/news/news.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [NavbarComponent, WeatherComponent, AlertModalComponent, NewsComponent],
})
export class AppComponent {
  title: string = 'Weather App';
  @Input() cidade!: string;
  forecastsData!: Forecast[];
  forecastWarning!: Forecast | undefined;

  getWeather(data: Forecast[]) {
    this.forecastsData = data;
    this.getForecastWarning(data);
  }

  getForecastWarning(data: Forecast[]): void {
    const fc = data.find((x) => x.tempC > 30 || x.tempC < 10);
    this.forecastWarning = fc;

    if (fc) {
      setTimeout(() => {
        this.forecastWarning = undefined;
      }, 6000);
    }
  }
}
