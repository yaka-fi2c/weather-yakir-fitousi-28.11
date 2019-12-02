import { Injectable } from '@angular/core';

import { ICurrentWeather, IForecast, IWeatherData, ILocationResults } from './models/models.class';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apikey = 'WF8yKAXUhpOFgcbVfrttWKGBpcM9oakt';
  autoCompleteEndPoint = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.apikey}&q=`;
  currentWeatherEndPoint = 'http://dataservice.accuweather.com/currentconditions/v1/';
  forecastEndPoint = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
  defauleLocationEndPoint = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${this.apikey}&q=32.109333%2C34.855499`;

  favorites: IWeatherData[] = [];
  changeTheme: Subject<boolean> = new Subject();
  weather: IWeatherData[] = [];

  constructor(private http: HttpClient) {
  }

  public getWeatherData(id: string): Observable<{}> {
    return this.http.get(this.currentWeatherEndPoint + id + `?apikey=${this.apikey}`)
      .pipe(
        switchMap((current: ICurrentWeather[]) => {
          return this.getForecast(id)
            .pipe(
              map((forecast: IForecast) => {
                return { current, forecast };
              })
            );
        })
      );
  }

  public getForecast(id: string): Observable<IForecast> {
    return this.http.get<IForecast>(this.forecastEndPoint + id + `?apikey=${this.apikey}`);
  }

  public getCities(query: string): Observable<ILocationResults[]> {
    return this.http.get<ILocationResults[]>(this.autoCompleteEndPoint + query);
  }

  public getDefaultLocation(): Observable<object> {
    // first request get the of the city with given lat and long
    return this.http.get(this.defauleLocationEndPoint)
      .pipe(
        map((res: any) => res = res.Key),
        switchMap((key) => {
          return this.http.get(this.currentWeatherEndPoint + key + `?apikey=${this.apikey}`);
        })
      );
  }
}
