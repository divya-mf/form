import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from './../user';
import { Activity } from './../activity';
import { environment } from './../../environments/environment'
import { Observable, of, throwError} from "rxjs"
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //fetch users from db
  getUsers(){
    return this.http.get(this.apiUrl+'/users')
    .pipe( 
      catchError( error => {
        return throwError( error )
      })
   );
  }

  //add user
  register(user: User) {
    return this.http.post(this.apiUrl+'/register', user)
    .pipe( 
      catchError( error => {
        return throwError( error )
      })
   );
  }

  //login user
  login(email: string, password: string) {
    return this.http.post(this.apiUrl+'/login', { email: email, password: password })
    .pipe( 
      catchError( error => {
        return throwError( error )
      })
   );
  }

  getUserDetails(id:number) {
    return this.http.post(this.apiUrl+'/getUserDetails', { id: id})
    .pipe( 
      catchError( error => {
        return throwError( error )
      })
   );
  }

  getActivities(dataToSend:any){
    return this.http.post(this.apiUrl+'/activities',{ dataToSend:dataToSend })
    .pipe( 
      catchError( error => {
        return throwError( error )
      })
   );
  }

  getActivitiesBySearch(dataToSend:any){
    return this.http.post(this.apiUrl+'/activities',{ dataToSend:dataToSend})
    .pipe( 
      catchError( error => {
        return throwError( error )
      })
   );
  }


  addActivity(activity: Activity) {
    return this.http.post(this.apiUrl+'/addActivity', activity)
    .pipe( 
      catchError( error => {
        return throwError( error )
      })
   );
  }
}
