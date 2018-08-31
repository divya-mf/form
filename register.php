<?php
    /**
     * This file is responsible for registering/inserting users to FileMaker database.
     * 
     */

    //to achieve the database connection and other common functions.
    include("config.php");
    include("common.php");

    $return=0;
    $email = sanitize($_POST['email']);
    //array to store the values to pass into the database
    $data = array(
                'firstName' =>sanitize($_POST['fname']),
                'lastName' => sanitize($_POST['lname']),
                'email' => sanitize($_POST['email']),
                'password' =>sanitize( $_POST['password'])
            );

    $findCommand = $fm->newFindCommand('USR');
    //Specifying the field and value to match against.
    $findCommand->addFindCriterion('email',"==$email");
    //To perform the find
    $result = $findCommand->execute();
        
    //to check if there are no records with similar email id.
    if (FileMaker::isError($result)) {
         $return = 1;
        echo "<p>Error: " . $result->getMessage() . "</p>";
        $rec = $fm->createRecord('USR', $data);
        $result = $rec->commit();
        # check for errors
        if (FileMaker::isError($result)) {
            die('<p>'.$result->getMessage().' (error '.$result->code.')</p>');
        }
       
    }
    echo json_encode($return);

?>