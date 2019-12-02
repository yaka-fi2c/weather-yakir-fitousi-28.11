import { Component, OnInit, Input } from '@angular/core';
import { ICurrentWeather, IWeatherData } from 'src/app/models/models.class';
import { WeatherService } from 'src/app/weather.service';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss']
})
export class ResultCardComponent implements OnInit {

  metricUnit = true;
  default: ICurrentWeather[] = [];
  locationAdded: boolean;

  @Input() weatherData: IWeatherData[] = [];

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.weatherService.getDefaultLocation()
      .subscribe((data: ICurrentWeather[]) => {
        this.default = [...data];
      });
  }

  onAddToFavorites(i: number): void {
    if (!this.weatherService.favorites.includes(this.weatherData[i])) {
      this.weatherService.favorites.push(this.weatherData[i]);
      this.locationAdded = true;
      setTimeout(() => {
        this.locationAdded = false;
      }, 2000);
    } else {
      const index = this.weatherService.favorites.indexOf(this.weatherData[i]);
      this.weatherService.favorites.splice(index, 1);
    }
  }

  isInFavorite(): boolean {
    return this.weatherService.favorites.some(el => el.key === this.weatherData[0].key);
  }
}
