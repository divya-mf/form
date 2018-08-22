<?php
	include("config.php");

	$fname= $_POST['fname'];
	$lname= $_POST['lname'];
	$db= $_POST['db'];
	$email= $_POST['email'];
	$gender= $_POST['gender'];
	$blood_group= $_POST['blood_group'];
	$password= $_POST['password'];
	$sql = "SELECT id FROM registered_users WHERE email_id = '$email'";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
			 $return = 0;
	}
	else{
		$stmt = $conn->prepare("INSERT INTO registered_users (first_name,last_name,birth_date,gender,blood_group,email_id,password) VALUES (?,?,?,?,?,?,?)");
		$stmt->bind_param("sssssss", $fname, $lname,$db,$gender,$blood_group,$email,$password);
		$stmt->execute(); 
		$return = 1;
	}
 
	echo json_encode($return);


?>