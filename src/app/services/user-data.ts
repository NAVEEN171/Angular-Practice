import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { returnedValue } from '../interfaces/user-interfaces';
import { catchError, pipe, tap, of, BehaviorSubject, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserData {
  constructor(private _http: HttpClient) {}
  userData$ = new BehaviorSubject<returnedValue | null>(null);

  in_Progress: boolean = false;

  checkInProgress() {
    return this.in_Progress;
  }

  fetchPage(page: number) {
    console.log('page recieved', page);
    this.in_Progress = true;
    this._http
      .get<returnedValue>(
        `https://dummyjson.com/users?limit=10&skip=${(page - 1) * 10}`
      )
      .pipe(
        tap((response) => {
          return response;
        }),
        catchError((error) => {
          console.log(error);
          return of(null);
        }),
        finalize(() => {
          this.in_Progress = false;
        })
      )
      .subscribe({
        next: (data) => {
          if (data) {
            this.userData$.next(data);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getUserDetails() {
    return this.userData$;
  }
}
