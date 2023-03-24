import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  conditionProduct: string[] = ["New", "Second Hand", "B/Y"]
  productForm!:FormGroup

  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<DialogComponent>){}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName:["", Validators.required],
      category:['', Validators.required],
      condition:['', Validators.required],
      price:['', Validators.required],
      comment:['', Validators.required],
      date:['', Validators.required],
    })
  }

  addProduct(){
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value)
        .subscribe({
          next:()=>{
            alert("product was added successfully")
            this.productForm.reset()
            this.dialogRef.close("save")
          },
          error:() => {
            alert("Something went wrong while adding")
          }
        })
    }
    else {
      alert("Please fill out all required fields");
    }
  }
}
