import { Component, OnInit } from '@angular/core';

import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-dept',
  templateUrl: './show-dept.component.html',
  styleUrls: ['./show-dept.component.css'],
})
export class ShowDeptComponent implements OnInit {
  constructor(private service: SharedService) {}

  DepartmentList: any = [];

  //declaring variable to be set
  ModalTitle: string = '';
  ActivateAddEditDeptComp: boolean = false;
  dep: any;

  //sorting iva javascript
  DepartmentIdFilter: string = '';
  DepartmentNameFilter: string = '';
  DepartmentListWithoutFilter: any = [];

  //also needs to call the refreshDeptList in the ngOnInit function
  //ngOnInit is the first method that get executed when this compenent is in scope.
  ngOnInit(): void {
    this.refreshDeptList();
  }

  addClick() {
    this.dep = {
      DepartmentId: 0,
      DepartmentName: '',
    };
    this.ModalTitle = 'Add Department';
    this.ActivateAddEditDeptComp = true;
  }

  closeClick() {
    this.ActivateAddEditDeptComp = false;
    //and refresh the department list withour refreshing the page by callback refreshDeptList method
    this.refreshDeptList();
  }

  editClick(item: any) {
    this.dep = item;
    this.ModalTitle = 'Edit Department';
    this.ActivateAddEditDeptComp = true;
  }

  deleteClick(item: any) {
    if (confirm('Are you sure?')) {
      this.service.deleteDepartment(item.DepartmentId).subscribe((data) => {
        alert(data.toString());
        this.refreshDeptList();
      });
    }
  }

  //add a method to refresh the department list variable from the API method
  refreshDeptList() {
    //subscribe method make sure to wait till the response is received from API call then only
    //assign value to the department list variable this is a asyncronous operation
    this.service.getDeptList().subscribe((data) => {
      this.DepartmentList = data;
      this.DepartmentListWithoutFilter = data;
    });
  }

  //filter function
  filterFn() {
    var DepartmentIdFilter = this.DepartmentIdFilter;
    var DepartmentNameFilter = this.DepartmentNameFilter;

    this.DepartmentList = this.DepartmentListWithoutFilter.filter((el: any)=> {
      return el.DepartmentId.toString().toLowerCase().includes(
        DepartmentIdFilter.toString().trim().toLowerCase()
        )&&
        el.DepartmentName.toString().toLowerCase().includes(
          DepartmentNameFilter.toString().trim().toLowerCase())    
    });
  }

  //sorting function
  sortResult(prop:any, asc:any) {
    this.DepartmentList = this.DepartmentListWithoutFilter.sort(function (a:any,b:any){
      if(asc){
        return (a[prop]>b[prop]) ? 1: ((a[prop]<b[prop]) ?-1 : 0);
      }else{
        return (b[prop]>a[prop]) ? 1: ((b[prop]<a[prop]) ?-1 : 0);
      }
    });
  }
}
