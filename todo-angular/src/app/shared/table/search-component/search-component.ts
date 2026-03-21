import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'search-component',
  imports: [MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, FormField],
  template: `
    <mat-form-field subscriptSizing="dynamic">
      <mat-label>Search</mat-label>
      <input matInput type="search" [formField]="searchForm" (keyup.enter)="onSearch()" />
      <div matSuffix class="search-actions">
        @if (searchForm().value()) {
          <button mat-icon-button (click)="onClear()">
            <mat-icon>close</mat-icon>
          </button>
        }
        <button mat-icon-button (click)="onSearch()">
          <mat-icon>search</mat-icon>
        </button>
      </div>
    </mat-form-field>
  `,
  styles: `
    :host {
      display: block;
      flex: 1;
      min-width: 0;
    }

    mat-form-field {
      width: 100%;
      min-width: 150px;
    }

    .search-actions {
      display: flex;
      flex-direction: row;
      flex-shrink: 0;
    }
  `,
})
export class SearchComponent {
  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);

  searchModel = signal('');
  searchForm = form(this.searchModel);

  onSearch() {
    const searchString = this.searchForm().value();

    this.#router.navigate([], {
      relativeTo: this.#activatedRoute,
      queryParams: {
        pageNumber: 1, // Reset to first page
        searchQuery: searchString || null,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  onClear() {
    this.searchModel.set('');
    this.onSearch();
  }
}
