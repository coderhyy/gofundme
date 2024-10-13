import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

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

interface Donation {
  DONATION_ID: number;
  DATE: string;
  AMOUNT: number;
  GIVER: string;
  FUNDRAISER_ID: number;
}

@Component({
  selector: 'app-fundraiser',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './fundraiser.component.html',
  styleUrl: './fundraiser.component.css',
})
export class FundraiserComponent {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  fundraiser: Fundraiser | null = null;
  donations: Donation[] = [];
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const fundraiserId = params['id'];

      this.http
        .get<{ data: Fundraiser[] }>(
          `http://localhost:3000/api/fundraiser/${fundraiserId}`
        )
        .subscribe((res) => {
          console.log(res);
          this.fundraiser = res.data[0];
        });

      // 获取捐款列表
      this.http
        .get<{ data: Donation[] }>(
          `http://localhost:3000/api/donationForFundraiser/${fundraiserId}`
        )
        .subscribe((res) => {
          console.log(res);
          this.donations = res.data.reverse();
        });
    });
  }
}
