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

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatGridListModule, MatButtonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl('');
  results: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe((query) => {
      if (query) {
        this.productService.search(query).subscribe((results) => {
          this.results = results;
        });
      }
    });
  }
}
