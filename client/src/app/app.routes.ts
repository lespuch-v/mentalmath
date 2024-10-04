import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { StatsComponent } from './stats/stats.component';
import { RapidComponent } from './rapid/rapid.component';
import { AdditionComponent } from './addition/addition.component';
import { SubtractionComponent } from './subtraction/subtraction.component';
import { MultiplicationTableComponent } from './multiplication-table/multiplication-table.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'settings', component: UserSettingsComponent},
    { path: 'stats', component: StatsComponent},
    { path: 'rapid', component: RapidComponent},
    { path: 'addition', component: AdditionComponent},
    { path: 'subtraction', component: SubtractionComponent},
    { path: 'multiplication-table', component: MultiplicationTableComponent},
    { path: '**', component: HomeComponent}
];
