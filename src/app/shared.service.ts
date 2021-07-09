import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';   //observable is handle asyncronous request and responses


//run the ASP.net to get the api url
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = "http://localhost:49232/api";
  readonly PhotoUrl = "http://localhost:49232/Photos/";

  //intantiate http client in the constructor
  constructor(private http:HttpClient) { }

  //get the department list from API
  getDeptList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Department');
  }

  //add department to consume the post department API to add new
  addDepartment(val:any){
    return this.http.post(this.APIUrl+'/Department', val);
  }

  updateDepartment(val:any){  
    return this.http.put(this.APIUrl+'/Department', val);
  }
    // Passing and ID(+val) at the end of URL
  deleteDepartment(val:any){  
    return this.http.delete(this.APIUrl+'/Department/'+val);
  }

  //----------Employee Http CLient Request ------
  //get the Employee list from API
  getEmpList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Employee');
  }

  //add Employee to consume the post department API to add new
  addEmployee(val:any){
    return this.http.post(this.APIUrl+'/Employee', val)
  }

  updateEmployee(val:any){
    return this.http.put(this.APIUrl+'/Employee', val)
  }
  // Passing and ID(+val) at the end of URL
  deleteEmployee(val:any){
    return this.http.delete(this.APIUrl+'/Employee/'+val)
  }

  //to save profile pictures
  UploadPhotos(val:any){
    return this.http.post(this.APIUrl+'/Employee/SaveFile', val)
  }

  getAllDepartmentNames():Observable<any[]>{
      return this.http.get<any>(this.APIUrl+'/Employee/GetAllDepartmentNames')
  }
}
