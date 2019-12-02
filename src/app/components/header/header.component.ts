import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  links: string[] = ['Home', 'Favorites'];
  darkMode = false;
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
  }

  onChangeTheme() {
    this.darkMode = !this.darkMode;
    this.weatherService.changeTheme.next(this.darkMode);
  }
}
