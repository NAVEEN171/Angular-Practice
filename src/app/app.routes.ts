import { Routes } from '@angular/router';
import { UsersList } from './users-list/users-list';
import { SearchWeather } from './search-weather/search-weather';
import { Pagination } from './components/pagination/pagination';

export const routes: Routes = [
  {
    path: '',
    component: UsersList,
  },
  {
    path: 'weather',
    component: SearchWeather,
  },
  {
    path: 'paginate',
    component: Pagination,
  },
];
