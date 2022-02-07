import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { CRUDService } from '../services/crud.service';
declare const Swal: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  columnDefs: ColDef[] = [
    {
      field: 'p_name',
      headerName: 'Name',
      sortable: true,
      headerClass: 'header-cell'
    },
    {
      field: 'p_description',
      headerName: 'Desc',
      sortable: true,
      headerClass: 'header-cell'
    },
    {
      field: 'p_price',
      headerName: 'Price',
      sortable: true,
      headerClass: 'header-cell',
      cellRenderer: this.priceCellRender.bind(this)
    },
    {
      field: '',
      headerName: 'Actions',
      headerClass: 'header-cell',
      width: 250,
      cellRenderer: this.actionRender.bind(this)
    }
];

  rowData: any = [];
  gridOptions = {
    rowHeight: 50
  }

  productList: any = [];
  productListSubscribe: any;
  constructor(private crudService: CRUDService, private router: Router) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.productListSubscribe = this.crudService.loadProducts().subscribe(res => {
      this.productList = res;
      this.rowData = res;
    })
  }

  actionRender(params: any) {
    let div = document.createElement('div');
    let htmlCode = '<button type="button" class="btn btn-success">View</button>\n' +
      '<button type="button" class="btn btn-warning">Edit</button>\n' +
      '<button type="button" class="btn btn-danger">Delete</button>'

    // let htmlCode = '<img class="btn btn-success" <img src="https://img.icons8.com/material-outlined/24/000000/view-details.png"/>\n' +
    //   '<img class="btn btn-warning" src="https://img.icons8.com/material-outlined/24/000000/edit--v1.png"/>\n' +
    //   '<img class="btn btn-danger" src="https://img.icons8.com/material-outlined/24/000000/filled-trash.png"/>'
    
      

    div.innerHTML = htmlCode;
    
    let viewButton: any = div.querySelector('.btn-success');
    viewButton.addEventListener('click', () => {
      this.viewProductDetails(params)
    })

    let editButton: any = div.querySelector('.btn-warning');
    editButton.addEventListener('click', () => {
      this.editProductDetails(params)
    })

    let deleteButton: any = div.querySelector('.btn-danger');
    deleteButton.addEventListener('click', () => {
      this.deleteProduct(params)
    })

    return div;
  }

  viewProductDetails(params: any){
    this.router.navigate(['/crud/view-product-details/' + params.data.p_id])
  }

  editProductDetails(params: any){
    this.router.navigate(['/crud/update-product/' + params.data.p_id])
  }

  deleteProduct(params: any){
    console.log('delete');
    const that = this;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: any) => {
      if (result.isConfirmed) {
        that.crudService.deleteProduct(params.data.p_id).subscribe(res => {
          if(res.result === 'success'){
            this.getProductList()
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })       
      }
    })
  }

  priceCellRender(params: any) {
    return '$' + params.data.p_price;
  }

}
