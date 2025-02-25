import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Import necessário
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule, // Adicione isso para evitar erros com *ngFor
    WeatherCardComponent,
    NavbarComponent
  ],
  providers: [],
})
export class AppModule { }
