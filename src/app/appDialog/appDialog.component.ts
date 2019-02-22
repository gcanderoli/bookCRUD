import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { AppService } from './../appservice.service';

@Component({
  templateUrl: "./appDialog.component.html",
  styleUrls: ["./appDialog.component.scss"]
})
export class AppDialogComponent implements OnInit {
  addForm: FormGroup;
  bookData;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: AppService,
    private dialogRef: MatDialogRef<AppDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.bookData = data;
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      id: [""],
      nombre: ["", Validators.required],
      autor: ["", Validators.required],
      editorial: ["", Validators.required],
      edicion: ["", Validators.required]
    });

    if (this.bookData) {
      this.addForm.patchValue({
        id: this.bookData.id,
        nombre: this.bookData.nombre,
        autor: this.bookData.autor,
        editorial: this.bookData.editorial,
        edicion: this.bookData.edicion
      });
    }
  }

  onSubmit() {
    this.bookService.createBook(this.addForm.value).subscribe(
      data => {
        this.dialogRef.close();
      },
      error => {
        alert(error);
      }
    );
  }

  onUpdate() {
    this.bookService.updateBook(this.addForm.value).subscribe(
      data => {
        this.dialogRef.close();
      },
      error => {
        alert(JSON.stringify(error));
      }
    );
  }
}
