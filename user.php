<?php
include('header.php');
session_start();
if(!isset($_SESSION['id'])) { //if not yet logged in
   header("Location: login.php");// send to login page
   exit;
} ?>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="userstyle.css">
</head>
<body>
<div id="frame">
</div>
	<div id="menu">
		<?php if($_SESSION['role'] == 'admin'){ ?>
			<div class="dropdown">
			<button onclick="userModule.search()" class="dropbtn">Search Users</button>
				<div id="users" class="dropdown-content">
					<input type="text" placeholder="Search.." id="srch" onkeyup="userModule.filterFunction()">
					<div id="usersList">
					</div> 	
				</div>
			</div>
		<?php } ?>
		<a href="activity.php" class="dropbtn">Activity List</a>
		
	</div>
	<div id="details">
		<div id="msg">
		</div>
		<h1>WELCOME <span class="frst"></span> </h1>
		<h3>Your Details:</h3>
		<ul>
			<li>First Name: <span class="frst"></span></li>
			<li>Last Name: <span class="lst"></span></li>
			<li>Email ID: <span class="em"></span></li>
			
		</ul>
		<button class="btn" title='Edit' onclick="userModule.edit()"><i class='fa fa-edit'></i> </button>
	</div>
	<div id="editDetails">
		<h1>WELCOME <span class="frst"> </h1>
		<h3>Edit Your Details:</h3>
			<ul>
				<li>First Name:<input type="text" id="frst1" name="fname"></li>
				<li>Last Name:<input type="text" id="lst1" name="lname"></li>
				<li>Email ID:<input type="text" id="em1" name="email"></li>
			</ul>
			<input type="hidden" name="save" id="save" value="save">
			<button name="submit" class="btn" id="update" title='save' onclick="userModule.save()" ><i class='fa fa-save'></i> </button>
	</div>

	<div id="userDetails">
		<button id="close" title='close' onclick="userModule.closeModal()"><i class='fa fa-close'></i></button>   
		<h3>User Details:</h3>
			<div id="all">
			</div>
			 <button id="del" title='delete user' onclick="userModule.deleteUser()"><i class='fa fa-trash'></i> </button>  
	</div>
</body> 
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="userProfile.js"></script>
<script src="constants.js"></script>
<script>
	//method that is called when the document is completely loaded
	$(document).ready(function(){
		userModule.init();
	});
	</script>

</html>