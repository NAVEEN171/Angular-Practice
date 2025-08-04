import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule, FormsModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  totalPages: number = 20;
  currentPage: number = 1;
  paginatedArray: string[] = [];
  currentPageChange(num: string) {
    this.currentPage = parseInt(num);
    this.generatePaginatedArray();
  }
  generatePaginatedArray() {
    if (this.currentPage > this.totalPages) {
      alert('Invalid Current Page specified');
      return;
    }
    this.paginatedArray = [];
    if (this.totalPages <= 3) {
      for (let i = 1; i <= this.totalPages; i++) {
        this.paginatedArray.push(i.toString());
      }
    } else {
      this.paginatedArray.push('1');
      if (this.currentPage > 3) {
        this.paginatedArray.push('...');
      }
      for (
        let i = Math.max(2, this.currentPage - 1);
        i <= Math.min(this.totalPages - 1, this.currentPage + 1);
        i++
      ) {
        this.paginatedArray.push(i.toString());
      }

      if (this.currentPage < this.totalPages - 2) {
        this.paginatedArray.push('...');
      }
      this.paginatedArray.push(this.totalPages.toString());
    }
  }
}
