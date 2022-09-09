import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Patient } from '../../models/patient';
import { DataService } from '../../services/data.service';
// import * as alertify from 'alertify.js';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [DatePipe]
})
export class FormComponent implements OnInit {

  complexForm: FormGroup;
  patientDetails = new Patient;
  result;

  today: string;

  noRecordsFound = 'No patient records found in the list. Click on Register New Patient to add Patient details.';

  emptyFirstname = 'You must include a first name.';
  minlengthFirstname = 'Your first name must be at least 3 characters long.';
  maxlengthFirstname = 'Your first name cannot exceed 20 characters.';
  emptyLastname = 'You must include a last name.';
  minlengthLastname = 'Your last name must be at least 3 characters long.';
  maxlengthLastname = 'Your last name cannot exceed 20 characters.';
  noGender = 'You must select a gender.';
  noDob = 'You must select a valid date of birth.';
  noMobile = 'You must include mobile number.';
  numberMobile = 'You must enter a valid 10 digit mobile number.';
  maxlengthMobile = 'Your mobile number should not exceed 10 digits.';
  noEmail = 'You must include a valid email.';
  patternEmail = 'Pattern does not match.';

  ngOnInit() {
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  constructor( fb: FormBuilder,private datePipe: DatePipe,private route: Router, private dataService: DataService){
    this.complexForm = fb.group({
      'firstName' : ['',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'lastName': ['',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'gender' : ['',[Validators.required]],
      'dob' : ['',[Validators.required]],
      'mobile' : ['',[Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),Validators.maxLength(10) ]],
      'email' : ['',[Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      'description' : ''
    })
  }

  submitForm(value: any){
    console.log(value);
    this.patientDetails.firstName = value['firstName'].value;
    this.patientDetails.lastName = value["lastName"].value;
    this.patientDetails.gender = value["gender"].value;
    this.patientDetails.dob = value["dob"].value;
    this.patientDetails.mobile = value["mobile"].value;
    this.patientDetails.email = value["email"].value;
    this.patientDetails.description = value["description"].value;
    this.patientDetails.registeredTime = new Date();
    // assign new date object to reportedTime
    // should reister new patient using service
    console.log(this.patientDetails);
    this.dataService.registerPatient(this.patientDetails).subscribe((data)=>{
      this.route.navigateByUrl('/patientList');
    });
    // if added successfully should redirect to 'patientList' page

  }

}
