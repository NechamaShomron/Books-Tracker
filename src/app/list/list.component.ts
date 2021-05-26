import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  messageConfirmation = '';
  headElements = ['#', 'Author', 'Book Name', 'Date', 'Genre', 'Rank', 'Edit'];
  bookList : any =  [];
  constructor(private bookService: BooksService) {
  }

  ngOnInit(): void {
    this.bookService.seeList().subscribe((res: any) => {
      this.bookList = res;
    });
  }
  
  onDelete(book: any){
    this.bookService.deleteBook(book).subscribe((res: any) => {
    }, (err: any) => console.log(err));
    this.ngOnInit();
  }
}

