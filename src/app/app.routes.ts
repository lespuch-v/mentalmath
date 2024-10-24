import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StatsComponent } from './stats/stats.component';
import { RapidComponent } from './rapid/rapid.component';
import { AdditionComponent } from './addition/addition.component';
import { SubtractionComponent } from './subtraction/subtraction.component';
import { MultiplicationTableComponent } from './multiplication-table/multiplication-table.component';
import { MultiplicationComponent } from './multiplication/multiplication.component';
import { DivisionComponent } from './division/division.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './services/auth-guard';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { CenteredLayoutComponent } from './layouts/centered-layout/centered-layout.component';

export const routes: Routes = [
  {
    path: '', component: DefaultLayoutComponent, children: [
      {path: '', component: HomeComponent},
      {path: 'stats', component: StatsComponent}
    ]
  },
  {
    path: '',
    component: CenteredLayoutComponent,
    children: [
      {path: 'rapid', component: RapidComponent},
      {path: 'addition', component: AdditionComponent},
      {path: 'subtraction', component: SubtractionComponent},
      {path: 'multiplication', component: MultiplicationComponent},
      {path: 'multiplication-table', component: MultiplicationTableComponent},
      {path: 'division', component: DivisionComponent},
      {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
