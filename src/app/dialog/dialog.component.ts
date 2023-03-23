import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  conditionProduct: string[] = ["New", "Second Hand", "B/Y"]
  productForm!:FormGroup

  constructor(private formBuilder: FormBuilder){}

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
    console.log(this.productForm.value)
  }
}
