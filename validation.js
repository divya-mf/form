    function validateForm() {
		var fname = document.getElementById("fname").value;
		var lname = document.getElementById("lname").value;
		var success = document.getElementById("success");
		var error= document.getElementById("msg");
		error.innerHTML=" ";
		var errorMsg=new Array(); 
		var l=0;
			
		if (fname == "") {
			errorMsg[l++] ="Fill in your first name";
		}
		if (lname == "") {
		   errorMsg[l++] ="Fill in your last name";
		}
		if(fname != "" && lname != ""){
			if( /^[a-zA-Z\s]+$/.test( fname ) == false || /^[a-zA-Z\s]+$/.test( lname ) == false ) {
			   errorMsg[l++] ="Invalid name";
			}
		}
		
		var db = document.getElementById("db").value;
		if (db == "") {
		   errorMsg[l++] ="Fill in your date of birth";
		}
		var email = document.getElementById("email").value;
		
		if (email == "") {
			errorMsg[l++] ="Fill in your email";
		}
		var at = email.indexOf("@");
		var dot = email.lastIndexOf(".");
			 if(email != ""){
				 if (at < 1 || ( dot - at < 2 ) ||/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)== false) 
				 {
					errorMsg[l++] = "Please enter a valid email ID";
				}
			 }
		 var table=document.getElementById("dataTable");
		 var index = document.getElementById("editState").value;
		for(var i=1;i<table.rows.length;i++)
		{	if(i == index) continue;
			
			if(table.rows[i].cells[6].innerHTML == email)
			{
			errorMsg[l++] ="Email already exists";
			}
			
		}

		var pw = document.getElementById("pw").value;
		var pw_c = document.getElementById("pw_confirm").value;
		if (pw != pw_c) {
			errorMsg[l++] ="Password mismatch";
			}
		if (pw == "" ) {
		   errorMsg[l++] ="Please set a password";
		}
		if(errorMsg.length > 0){
			document.body.scrollTop = document.documentElement.scrollTop = 0;
			success.style.display = "none";
			for(var i=0;i<=errorMsg.length-1;i++){
			error.innerHTML+="<li>"+errorMsg[i]+"</li>"
			}   
			return false;
		}
		if(document.getElementById("editState").value != "")
		{
			updateData();
			return false;
		}
		showTableData(fname,lname,db,email,pw,pw_c);
		return false;

	}

	function showTableData(fname,lname,db,email,pw,pw_c){
		document.getElementById("noData").style.display = "none";
		var gender = document.querySelector('input[name="gender"]:checked');
        gender = gender.value
		var bGroup = document.getElementById("bGroup").value;
		var data = document.getElementById("showData");
		data.style.display = "block";
		var table=document.getElementById("dataTable");
		var index=table.rows.length;
	 
        var row=table.insertRow(-1);
        var cell1=row.insertCell(0);
        var cell2=row.insertCell(1);
        var cell3=row.insertCell(2);
		var cell4=row.insertCell(3);
		var cell5=row.insertCell(4);
		var cell6=row.insertCell(5);
		var cell7=row.insertCell(6);
		var cell8=row.insertCell(7);
		var cell9=row.insertCell(8);
        cell1.innerHTML=index;
        cell2.innerHTML=fname
		cell3.innerHTML=lname;   		
		cell4.innerHTML=db;
		cell5.innerHTML=gender;
		cell6.innerHTML=bGroup;
		cell7.innerHTML=email;
		cell8.innerHTML=pw;	
		cell9.innerHTML = "<button class=\"btn\"  title=\"Delete\" id=\"remove\" onclick=\"removeRow(this)\"><i class=\"fa fa-trash\"></i></button> <button class=\"btn \" title=\"Edit\" onclick=\"editRow(this)\"><i class=\"fa fa-edit\"></i> </button>";

		clearForm();
		document.body.scrollTop = document.body.scrollHeight;
		document.documentElement.scrollTop = document.documentElement.scrollHeight;	
		var msg ="Registered Successfully";
		var success = document.getElementById("success");
		success.style.display = "block";
		success.innerHTML = msg;
	}

	function removeRow(row) {
		  var row = row.parentNode.parentNode;
		  row.parentNode.removeChild(row);
		  var msg ="Deleted Successfully";
		  var success = document.getElementById("success");
		  success.style.display = "block";
		  success.innerHTML = msg;
		 
		  if (document.getElementById("dataTable").rows.length == 1)
		  {
			  var info ="No Data Found";
			  var noData = document.getElementById("noData");
			  noData.style.display = "block";
			  noData.innerHTML = info;
			  
		  }
  
	}
	function editRow(index) {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		success.style.display = "none";
		var row = index.parentNode.parentNode;

		 document.getElementById("fname").value = row.cells[1].innerHTML;
		 document.getElementById("lname").value =row.cells[2].innerHTML;
		 document.getElementById("db").value = row.cells[3].innerHTML;
		 if(row.cells[4].innerHTML == 'female')
		 {
			 document.getElementById('female').checked = true; 
		 }
		 else
		 {
			 document.getElementById('male').checked = true;
		 }
		document.getElementById("bGroup").value =row.cells[5].innerHTML;
		document.getElementById("email").value = row.cells[6].innerHTML;
		document.getElementById("pw").value = row.cells[7].innerHTML;
		document.getElementById("pw_confirm").value = row.cells[7].innerHTML;
		document.getElementById("submit").innerHTML = "Update";
		document.getElementById("editState").value = row.cells[0].innerHTML;
		
	}

	function updateData() {
		var table=document.getElementById("dataTable");
		var index = document.getElementById("editState").value;
		var gender = document.querySelector('input[name="gender"]:checked');
			gender = gender.value
		table.rows[index].cells[1].innerHTML = document.getElementById("fname").value;
		table.rows[index].cells[2].innerHTML = document.getElementById("lname").value;
		table.rows[index].cells[3].innerHTML = document.getElementById("db").value;
		table.rows[index].cells[4].innerHTML = gender
		table.rows[index].cells[5].innerHTML = document.getElementById("bGroup").value;
		table.rows[index].cells[6].innerHTML = document.getElementById("email").value;
		table.rows[index].cells[7].innerHTML = document.getElementById("pw").value;
		clearForm();
		document.getElementById("submit").innerHTML = "Register";
		window.scrollTo(0,document.body.scrollHeight);
		var msg ="Updated Successfully";
		var success = document.getElementById("success");
		success.style.display = "block";
		success.innerHTML = msg;
		document.getElementById("editState").value="";
	}
	function clearForm(){
		document.getElementById("fname").value = "";
		document.getElementById("lname").value = "";
		document.getElementById("email").value = "";
		document.getElementById("db").value = "";
		document.getElementById("pw").value = "";
		document.getElementById("pw_confirm").value = "";
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		document.getElementById("success").style.display = "none";
	}