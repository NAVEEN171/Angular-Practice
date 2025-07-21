import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersList } from './users-list/users-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UsersList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'angular-practice';
}
