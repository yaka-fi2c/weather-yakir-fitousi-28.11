import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/weather.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  darkMode = false;
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.changeTheme.subscribe(data => this.darkMode = data);
  }

}
