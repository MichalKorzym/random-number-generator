import { Routes } from '@angular/router';
import { RandomNumberMainComponent } from './components/random-number-main/random-number-main.component';
import { RandomNumberFormComponent } from './components/random-number-main/random-number-form/random-number-form.component';

export const routes: Routes = [
  {
    path: '',
    component: RandomNumberMainComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './components/random-number-main/random-number-form/random-number-form.component'
          ).then((m) => m.RandomNumberFormComponent),
      },
    ],
  },
];
