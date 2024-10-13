import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Category {
  CATEGORY_ID: number;
  NAME: string;
}

interface Fundraiser {
  FUNDRAISER_ID?: number;
  CAPTION: string;
  ORGANIZER: string;
  CITY: string;
  CATEGORY_NAME: string;
  CATEGORY_ID: number;
  TARGET_FUNDING: number;
  CURRENT_FUNDING: number;
  ACTIVE: number;
}

interface Donation {
  DONATION_ID: number;
  DATE: string;
  AMOUNT: number;
  GIVER: string;
  FUNDRAISER_ID: number;
}

// interface Fundraiser {
//   ACTIVE: number;
//   CAPTION: string;
//   CATEGORY_ID: number;
//   CITY: string;
//   CURRENT_FUNDING: number;
//   FUNDRAISER_ID: number;
//   ORGANIZER: string;
//   TARGET_FUNDING: number;
//   CATEGORY_NAME: string;
// }

// interface Donation {
//   DONATION_ID: number;
//   DATE: string;
//   AMOUNT: number;
//   GIVER: string;
//   FUNDRAISER_ID: number;
// }

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, DatePipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  categories: Category[] = [];
  fundraisers: Fundraiser[] = [];
  newFundraiser: Fundraiser = {
    CAPTION: '',
    ORGANIZER: '',
    CITY: '',
    CATEGORY_NAME: '',
    CATEGORY_ID: 0,
    TARGET_FUNDING: 0,
    CURRENT_FUNDING: 0,
    ACTIVE: 1,
  };
  selectedFundraiser: Fundraiser | null = null;
  donations: Donation[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadFundraisers();
  }

  loadFundraisers() {
    this.http
      .get<{ data: Fundraiser[] }>('http://localhost:3000/api/allFundraiser')
      .subscribe((res) => {
        this.fundraisers = res.data;
      });

    this.http
      .get<{ data: Category[] }>('http://localhost:3000/api/allCategories')
      .subscribe((res) => {
        this.categories = res.data;
      });
  }

  createFundraiser() {
    this.http
      .post('http://localhost:3000/api/addFundraiser', this.newFundraiser)
      .subscribe(() => {
        this.newFundraiser = {
          CAPTION: '',
          ORGANIZER: '',
          CITY: '',
          CATEGORY_NAME: '',
          CATEGORY_ID: 0,
          TARGET_FUNDING: 0,
          CURRENT_FUNDING: 0,
          ACTIVE: 1,
        };
        this.loadFundraisers();
      });
  }
  selectFundraiser(fundraiser: Fundraiser) {
    this.selectedFundraiser = { ...fundraiser };
    this.loadDonations(fundraiser.FUNDRAISER_ID!);
  }

  loadDonations(fundraiserId: number) {
    this.http
      .get<{ data: Donation[] }>(
        `http://localhost:3000/api/donationForFundraiser/${fundraiserId}`
      )
      .subscribe((res) => {
        this.donations = res.data;
      });
  }

  updateFundraiser() {
    if (this.selectedFundraiser) {
      this.http
        .put(
          `http://localhost:3000/api/updateFundraiser/${this.selectedFundraiser.FUNDRAISER_ID}`,
          this.selectedFundraiser
        )
        .subscribe(() => {
          this.loadFundraisers();
          this.selectedFundraiser = null;
        });
    }
  }

  deleteFundraiser(id: number) {
    if (confirm('Are you sure you want to delete this fundraiser?')) {
      this.http
        .delete(`http://localhost:3000/api/deleteFundraiser/${id}`)
        .subscribe(() => {
          this.loadFundraisers();
        });
    }
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find((c) => c.CATEGORY_ID === categoryId);
    return category ? category.NAME : '-';
  }
}
