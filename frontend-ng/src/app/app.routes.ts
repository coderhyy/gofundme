import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { FundraiserComponent } from './fundraiser/fundraiser.component';
import { DonationComponent } from './donation/donation.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'fundraiser/:id',
    component: FundraiserComponent,
  },
  {
    path: 'donation/:id',
    component: DonationComponent,
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
