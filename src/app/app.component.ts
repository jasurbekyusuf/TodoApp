import { ApiService } from './services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private dialog: MatDialog, private api: ApiService){}

  displayedColumns: string[] = ['productName', 'category', 'price', 'condition', 'date', 'comment', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllProducts()
  }
  title = 'Angular App';

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: "30%"
    }).afterClosed().subscribe(res =>{
      if(res === 'save'){
        this.getAllProducts()
      }
    });
  }

  getAllProducts(){
    this.api.getProduct()
      .subscribe({
        next:(res) => {
          this.dataSource = new MatTableDataSource(res)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        },
        error:() => {
        alert("Something went wrong while get product")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row: any){
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(res =>{
      if(res === 'update'){
        this.getAllProducts()
      }
    });
  }

  deleteProduct(id: number){
    this.api.deleteProduct(id)
      .subscribe({
        next:(res) => {
          alert("Product deleted successfully")
          this.getAllProducts()
        },
        error: ()=>{
          alert("Something went wrong while get product")
        }
      })
  }
}
