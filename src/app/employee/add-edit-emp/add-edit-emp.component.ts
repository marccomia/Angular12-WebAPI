import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css'],
})
export class AddEditEmpComponent implements OnInit {
  constructor(private service: SharedService) {}

  @Input() emp: any;
  EmployeeId: string | undefined;
  EmployeeName: string | undefined;
  Department: string | undefined;
  DateOfJoining: string | undefined;
  PhotoFileName: string | undefined;
  PhotoFilePath: string | undefined;

  //purpose for dropdown
  DepartmentList: any = [];

  ngOnInit(): void {
    this.loadDepartmentList();
  }

  loadDepartmentList() {
    this.service.getAllDepartmentNames().subscribe((data: any) => {
      this.DepartmentList = data;
    });

    this.EmployeeId = this.emp.EmployeeId;
    this.EmployeeName = this.emp.EmployeeName;
    this.Department = this.emp.Department;
    this.DateOfJoining = this.emp.DateOfJoining;
    this.PhotoFileName = this.emp.PhotoFileName;
    this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFileName;
  }

  addEmployee() {
    //JSON format
    let val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName,
    };
    //call the API method and pass the data
    this.service.addEmployee(val).subscribe((res) => {
      alert(res.toLocaleString());
    });
  }

  updateEmployee() {
    //JSON format
    let val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName,
    };

    //call the API method and pass the data
    this.service.updateEmployee(val).subscribe((res) => {
      alert(res.toLocaleString());
    });
  }

  //to save uploaded profile picture
  uploadPhoto(event: any) {
    let file = event.target.files[0];

    //create a form data and assign the filename and the file to it
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.service.UploadPhotos(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFileName;
    });
  }
}
