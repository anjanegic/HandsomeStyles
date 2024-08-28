import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule, MatCardTitleGroup } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatGridListModule, MatButtonModule, ProductListComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  animations: [
    trigger('resultsState', [
      state(
        'center',
        style({
          transform: 'translateY(20px)',
        })
      ),
      state(
        'top',
        style({
          transform: 'translateY(-40px)',
        })
      ),
      transition('center => top', [animate('500ms ease-out')]),
      transition('top => center', [animate('500ms ease-in')]),
    ]),
  ],
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl('');
  results: any[] = [];
  resultsState: string;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((query) => {
      if (query.trim()) {
        this.productService.search(query).subscribe((results) => {
          this.results = results;
          this.resultsState = 'top'; // Pokreće animaciju
        });
      } else {
        this.results = [];
        this.resultsState = 'center'; // Sakriva rezultate
      }
    });
  }
}
