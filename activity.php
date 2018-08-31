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
<link rel="stylesheet" href="activityStyle.css">
</head>
<body>
<div id="activityView">
	<i class="fa fa-plus" title="Add Activity" onclick="activityModule.newActivity()" id="addActivity"></i>
	<span id="msg"></span>
	


	<div id="newActivity">
		<form method="post">
			<i class="fa fa-close" title="cancel" onclick="activityModule.back()" id="cancel"></i>
			<h3>ADD ACTIVITY</h3> 
			<label>Description:</label> <span id="error"> </span>
			<textarea rows="3" cols="10" id="description" name="description"></textarea>
			<label>Assign to:</label>
			<select id="users" name="user_id"> </select>
			<label>Priority:</label>
			<select id="aPrioirty" name="aPriority">
			<option> HIGH </option>
			<option> MEDIUM </option>
			<option> LOW </option> </select>
			<label>Due Date:</label> <span id="errorDate"> </span>
			<input type="date" id="date">

			<i class="fa fa-check" title="Add" onclick="activityModule.addActivity()" id="save"></i>
		</form>
	</div>

	<div id="activityList">
		<table style="width: 100%;"><tr><td><h1> ACTIVITY LIST </h1></td><td><div class="search"><i class="fa fa-search" aria-hidden="true"></i><input class="gSearch" id="global"  placeholder="Search" type="text"></div></td></tr></table>

		<table id="actTable">
			<thead id="tabHead">
				<tr>
					<th align="left"> Todo <div class="search"><i class="fa fa-search" aria-hidden="true"></i><input class="cSearch" placeholder="Search"  id="todoSearch" type="text"></div> </th>
					<th align="left"> In Progress<div class="search"><i class="fa fa-search" aria-hidden="true"></i><input class="cSearch" placeholder="Search"  id="progSearch" type="text"> </div></th>
					<th align="left"> Awaiting QA<div class="search"><i class="fa fa-search" aria-hidden="true"></i><input class="cSearch" placeholder="Search"  id="waitSearch" type="text"></div></th>
					<th align="left"> Done<div class="search"><i class="fa fa-search" aria-hidden="true"></i><input class="cSearch"  placeholder="Search"  id="doneSearch" type="text"></div> </th>
				</tr>
			</thead>
			<tbody id="tabBody">
				<tr>
					<td id="todo"></div></td>
					<td id="inProgress"> </div></td>
					<td id="waiting"> </div></td>
					<td id="done"> </div></td>
				</tr>
				
			</tbody>
		</table>
	</div>
 <a href="user.php" id="back"> <i class="fa fa-angle-double-left"></i> Back</a> 
</div>
</body> 
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="activities.js"></script>
<script>
	//method that is called when the document is completely loaded
	$(document).ready(function(){
		activityModule.init();
	});
	</script>

</html>