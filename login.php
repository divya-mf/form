<?php
include("logUser.php");
?>

<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="userstyle.css">
</head>
<body>
  <div id="login">
    <h2>Login Here</h2>
    <p id="msg"> <?php  echo $msg; ?> </p>
    <form method = "post">
      <label for="fname">Email ID</label>
      <input type="email" id="email" name="email" placeholder="Your email">
      <label for="lname">Password</dlabel>
      <input type="password" id="pw" name="pw">
      <input type="submit" value="Submit">
    </form>
  </div>
</body>
</html>
