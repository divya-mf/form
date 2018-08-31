<?php
/**
  * This file is responsible for checking the user login credentials
  * and take actions accordingly.
  * 
  */

if(empty($_SESSION)) // if the session not yet started 
   session_start();
if(isset($_SESSION['id'])) { // if already login
   header("location: user.php"); // send to user profile
   exit; 
}

//to achieve the database connection.
include("config.php");
$msg='';
if(isset($_POST['email']) && isset($_POST['pw'])){
  if($_POST['email']!='' && $_POST['pw']!=''){
    $email=$_POST['email'];
    $em = '=="' . $email . '"';
    $email_id=str_replace("@","_",$em);
    $pw=$_POST['pw'];
    $findCommandSearch = $fm->newCompoundFindCommand('USR');
    $findCommand1 = $fm->newFindCommand('USR');

    //Specifying the field and value to match against.
    $findCommand1->addFindCriterion('emailCal', $email_id);
    $findCommand1->addFindCriterion('password',$pw);
    $findCommandSearch->add(1,$findCommand1);

    //To perform the find
    $result = $findCommandSearch->execute();
    if (FileMaker::isError($result)) { 
      $msg= "incorrect credentials";
    }
    else{
      $records = $result->getRecords( ) ;
      $record = $records[0];
      $_SESSION['id']= $record->getField('id');
      $_SESSION['role']= $record->getField('role');
      header("Location:user.php");
      exit(); 
    }
  }else{
    $msg="Fill in both email and password";
  }
}
?>