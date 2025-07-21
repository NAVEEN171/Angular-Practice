import {
  Component,
  DoCheck,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { UserData } from '../services/user-data';
import { User } from '../interfaces/user-interfaces';
import { CommonModule } from '@angular/common';
import { returnedValue } from '../interfaces/user-interfaces';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-users-list',
  imports: [CommonModule],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList implements OnInit, OnDestroy {
  @ViewChild('scrollable') scrollableElement!: ElementRef<HTMLDivElement>;
  // userData$!: Observable<returnedValue | null>;

  Users: User[] = [];
  private PAGES_PER_PAGE = 10;
  isLoading: boolean = false;
  tempFilteredDate: User[] = [];
  private userSubscription!: Subscription;

  constructor(private userDataService: UserData) {}

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

    // this.userData$ = this.userDataService.getUserDetails();

    this.userSubscription = this.userDataService.getUserDetails().subscribe({
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
    this.userDataService.fetchPage(1);
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
