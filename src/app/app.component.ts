import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { ContainerComponent } from "./components/container/container.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, WeatherCardComponent, ContainerComponent], // Adicionando NavbarComponent aqui
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  weatherData = [
    { temp: 25, status: 'Ensolarado', dia: 'Segunda', icon: 'assets/sun.png' },
    { temp: 25, status: 'Ensolarado', dia: 'Segunda', icon: 'assets/sun.png' },
    { temp: 20, status: 'Nublado', dia: 'Terça', icon: 'assets/cloud.png' },
    { temp: 20, status: 'Nublado', dia: 'Terça', icon: 'assets/cloud.png' },
    { temp: 18, status: 'Chuvoso', dia: 'Quarta', icon: 'assets/rain.png' },
    { temp: 18, status: 'Chuvoso', dia: 'Quarta', icon: 'assets/rain.png' },
    { temp: 18, status: 'Chuvoso', dia: 'Quarta', icon: 'assets/rain.png' },
  ];
}
