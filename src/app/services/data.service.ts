import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users.model';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';
import { ApiService } from './api.service';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class DataService {

  isLoggedIn = false;
  isLogIn: BehaviorSubject<boolean>;
  constructor(private api: ApiService) {
    this.isLogIn = new BehaviorSubject<boolean>(false);
  }

  authenticateUser(username: string, password: string): Observable<boolean> {

    // store 'userId' from response as key name 'userId' to the localstorage
    this.api.checkLogin(username,password).subscribe((data)=>{
      localStorage.setItem('userId',''+data.userId);
      this.isLogIn.next(true);
      this.isLoggedIn = true;
    },(err)=>{
      this.isLoggedIn = false;
      this.isLogIn.next(false);
    })
    // return true if user authenticated
    return localStorage.getItem('userId')!==null ? of(true):of(false);
    // return false if user not authenticated 
  }

  getAuthStatus(): Observable<boolean> {
    // return this.isLogIn.asObservable();
    return this.isLogIn.asObservable();
  }
  doLogOut() {
    // remove the key 'userId' if exists
    if(localStorage.getItem('userId')!=null){
      localStorage.removeItem('userId');
      this.isLogIn.next(false);
    }
  }

  getUserDetails(userId: number): Observable<Users> {

    // should return user details retrieved from api service

    return this.api.getUserDetails(userId);
    // .pipe(catchError((err)=>{
    //   let error = { }
    //   return throwError(err);
    // }));
  }

  updateProfile(userDetails): Observable<boolean> {

    // should return the updated status according to the response from api service
    let user = null;
    this.api.updateDetails(userDetails).subscribe((data)=>{
      user = data;
    })
    return user!=null?of(true):of(false);
  }

  registerPatient(patientDetails): Observable<any> {


    // should return response retrieved from ApiService

    // handle error 

    return this.api.registerPatient(patientDetails);

  }

  getAllPatientsList(): Observable<any> {


    // should return all patients list retrieved from ApiService

    // handle error 

    return this.api.getAllPatientsList();

  }

  getParticularPatient(id): Observable<any> {

    // should return particular patient details retrieved from ApiService

    // handle error 

    return this.api.getParticularPatient(id);
  }
  
  getDiseasesList(): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.getDiseasesList();
  }

  bookAppointment(appointmentDetails): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.bookAppointment(appointmentDetails);
  }

  getAppointments(patientId): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.getAppointments(patientId);
  }

  deleteAppointment(appointmentId): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.deleteAppointment(appointmentId);
  }

  requestedAppointments(): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.requestedAppointments();
  }

  getUserId(): number {

    // retrieve 'userId' from localstorage
    if(localStorage.getItem('userId')  && this.isLogIn.value===true){
      return Number(localStorage.getItem('userId'));
    }
    return -1;
  }


}


