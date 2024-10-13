import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../card/card.component';

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
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink, FormsModule, CardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchCriteria = {
    ORGANIZER: false,
    CITY: false,
    CATEGORY: false,
  };
  fundraisers: any[] = [];
  errorMessage: string = '';
  noResults: boolean = false;

  constructor(private http: HttpClient) {}

  searchFundraisers() {
    if (
      !this.searchCriteria.ORGANIZER &&
      !this.searchCriteria.CITY &&
      !this.searchCriteria.CATEGORY
    ) {
      this.errorMessage = 'Please select at least one search criteria.';
      return;
    }

    this.errorMessage = '';
    this.noResults = false;

    // 这里需要根据您的 API 调整 URL 和参数
    this.http
      .get<{ data: Fundraiser[] }>('http://localhost:3000/api/allFundraiser', {
        params: this.searchCriteria,
      })
      .subscribe((res) => {
        this.fundraisers = res.data;
      });
  }

  clearCheckboxes() {
    this.searchCriteria = {
      ORGANIZER: false,
      CITY: false,
      CATEGORY: false,
    };
    this.fundraisers = [];
    this.errorMessage = '';
    this.noResults = false;
  }
}
