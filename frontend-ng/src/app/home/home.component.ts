import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';

interface FundraiserResponse {
  data: Fundraiser[];
}

interface Fundraiser {
  ACTIVE: number;
  CAPTION: string;
  CATEGORY_ID: number;
  CITY: string;
  CURRENT_FUNDING: number;
  FUNDRAISER_ID: number;
  ORGANIZER: string;
  TARGET_FUNDING: number;
  CATEGORY_NAME: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  fundraisers: Fundraiser[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchFundraisers();
  }

  fetchFundraisers() {
    this.http
      .get<FundraiserResponse>('http://localhost:3000/api/allFundraiser')
      .subscribe((data) => {
        console.log(data);

        this.fundraisers = data.data;
      });
  }
}
