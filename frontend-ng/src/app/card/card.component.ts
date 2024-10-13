import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import clsx from 'clsx';

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
  selector: 'card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  constructor(private router: Router) {}

  @Input() item!: Fundraiser;

  clsx = clsx;

  navigateToFundraiser() {
    this.router.navigate(['/fundraiser', this.item.FUNDRAISER_ID]);
  }
}
