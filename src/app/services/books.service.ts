import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private url = 'http://localhost:3000/';
  private addbookUrl = this.url + 'add-book';
  private booksUrl =  this.url + 'books';
  private deletebookUrl = this.url + 'delete-book';
  private headers = { Authorization: "Bearer " + localStorage.getItem("token")}

  constructor(private http: HttpClient) { }

  addBook(book : any){
    return this.http.post(this.addbookUrl, book, {headers: this.headers});

  }

  seeList(){
    return this.http.get(this.booksUrl, {headers: this.headers});

  }
  deleteBook(book: any){
    return this.http.post(this.deletebookUrl , book ,{headers: this.headers});
  }

}
