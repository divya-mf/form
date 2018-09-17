import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

 userDetails:object; //object to store user details.
 id;
 storedId;
 
  constructor(
    private _data: DataService,
    private route:ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.storedId=localStorage.getItem('id');
    if(this.id == this.storedId){
      this._data.getUserDetails(this.id).subscribe(
        data => {
          this.userDetails = data['user'];
          localStorage.setItem('role', this.userDetails['role']);
         }
      )
    }
    else
    {
      this.router.navigate(['/login']);
    }
   
  }

}
