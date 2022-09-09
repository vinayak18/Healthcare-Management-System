import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Users } from '../../models/users.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  editProfile = false;
  userId = -1;
  userDetails = new Users;

  editProfileForm: FormGroup;
  userImg = './../../assets/user.jpg';
  mobileErrMsg = 'You must enter a valid mobile number';
  emailErrMsg = 'You must enter a valid Email ID';
  locationErrMsg = 'You must enter the location';

  constructor(private dataService: DataService) { }

  ngOnInit() {

    // add necessary validators
    // username should be disabled. it should not be edited

    this.editProfileForm = new FormGroup({
      userName: new FormControl({value: '', disabled: true}),
      mobile: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      email: new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      location: new FormControl('',[Validators.required])
    });

    // get login status from service
    // get userId from service and assign it to userId property
    this.userId = this.dataService.getUserId();
    // get profile details and display it
    this.getProfileDetails();
    // this.editProfileForm.setValue({userName: this.userDetails.username,mobile:this.userDetails.mobile,email:this.userDetails.email,location:this.userDetails.location});

  }

  changeMyProfile() {

    // if successfully changed the profile it should display new details hiding the form
    this.userDetails.mobile = this.editProfileForm.controls['mobile'].value;
    this.userDetails.email = this.editProfileForm.controls['email'].value;
    this.userDetails.location = this.editProfileForm.controls['location'].value;
    this.dataService.updateProfile(this.userDetails).subscribe((data)=>{
      this.getProfileDetails();
      this.discardEdit();
    })

  }

  editMyProfile() {

    // change editProfile property value appropriately
    this.editProfile = true;
  }

  discardEdit() {

    // change editProfile property value appropriately
    this.editProfile = false;

  }

  getProfileDetails() {

    // retrieve user details from service using userId
    this.dataService.getUserDetails(this.userId).subscribe((data)=>{
      this.userDetails = data;
    })
    setTimeout(()=>{
      this.editProfileForm.controls['userName'].setValue(this.userDetails.username);
      this.editProfileForm.controls['mobile'].setValue(this.userDetails.mobile);
      this.editProfileForm.controls['email'].setValue(this.userDetails.email);
      this.editProfileForm.controls['location'].setValue(this.userDetails.location);
    },1000)
  }
  
}
