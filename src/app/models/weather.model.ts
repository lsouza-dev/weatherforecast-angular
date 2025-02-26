export interface Forecast {
    data: string;
    horario: string;
    tempC: number;
    tempF: number;
    icon: string;
    condicaoCeu: string;
  }
  
  export class WeatherData {
    cidade!: string;
    estado!: string;
    pais!: string;
    tempC!: number;
    condicaoCeu!: string;
    icon!: string;
    forecasts!: Forecast[];
  
    constructor(data: any) {
      this.cidade = data.cidade;
      this.estado = data.estado;
      this.pais = data.pais;
      this.tempC = data.tempC;
      this.condicaoCeu = data.condicaoCeu;
      this.icon = data.icon;
      this.forecasts = data.forecasts.map((f: any) => ({
        data: f.data,
        horario: f.horario,
        tempC: f.tempC,
        tempF: f.tempF,
        icon: f.icon,
        condicaoCeu: f.condicaoCeu,
      }));
    }
  }
  