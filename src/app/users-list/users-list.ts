import {
  Component,
  DoCheck,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { UserData } from '../services/user-data';
import { User } from '../interfaces/user-interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-list',
  imports: [CommonModule],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList implements OnInit {
  @ViewChild('scrollable') scrollableElement!: ElementRef<HTMLDivElement>;
  Users: User[] = [];
  private PAGES_PER_PAGE = 10;
  isLoading: boolean = false;
  tempFilteredDate: User[] = [];
  constructor(private userDataService: UserData) {
    this.userDataService.getUserDetails().subscribe({
      next: (val) => {
        if (val && val.users.length) {
          this.filterUsersData(val.users);
        }
        this.isLoading = false;
      },
      error: (err: Error) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  onScroll(event: Event) {
    if (this.scrollableElement) {
      const Element = this.scrollableElement.nativeElement;
      if (
        Element.clientHeight + Element.scrollTop >=
        Element.scrollHeight - 50
      ) {
        console.log('bottom reached');
        this.isLoading = true;
        let pending = this.userDataService.checkInProgress();

        if (this.Users.length && !pending) {
          let fullpages = this.Users.length / this.PAGES_PER_PAGE;

          if (this.Users.length % this.PAGES_PER_PAGE) {
            fullpages += 1;
          }

          if (fullpages > 0) {
            this.userDataService.fetchPage(fullpages + 1);
          }
        }
      }
    }
  }
  filterUsersData(val: any[]) {
    this.tempFilteredDate = val.map((user) => ({
      username: user?.username,
      phone: user?.phone,
      gender: user?.gender,
      age: user?.age,
      image: user?.image,
      role: user.role,
    }));
    if (this.tempFilteredDate.length) {
      this.Users = [...this.Users, ...this.tempFilteredDate];
    }
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.userDataService.fetchPage(1);
  }
}
