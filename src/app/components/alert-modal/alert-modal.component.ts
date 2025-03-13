import { Component, Input, OnInit } from '@angular/core';
import { Forecast } from '../../models/weather.model';

@Component({
  selector: 'app-alert-modal',
  imports: [],
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.css',
})
export class AlertModalComponent implements OnInit {
  @Input() showModal: boolean = false;

  @Input() forecastWarningData: Forecast | any;
  warningMessage!: string;


  ngOnInit(): void {
    console.log(this.forecastWarningData);
    this.warningMessage =
      this.forecastWarningData.tempC <= 10
        ? `Dia ${this.forecastWarningData.data} a temperatura será de ${this.forecastWarningData.tempC}C°! Cuidado ao sair de casa e não se esqueça do agasalho!`
        : `Dia ${this.forecastWarningData.data} a temperatura será de ${this.forecastWarningData.tempC}C°! Compre uma água de côco e vá à praia para se refrescar nesse calor!`
  }
}
