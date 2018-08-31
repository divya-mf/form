<?php
session_start();
include("config.php");
$id = $_SESSION['id'];

//to fetch the details of the logged in user.
if(isset($_POST['userLogin']))
{
    $findCommand = $fm->newFindCommand('USR');
    $findCommand->addFindCriterion('id',$id);
    $result = $findCommand->execute();
    $record = $result->getRecords();
    $record = $record[0];
    $row=array(
    'first_name'=>$record->getField('firstName'),
    'last_name'=>$record->getField('lastName'),
    'email'=>$record->getField('email'),
    'role'=>$record->getField('role')
    );
    if (FileMaker::isError($record)) { 
        $row=$record->getMessage() ;
    }
    echo json_encode($row);
}


//to fetch the details of the selected user by the admin
//uid- selected user's id.
if(isset($_POST['uid']))
{
    $uid = $_POST['uid'];
    $findCommand = $fm->newFindCommand('USR');
    $findCommand->addFindCriterion('id',$uid);
    $result = $findCommand->execute();
    $record = $result->getRecords();
    $record = $record[0];
    $return ='<input type="hidden" id="user_id" value='.$record->getField('id').'>
            <ul>
            <li>First Name: '. $record->getField('firstName').'</li>
            <li>Last Name: '.$record->getField('lastName').'</li>
            <li>Email ID: '. $record->getField('email') .'</li>
            </ul>';
    echo $return;
}


//to fetch the list of users shown in the search option.

if(isset($_POST['allUsers']))
{
    $query = $fm->newFindAllCommand('USR'); 
    $result = $query->execute();
    $records = $result->getRecords(); 
    $users=array();
    $i=0;
    foreach ($records as $record) { 
        if($record->getField('id')== $id)
            $i++;
        else{
            $users[$i]['id']=$record->getField('id');
            $users[$i]['first_name']=$record->getField('firstName');
            $users[$i]['last_name']=$record->getField('lastName');
        }
        $i++;
    }
    echo json_encode($users);
}



/*
if(isset($_POST['save']))
{
    $id=$_POST['id'];
    $fname= $_POST['fname'];
    $lname= $_POST['lname'];
    $db= $_POST['db'];
    $email= $_POST['email'];
    $gender= $_POST['gender'];
    $blood_group= $_POST['blood_group'];
    $sql = "SELECT id FROM registered_users WHERE email_id = '$email' AND id NOT IN ('$id')";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
             $msg = "Email already exists";
             echo $msg;
    }
    else{
        $stmt = $conn->prepare("UPDATE registered_users SET first_name=?, last_name=?, birth_date=?, gender=?, blood_group=?, email_id=? WHERE id='$id'");
        $stmt->bind_param("ssssss", $fname, $lname,$db,$gender,$blood_group,$email);
        $stmt->execute(); 
        $success = "updated successfully";
        echo $success;
    }

}
*/
if(isset($_POST['delete']))
{
    $uid=$_POST['id'];
    $findCommand = $fm->newFindCommand('USR');
    $findCommand->addFindCriterion('id',$uid);
    $result = $findCommand->execute();
    $records = $result->getRecords();
    $id= $records[0]->getRecordId();
    $cmd = $fm->newDeleteCommand('USR',$id);
    $result= $cmd->execute();

    $findCommand = $fm->newFindCommand('activities');
    $findCommand->addFindCriterion('__fk_user_id',$uid);
    $result = $findCommand->execute();
    $records = $result->getRecords();
    $id= $records[0]->getRecordId();
    $cmd = $fm->newDeleteCommand('activities',$id);
    $result= $cmd->execute();
    if (FileMaker::isError($result)) { 
        $success=$result->getMessage() ;
    }
    else{
        $success = "deleted successfully"; 
    }
    
    echo $success; 
}

?>