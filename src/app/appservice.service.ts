import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) {}
  baseUrl = 'http://localhost:3000/books/';

  getBooks() {
    return this.http.get<Book[]>(this.baseUrl);
  }
  deleteBook(id: number) {
    return this.http.delete<Book[]>(this.baseUrl + id);
  }
  createBook(book: Book) {
    return this.http.post(this.baseUrl, book);
  }
  getBookById(id: number) {
    return this.http.get<Book>(this.baseUrl + '/' + id);
  }
  updateBook(book: Book) {
    console.log('service book ' + JSON.stringify(book));
    return this.http.put(this.baseUrl + book.id, book);
  }
}
