import { Component, OnInit, DoCheck, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import {DataService } from '../../services/data.service';
import { Users } from '../../models/users.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userId = -1;
  userDetails = new Users;

  constructor(private dataService: DataService) { 

  }

  ngOnInit() {

    // get userId from service and assign it to userId property
    this.userId = this.dataService.getUserId();
    // call getProfileDetails method to get user details
    this.getProfileDetails();

  }

  getProfileDetails() {

  // call getUserDetails method of dataService and assign response to userDetails property
    this.dataService.getUserDetails(this.userId).subscribe((data)=>{
      this.userDetails = data;
    })
  }

  doLogout(){
    this.dataService.doLogOut();
  }


}
