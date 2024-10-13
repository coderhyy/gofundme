import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

interface ResponseData {
  data: Fundraiser[];
}

@Component({
  selector: 'app-fundraiser',
  standalone: true,
  imports: [],
  templateUrl: './fundraiser.component.html',
  styleUrl: './fundraiser.component.css',
})
export class FundraiserComponent {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  fundraiser: Fundraiser | null = null;
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.http
        .get<ResponseData>(
          `http://localhost:3000/api/fundraiser/${params['id']}`
        )
        .subscribe((res) => {
          console.log(res);
          this.fundraiser = res.data[0];
        });
    });
  }
}
