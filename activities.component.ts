import { Component, OnInit } from '@angular/core';
import {  FormGroup,ReactiveFormsModule,FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { Router } from '@angular/router';
import { Validator,AbstractControl, ValidationErrors, NG_VALIDATORS, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  activityForm: FormGroup;
  activities;users;search;
  public todo: any[]=[];
  progress: any[]=[];
  waiting: any[]=[];
  done: any[]=[];
  id;role;success=false;
  activityList= true;
  newActivity= false;allANDs:any;
  allORs:any;
  dataToSend:any;status;tab;statusVal;
  constructor(
    private router:Router,
    private _data:DataService,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {

    this.activityForm = this.formBuilder.group({
      description: ['', Validators.required],
      date: ['', Validators.required],
      user_id:[''],
      priority:['']
    });

    this.listActivities();
    this.getUsers();
  }

  get f() {
    return this.activityForm.controls;
    }

    addActivity() {
      if(this.activityForm.invalid)
      return;

      this._data.addActivity(this.activityForm.value)
      .subscribe(
        data => {
          console.log(data);
          this.success= true;
        },
        error => {
          console.log(error);
          // error['error']['description'] ? this.msg=error['error']['description']  : this.status=false;
          // window.scroll(0,0);
        });
   }

   listActivities()
   {
    this.id=localStorage.getItem('id');
    this.role=localStorage.getItem('role');
    this.dataToSend={
      "id":this.id,
      "role":this.role
    }
    this._data.getActivities(this.dataToSend).subscribe(
      data => { 
        this.activities=data;
        for (let i = 0; i < this.activities.length ; i++)
        {
          if(this.activities[i]['status']== 'ToDo'){
            this.todo.push(this.activities[i]);
          }
          if(this.activities[i]['status']== 'In Progress'){
            this.progress.push(this.activities[i]);
          }
          if(this.activities[i]['status']== 'Awaiting QA'){
            this.waiting.push(this.activities[i]);
          }
          if(this.activities[i]['status']== 'Done'){
            this.done.push(this.activities[i]);
          }
         // this.status=this.assignStatus(this.activities[i]['status']);
        }
      },
      error => {
         console.log(error);
      });
   }
   getUsers(){
    this._data.getUsers().subscribe(
      data => {
        this.users = data['users'];
       }
    )
   }

  newAddActivity()
  {
    this.activityList=false;
    this.newActivity=true;
  }

  cancel(){
    this.newActivity=false;
    this.activityList=true;
    
  }
 
  todoSearch(value: string)
  {
    this.statusVal="Todo";
    this.todo=[];
    this.searchActivities(value, this.statusVal,this.todo);
  }

  progSearch(value: string)
  {
    this.statusVal="In Progress";
    this.progress=[];
    this.searchActivities(value, this.statusVal,this.progress);

  }

  waitSearch(value: string)
  {
    this.statusVal="Awaiting QA";
    this.waiting=[];
    this.searchActivities(value, this.statusVal,this.waiting);

  }

  doneSearch(value: string)
  {
    this.statusVal="Done";
    this.done=[];
    this.searchActivities(value, this.statusVal,this.done);

  }

  globalSearch(value: string)
  {
    this.statusVal="";
    this.todo=[];
    this.progress=[];
    this.waiting=[];
    this.done=[];
    this.searchActivities(value, this.statusVal,0);

  }


  searchActivities(value, statusVal, tab)
  {
    this.allANDs={
      "status" : statusVal,
    };
    this.allORs= { 
      "description" : value,
      "USR::fullName":value
    };
    this.dataToSend={
      "allORs":this.allORs,
      "allANDs":this.allANDs,
      "id":this.id,
      "role":this.role
    }
    
    this._data.getActivitiesBySearch(this.dataToSend).subscribe(
      data => { 
        this.activities=data;
        if(this.activities == 0)
        {
          this.listActivities();
        }
        else{
          for (let i = 0; i < this.activities.length ; i++)
          { 
            if(tab === 0)
            {
              if(this.activities[i]['status']== 'ToDo'){
                this.todo.push(this.activities[i]);
              }
              if(this.activities[i]['status']== 'In Progress'){
                this.progress.push(this.activities[i]);
              }
              if(this.activities[i]['status']== 'Awaiting QA'){
                this.waiting.push(this.activities[i]);
              }
              if(this.activities[i]['status']== 'Done'){
                this.done.push(this.activities[i]);
              }
            }
            else
            {
              tab.push(this.activities[i]);
            }
          }
      }
      },
      error => {
         console.log(error);
      });
  }

  assignStatus($status){
    if($status == "ToDo")
    {
        this.tab= this.todo;
    }
    if($status =="In Progress")
    {
      this.tab= this.progress;
    }
    if($status =="Awaiting QA")
    {
      this.tab= this.waiting;
    }
    if($status =="Done")
    {
     this.tab= this.todo;
    } 

    return this.tab;
  }
  
 

}
