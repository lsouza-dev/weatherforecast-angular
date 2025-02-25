import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent {
  @Input() temp: number | null = null;
  @Input() status: string = '';
  @Input() dia: string = '';
  @Input() icon: string = '';
}
