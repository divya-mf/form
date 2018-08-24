<?php
session_start();
$id = $_SESSION['id'];
include("config.php");

if(isset($_POST['uid']))
{
  $uid = $_POST['uid'];
    $sql1 = "SELECT * FROM registered_users WHERE id = '$uid' ";
    $res = $conn->query($sql1);
    $user = $res->fetch_assoc();
    $return ='<input type="hidden" id="user_id" value='.$user["id"].'>
                <ul>
            <li>First Name:'. $user["first_name"].'</li>
            <li>Last Name:'. $user["last_name"].'</li>
            <li>Email ID:'. $user["email_id"] .'</li>
            <li>Birth Date:'. $user["birth_date"].'</li>
            <li>Gender:'. $user["gender"].'</li>
            <li>Blood Group:'. $user["blood_group"].'</li>
        </ul>';

        echo $return;
}
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

if(isset($_POST['delete']))
{
    $uid=$_POST['id'];
    $stmt = $conn->prepare("DELETE FROM registered_users WHERE id=?");
    $stmt->bind_param("i", $uid);
    $stmt->execute(); 
    $success = "deleted successfully"; 
    echo $success;
}

if(isset($_POST['userLogin']))
{
$sql = "SELECT * FROM registered_users WHERE id = '$id' ";
$result = $conn->query($sql);
$row=array();
$row = $result->fetch_assoc();

echo json_encode($row);
}

if(isset($_POST['allUsers']))
{
    $id = $_SESSION['id'];
    $sql = "SELECT id,first_name,last_name FROM registered_users WHERE id NOT IN ('$id') ";
    $result = $conn->query($sql);
    $users=array();
    while($res = $result->fetch_assoc()) {
        $users[]=$res;
    }
    echo json_encode($users);
}

?>