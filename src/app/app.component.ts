import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  darkMode: boolean = false;
  constructor(private weatherService: WeatherService) { }
  ngOnInit(): void {
    this.weatherService.changeTheme.subscribe(data => this.darkMode = data);
  }
}
