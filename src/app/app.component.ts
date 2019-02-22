import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTable, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { AppDialogComponent } from './appDialog/appDialog.component';
import { AppService } from './appservice.service';
import { Book } from './book.model';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  @ViewChild("table") table: MatTable<Book>;
  title = "book-crud";

  books: Book[];

  displayedColumns: string[] = [
    "id",
    "nombre",
    "autor",
    "editorial",
    "edicion",
    "actions"
  ];
  dataSource;

  constructor(
    private bookService: AppService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getBooks();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getBooks() {
    this.bookService.getBooks().subscribe((data: Book[]) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  deleteBook(book: Book): void {
    this.bookService.deleteBook(book.id).subscribe(data => {
      this.dataSource.data = this.dataSource.data.filter(i => i !== book);
    });
  }

  editBook(book): void {
    const dialogRef = this.dialog.open(AppDialogComponent, {
      position: {
        top: "20%"
      },
      data: book
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getBooks();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AppDialogComponent, {
      position: {
        top: "20%"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this.getBooks();
    });
  }
}
