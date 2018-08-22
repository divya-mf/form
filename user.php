<?php
if(empty($_SESSION)) // if the session not yet started 
   session_start();

if(!isset($_SESSION['id'])) { //if not yet logged in
   header("Location: login.php");// send to login page
   exit;
} 
include("config.php");
$id = $_SESSION['id'];
$sql = "SELECT * FROM registered_users WHERE id = '$id' ";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
?>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="userstyle.css">
</head>
<body>
<div id="frame">
	<div id="details">
		<div id="msg">
		</div>
		<h1>WELCOME <?php echo $row['first_name']; ?> </h1>
		<h3>Your Details:</h3>
		<ul>
			<li>First Name:<?php echo $row['first_name']; ?></li>
			<li>Last Name:<?php echo $row['last_name']; ?></li>
			<li>Email ID:<?php echo $row['email_id']; ?></li>
			<li>Birth Date:<?php echo $row['birth_date']; ?></li>
			<li>Gender:<?php echo $row['gender']; ?></li>
			<li>Blood Group:<?php echo $row['blood_group']; ?></li>
		</ul>
		<button class="btn" title='Edit' onclick="userModule.edit()"><i class='fa fa-edit'></i> </button>
	</div>
	<div id="editDetails">
		<h1>WELCOME <?php echo $row['first_name']; ?> </h1>
		<h3>Edit Your Details:</h3>
			<ul>
				<li>First Name:<input type="text" id="fname" name="fname" value="<?php echo $row['first_name']; ?>"></li>
				<li>Last Name:<input type="text" id="lname" name="lname" value="<?php echo $row['last_name']; ?>"></li>
				<li>Email ID:<input type="text" id="email" name="email" value="<?php echo $row['email_id']; ?>"></li>
				<li>Birth Date:<input type="date" id="db" name="db" value="<?php echo $row['birth_date']; ?>"></li>
				<li>Gender: <input type="radio" class="radio-btn" name="gender"  id="male" value="male" <?php if($row['gender']=='female'){ $checked='checked'; echo $checked;}?>/>
		  		<label class="label">Male</label> 
		  		<input type="radio" class="radio-btn" name="gender"  id="female" value="female" <?php if($row['gender']=='female'){ $checked='checked'; echo $checked;}?> />
		  		<label class="label">Female</label></li>
				<li>Blood Group:<select id="bGroup" name="bGroup" value="<?php echo $row['blood_group']; ?>">
				    <option>A Positive</option>
					<option>A Negative</option>
					<option>B Positive</option>
					<option>B Negative</option>
					<option>AB Positive</option>
					<option>AB Negative</option>
					<option>O Positive</option>
					<option>O Negative</option>
					<option>Unknown</option>
		  			</select>
		  		</li>
			</ul>
			<input type="hidden" name="save" id="save" value="save">
			<button name="submit" class="btn" id="update" title='save' onclick="userModule.save(<?php echo $id; ?>)" ><i class='fa fa-save'></i> </button>
	</div>
	<div class="dropdown">
		<button onclick="userModule.myFunction()" class="dropbtn">Search Users</button>
		<div id="myDropdown" class="dropdown-content">
		<input type="text" placeholder="Search.." id="myInput" onkeyup="userModule.filterFunction()">
		<?php 
		    $sql = "SELECT id,first_name,last_name FROM registered_users WHERE id NOT IN ('$id') ";
			$result = $conn->query($sql);
			while($res = $result->fetch_assoc()) {?>
		    <a onclick="userModule.showUser(<?php echo $res['id']; ?>)"><?php echo $res['first_name'].' '. $res['last_name']; ?> </a>
			<?php } ?>
		</div>
	</div>
	<a href="logout.php" id="logout" class="dropbtn">Logout</a>
	<div id="userDetails">
		<h3>User Details:</h3>
			<div id="all">
			</div>
			<?php if($row['type']=='admin') {?> <button id="del" title='delete' onclick="userModule.deleteUser()"><i class='fa fa-trash'></i> </button>  <?php } ?>
	</div>
</body> 
<script src="userProfile.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>


</html>