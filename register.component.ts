import { Component, OnInit } from '@angular/core';
import {  FormGroup,ReactiveFormsModule,FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { Router } from '@angular/router';
import { Validator,AbstractControl, ValidationErrors, NG_VALIDATORS, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hide = true;
  status: boolean=true;
  msg; 
  constructor(
    private router: Router,
    private _data: DataService,
    private formBuilder: FormBuilder,
    
  ) { }
 
  ngOnInit() {

    //to compare the password field with confirm password field.
    let compareValidator = function(compareWith:string):ValidatorFn {
      return (c : AbstractControl) : ValidationErrors | null =>{
        if(c.value === null || c.value.length === 0){
          return null;
        }
        const compareTo = c.root.get(compareWith);
        if(compareTo){
          const subscription : Subscription = compareTo.valueChanges.subscribe( ()=>{
            c.updateValueAndValidity();
            subscription.unsubscribe();
          });
        }
        return compareTo && compareTo.value !== c.value ? {'compare':true} : null;
      };
    }

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['',[Validators.required,Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', [Validators.required, compareValidator('password')]]
  });


  
  }

  get f() {
     return this.registerForm.controls;
     }

  onSubmit() {
      this._data.register(this.registerForm.value)
      .subscribe(
        data => {
          //console.log(data);
           this.router.navigate(['/login']);
        },
        error => {
          error['error']['description'] ? this.msg=error['error']['description']  : this.status=false;
          window.scroll(0,0);
        });
   }
}