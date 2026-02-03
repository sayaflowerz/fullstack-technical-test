import { Routes } from '@angular/router';
import { Form } from './components/form/form';
import { List } from './components/list/list';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'lists', component: List },
  { path: 'orders', component: Form },
  { path: 'orders/:id', component: Form }
];
