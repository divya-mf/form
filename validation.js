function validateForm() {
	
    var fname = document.getElementById("fname").value;
	var lname = document.getElementById("lname").value;
    if (fname == "") {
        var msg ="Name must be filled out";
		 document.getElementById("msg").innerHTML = msg;
		 form.fname.focus();
		 //document.getElementById('fname').style.border ="1px solid red";
        return false;
    }
	if (lname == "") {
        var msg ="Name must be filled out";
		 document.getElementById("msg").innerHTML = msg;
		 form.lname.focus();
        return false;
    }
	var db = document.getElementById("db").value;
	if (db == "") {
        var msg ="Fill in your date of birth";
		 document.getElementById("msg").innerHTML = msg;
		 form.db.focus();
        return false;
    }
	var email = document.getElementById("email").value;
	
	if (email == "") {
        var msg ="Fill in your email";
		 document.getElementById("msg").innerHTML = msg;
		 form.email.focus();
        return false;
    }
	
	var pw = document.getElementById("pw").value;
	var pw_c = document.getElementById("pw_confirm").value;
	if (pw != pw_c) {
        var msg ="Password mismatch";
		 document.getElementById("msg").innerHTML = msg;
		 form.pw_confirm.focus();
        return false;
		
	}
	if (pw == "" ) {
        var msg ="Please set a password";
		 document.getElementById("msg").innerHTML = msg;
		 form.pw.focus();
        return false;
		
	}
	
	var at = email.indexOf("@");
    var dot = email.lastIndexOf(".");
         
         if (at < 1 || ( dot - at < 2 )) 
         {
            var msg = "Please enter valid email ID";
			document.getElementById("msg").innerHTML = msg;
            form.email.focus() ;
            return false;
         }
	
	
	
}