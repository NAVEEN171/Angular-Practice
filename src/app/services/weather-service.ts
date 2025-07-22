import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private API_URL = environment.API_URL;
  private API_KEY = environment.API_KEY;
  constructor(private http: HttpClient) {}

  getWeatherDetails(city: string) {
    return this.http.get(
      `${this.API_URL}?key=${this.API_KEY}&q=${city}&aqi=no`
    );
  }
}
