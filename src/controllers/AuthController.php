<?php
/**
 * AuthController
 * class that manages all the login and registration of the user.
 *
 */

namespace Src\Controllers;

class AuthController 
 { 
    private $class= 'FileMaker';
    private $common='Common';
    private $fm;

    public function __construct()
    {
        $this->fm = include __DIR__ .'/../api/config.php'; //FileMaker connection object
        include __DIR__ .'/../api/common.php';
	}
    
    public function signUp($request, $response)
    {
        $email = sanitize($_POST['email']);

        //array to store the values to pass into the database
        $userDetails = array(
                    'firstName' =>$this->common::sanitize($_POST['fname']),
                    'lastName' => $this->common::sanitize($_POST['lname']),
                    'email' => $this->common::sanitize($_POST['email']),
                    'password' =>$this->common::sanitize( $_POST['password'])
                );
    
        $findCommand = $this->fm->newFindCommand('USR');

        //Specifying the field and value to match against.
        $findCommand->addFindCriterion('email',"==$email");

        //To perform the find
        $result = $findCommand->execute();

        //to check if there are no records with similar email id.
        if ($this->class::isError($result)) 
        {
            $newUser = $fm->createRecord('USR', $userDetails);
            $result = $newUser->commit();
            $response=array('status'=> $records->getMessage(), 'code'=> $records->code, 'description'=>"registered successfully");

        }
        else
        { 
            $response['msg'] = "Email already exists";
        }
       
        header('Content-type: application/json');
        echo json_encode($response);
    
    }

    public function login($request, $response)
    {
        $email=$this->common::sanitize($_POST['email']);
        $pw=$this->common::sanitize($_POST['pw']);
           
        $findCommand = $this->fm->newFindCommand('USR');
        $findCommand->addFindCriterion('email', "==$email");
        $findCommand->addFindCriterion('password',"==$pw");

        //To perform the find
        $result = $findCommand->execute();

        if ($this->class::isError($result))
        { 
            $response=array('status'=> $result->getMessage(), 'code'=> $result->code,'description'=>"incorrect credentials");
        }
        else
        {
            $records = $result->getRecords() ;
            $record = $records[0];
            $_SESSION['id']= $record->getField('id');
            $_SESSION['role']= $record->getField('role');

            $response=array('status'=> "Ok", 'code'=> 200,'description'=>"login successful");
        }

        header('Content-type: application/json');
        echo json_encode($response); 
    }


}