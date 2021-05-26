import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
messageConfirmation = '';
  constructor(private bookService: BooksService, private router:Router) { }


  ngOnInit(): void {
  }
  add(book: any) {
    if (book.bookNumber === '' || book.author === '' || book.bookName === '' || book.date === '' || book.genre === '' || book.rank === '') {
      this.messageConfirmation = 'Fill all the fields';
      return;
      
    }
    this.bookService.addBook(book).subscribe((res: any) => {
     if(res.result === 'fail. book exists'){
      this.messageConfirmation = 'This book already exists';  
         }
      else{
      this.messageConfirmation = 'Added successfully!';
         }
    }, err => console.log(err));
  }

}
