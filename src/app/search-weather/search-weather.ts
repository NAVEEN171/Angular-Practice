import { Component, ElementRef, viewChild } from '@angular/core';
import { WeatherService } from '../services/weather-service';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { fromEvent, of, Subject } from 'rxjs';

import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  filter,
  tap,
  catchError,
} from 'rxjs/operators';

@Component({
  selector: 'app-search-weather',
  imports: [JsonPipe, FormsModule],
  templateUrl: './search-weather.html',
  styleUrl: './search-weather.scss',
})
export class SearchWeather {
  // @viewChild('weathersearch')
  // searchWeatherValue!: ElementRef;

  searchInput = new Subject<string>();

  weatherInfo = {};
  constructor(private weatherService: WeatherService) {
    this.searchInput
      .pipe(
        tap((value) => console.log('returnedvalue', value)),
        filter((value) => value.trim() !== ''),
        distinctUntilChanged(),
        debounceTime(300),
        switchMap((searchTerm) =>
          this.fetchWeatherReports(searchTerm).pipe(
            catchError((error) => {
              console.log(error);
              return of({});
            })
          )
        )
      )
      .subscribe((data) => (this.weatherInfo = data));
  }
  city = 'vizag';
  fetchWeatherReports(city: string) {
    console.log('searching...');
    return this.weatherService.getWeatherDetails(city);
  }

  onSearchInputChange(searchTerm: string) {
    console.log('input changed...', searchTerm);
    this.searchInput.next(searchTerm);
  }
}
