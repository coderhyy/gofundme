import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  selector: 'app-donation',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css',
})
export class DonationComponent {
  fundraiser: Fundraiser | null = null;
  donation: Partial<Donation> = {
    AMOUNT: 5,
    GIVER: '',
  };
  showDialog = false;
  dialogMessage = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const fundraiserId = params['id'];
      this.http
        .get<{ data: Fundraiser[] }>(
          `http://localhost:3000/api/fundraiser/${fundraiserId}`
        )
        .subscribe((res) => {
          this.fundraiser = res.data[0];
        });
    });
  }

  submitDonation() {
    if (this.donation?.AMOUNT && this.donation?.AMOUNT < 5) {
      this.showDialog = true;
      this.dialogMessage = 'The minimum donation amount is 5 AUD.';
      return;
    }

    if (this.fundraiser?.FUNDRAISER_ID) {
      this.http
        .post('http://localhost:3000/api/addDonation', {
          ...this.donation,
          FUNDRAISER_ID: this.fundraiser.FUNDRAISER_ID,
          DATE: new Date().toISOString().split('T')[0],
        })
        .subscribe(() => {
          this.showDialog = true;
          this.dialogMessage = `Thank you for your donation to ${this.fundraiser?.CAPTION}`;
        });
    }
  }

  closeDialog() {
    this.showDialog = false;
    if (this.dialogMessage.startsWith('Thank you')) {
      this.router.navigate(['/fundraiser', this.fundraiser?.FUNDRAISER_ID]);
    }
  }
}
