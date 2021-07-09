import { Component, OnInit } from '@angular/core';

import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service: SharedService) {}

  EmployeeList: any = [];

  //declaring variable to be set
  ModalTitle: string = '';
  ActivateAddEditEmpComp: boolean = false;
  emp: any;

  //also needs to call the refreshDeptList in the ngOnInit function
  //ngOnInit is the first method that get executed when this compenent is in scope.
  ngOnInit(): void {
    this.refreshEmployeeList();
  }

  addClick() {
    this.emp = {
      EmployeeId: 0,
      EmployeeName: '',
      Department: '',
      DateOfJoining: 0
      
    };
    this.ModalTitle = 'Add Employee';
    this.ActivateAddEditEmpComp = true;
  }

  closeClick() {
    this.ActivateAddEditEmpComp = false;
    //and refresh the department list withour refreshing the page by callback refreshDeptList method
    this.refreshEmployeeList();
  }

  editClick(item: any) {

    console.log(item);
    this.emp = item;
    this.ModalTitle = 'Edit Employee';
    this.ActivateAddEditEmpComp = true;
  }

  deleteClick(item: any) {
    console.log(item);
    if (confirm('Are you sure?')) {
      this.service.deleteEmployee(item.EmployeeId).subscribe((data) => {
        alert(data.toString());
        this.refreshEmployeeList();
      });
    }
  }

  //add a method to refresh the department list variable from the API method
  refreshEmployeeList() {
    //subscribe method make sure to wait till the response is received from API call then only
    //assign value to the department list variable this is a asyncronous operation
    this.service.getEmpList().subscribe((data) => {
      this.EmployeeList = data;
    });
  }

}
