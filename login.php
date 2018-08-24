<?php if(empty($_SESSION)) // if the session not yet started 
   session_start();
if(isset($_SESSION['id'])) { // if already login
   header("location: user.php"); // send to user profile
   exit; 
}
include("config.php");
$msg='';
if(isset($_POST['email'])!='' && isset($_POST['pw'])!=''){
  $email=$_POST['email'];
  $pw=$_POST['pw'];
  $sql = "SELECT id FROM registered_users WHERE email_id = '$email' and password = '$pw'";
  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $_SESSION['id']=$row["id"];
    header("Location:user.php");
    exit();
  }else { 
    $msg= "incorrect credentials";
  }
}
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
