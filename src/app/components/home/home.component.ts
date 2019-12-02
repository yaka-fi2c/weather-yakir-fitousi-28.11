import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/weather.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ILocationResults, ICurrentWeather, IForecast, IWeatherData } from 'src/app/models/models.class';
import { HttpErrorResponse } from '@angular/common/http';
import { iif } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userForm: FormGroup;
  locationResults: ILocationResults[] = [];
  weatherData: IWeatherData[] = [];
  error: string;


  constructor(private weatherService: WeatherService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      userInput: [null, [Validators.pattern(/^[a-zA-Z][a-zA-Z\s]*$/)]]
    });
  }

  ngOnInit(): void {

    this.userForm
      .get('userInput')
      .valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        switchMap(value => iif(() => this.userForm.get('userInput').valid,
          this.weatherService.getCities(value)
        ))
      )
      .subscribe((res: ILocationResults[]) => {
        if (res) {
          this.locationResults = res;
        } else {
          this.locationResults = [];
        }
      },
        (err: HttpErrorResponse) => {
          this.error = err.statusText;
        }
      );
    this.weatherData = this.weatherService.weather.slice();
  }

  getCurrentWeather(i: number): void {
    this.weatherService.getWeatherData(this.locationResults[i].Key)
      .subscribe((data: { current: ICurrentWeather[], forecast: IForecast }) => {
        const weather: IWeatherData[] = [{
          name: this.locationResults[i].AdministrativeArea.LocalizedName,
          key: this.locationResults[i].Key,
          date: data.current[0].LocalObservationDateTime,
          weatherText: data.current[0].WeatherText,
          icon: data.current[0].WeatherIcon,
          currentWeather: {
            celsius: data.current[0].Temperature.Metric.Value,
            farenhit: data.current[0].Temperature.Imperial.Value
          },
          forecast: data.forecast.DailyForecasts
        }];
        this.weatherData = weather;
        this.weatherService.weather = weather;
      }, (err: HttpErrorResponse) => {
        this.error = `${err.statusText}! status code: ${err.status}`;
      });
  }
}
