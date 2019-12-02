export interface ILocationResults {
  AdministrativeArea: {
    ID: string,
    LocalizedName: string,
  };
  Country: {
    ID: string,
    LocalizedName: string,
  };
  Key: string;
  LocalizedName: string;
  Rank: number;
  Type: string;
  Version: number;
}

export interface ICurrentWeather {
  EpochTime: number;
  HasPrecipitation: boolean;
  IsDayTime: boolean;
  Link: string;
  LocalObservationDateTime: string;
  MobileLink: string;
  PrecipitationType: null;
  Temperature: {
    Imperial: { Value: number, Unit: string, UnitType: number; }
    Metric: { Value: number, Unit: string, UnitType: number; }
  };
  WeatherIcon: number;
  WeatherText: string;
}

export interface IForecast {
  DailyForecasts: IDailyForecasts[];
  headling?: IHeadline;
}

export interface IDailyForecasts {
  Date: string;
  Day: {
    HasPrecipitation: boolean
    Icon: number
    IconPhrase: string
  };
  EpochDate: number;
  Link: string;
  MobileLink: string;
  Night: {
    HasPrecipitation?: string;
    Icon: number;
    IconPhrase: string;
  };
  Sources: string[];
  Temperature: {
    Maximum: { Value: number, Unit: string; UnitType: number; },
    Minimum: { Value: number; Unit: string; UnitType: number; }
  };

}

export interface IHeadline {
  Headline: {
    Category: string
    EffectiveDate: string
    EffectiveEpochDate: number
    EndDate: null
    EndEpochDate: null
    Link: string
    MobileLink: string
    Severity: number
    Text: string
  }

}

export class IWeatherData {
  name: string;
  key: string;
  date: string;
  icon: number;
  weatherText: string;
  currentWeather: {
    celsius: number;
    farenhit: number;
  };
  forecast: IDailyForecasts[];
}

