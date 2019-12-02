import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/weather.service';
import { IWeatherData } from 'src/app/models/models.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorites: IWeatherData[] = [];
  constructor(private weatherService: WeatherService, private router: Router) { }

  ngOnInit() {
    this.favorites = this.weatherService.favorites.slice();
  }

  onFavoriteSelection(i: string) {
    this.weatherService.weather = [this.favorites[i]];
    this.router.navigate(['/Home']);
  }

}
