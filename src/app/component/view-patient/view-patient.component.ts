import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Appointment } from '../../models/appointment';
// import * as alertify from 'alertify.js';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css'],
  providers: [DatePipe]
})
export class ViewPatientComponent implements OnInit {

  patient;
  names;
  patientId;
  today;
  isBookAppointment: boolean = true;
  isFormEnabled: boolean = false;
  isScheduledAppointment: boolean = true;
  isTableEnabled: boolean = false;
  appointmentForm: FormGroup;
  appointmentDetails = new Appointment;
  bookedAppointmentResponse;
  ScheduledAppointmentResponse;

  constructor(fb: FormBuilder,private route: Router, private datePipe: DatePipe, private activatedRoute: ActivatedRoute, private dataService: DataService) {
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    // add necessary validators
    this.appointmentForm = fb.group({
      'selectDisease' : ['',Validators.required],
      'tentativeDate' : ['',Validators.required],
      'priority' : ['',Validators.required]
    })

   }

  ngOnInit() {

    // get selected patient id
    this.patientId = this.activatedRoute.snapshot.params['id'];
    // get Particular Patient from service using patient id and assign response to patient property
    this.dataService.getParticularPatient(this.patientId).subscribe((data)=>{
      this.patient = data;
    });

  }

  bookAppointment() {
    // get diseases list from service
    this.dataService.getDiseasesList().subscribe((data)=>{
      this.names = data;
    });
    this.isBookAppointment = false;
    this.isScheduledAppointment = true;
    this.isFormEnabled = true;
    this.isTableEnabled = false;
    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately
  }

  scheduleAppointment() {

    // The below attributes to be added while booking appointment using service
    // patientId, patientFirstName, patientLastName, disease, priority, tentativedate, registeredTime

    // if booked successfully should redirect to 'requested_appointments' page
    this.appointmentDetails.patientId = this.patientId;
    this.appointmentDetails.patientFirstName = this.patient.firstName;
    this.appointmentDetails.patientLastName = this.patient.lastName;
    this.appointmentDetails.disease = this.appointmentForm.controls['selectDisease'].value;
    this.appointmentDetails.priority = this.appointmentForm.controls['priority'].value;
    this.appointmentDetails.tentativedate = this.appointmentForm.controls['tentativeDate'].value;
    this.appointmentDetails.registeredTime = new Date();
    this.dataService.bookAppointment(this.appointmentDetails).subscribe((data)=>{
      this.bookedAppointmentResponse = data;
      this.route.navigateByUrl('requested_appointments');
    })
    
  }

  scheduledAppointment() {

    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately
    this.isBookAppointment = true;
    this.isScheduledAppointment = false;
    this.isFormEnabled = false;
    this.isTableEnabled = true;
    // get particular patient appointments using getAppointments method of DataService 
    this.dataService.getAppointments(this.patientId).subscribe((data)=>{
      this.ScheduledAppointmentResponse = data;
    })

  }

  cancelAppointment(id) {

    // delete selected appointment uing service
    this.dataService.deleteAppointment(this.ScheduledAppointmentResponse.id).subscribe((data)=>{

    })
    // After deleting the appointment, get particular patient appointments
    this.scheduledAppointment();

  }
  
}

