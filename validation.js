/**
 * @validation.js
 * Provides validations to the data entered in the form fields
 *
 * if validation succeeds displays the data in a tabular form
 * and edits or deletes the data from the table as per choise.
 */
 
var formModule = (function () {
	var $fName = $('#fname'),
		$lName = $('#lname'),
		$db =$('#db'),
		$email = $('#email'),
		$pw = $('#pw'),
		$pw_c = $('#pw_confirm'),
		$table=$('#dataTable'),
		$index = $('#editState'),
		$success =$('#success'),
		$fError=$("#fError"),
		$lError=$("#lError"),
		$dbError=$("#dbError"),
		$mailError=$("#mailError"),
		$pwError=$("#pwError"),
		$pwcError=$("#pwcError"),
		$bGroup = $("#bGroup"),
		$data = $("#showData"),
		$table=$("#dataTable"),
		$noData=$("#noData"),
		$editState= $("#editState"),
		$submit= $("#submit");
		$passwords=[]; //array to store the passwords of the users

		
	/**
	 * validates form fields
	 * 
	 * 
	 * @returns {boolean value}
	*/
   function validateForm() {
		var fName = $fName.val(),
			lName =$lName.val(),
			db =$db.val(),
			email = $email.val(),
			pw = $pw.val(),
			pw_c = $pw_c.val(),
			index = $editState.val(),
			table=$table;
			error=0, l=0;
			
		clearErrors();
		
		if (fName == "") {
			error=1;
			$fError.html("Fill in your first name");
			$fError.show();
		}
		
		if (lName == "") {
		   $lError.html("Fill in your last name");
		   if(error==1)
		   {
			  $lError.css("margin-left", "110px"); //change in position with respect to the length of the message.
		   }else{
			   $lError.css("margin-left", "224px");
		   }
		   $lError.show();
		    error=1;
		}
	
		if (db == "") {
		   error=1;
		   $dbError.html("Fill in your date of birth");
		}
		
		if (email == "") {
			error=1;
			$mailError.html("Fill in your email");
			$mailError.show();
		}
		
		if (pw == "" ) {
		   error=1;
		   $pwError.html("Please set a password");
		   $pwError.show();
		}
		
		if(error == 1){
			$success.hide();  
			$(window).scrollTop(0);	//scrolls the browser window to the top of the page to show errors.
			return false;
		}
		
		if(index != "")
		{
			updateData();
			return false;
		}
		
		showTableData(fName,lName,db,email,pw);
		return false;

	}
	
	
	/**
	 * Displays the form data in a tabular structure
	 * 
	 * @param {string} fname - first name from the form data
	 * @param {string} lname - last name from the form data
	 * @param {string} db - date of birth from the form data
	 * @param {string} email - email id of the user
	 * @param {string} pw - password of the user
	*/
	
	function showTableData(fname,lname,db,email,pw){
		var email =emailToLowerCase(email);
		var gender = $("input[name='gender']:checked").val();
		var bGroup = $bGroup.val(); 
		var index=$table.find('tr').length;
		var data = {
		  "fname": fname,
		  "lname" :lname,
		  "db"	: db,
		  "email" :email,
		  "gender" :gender,
		  "blood_group" :bGroup,
		  "password" :pw
		  
		};
		
		$noData.hide();
		$passwords.push(pw); //adding passwords of new user in the array.
		
		$table.append("<tr><td>" +index+ "</td><td>"+ fname+ "</td><td>" +lname+ "</td><td>" +
		db+ "</td><td>" +gender+ "</td><td>" +bGroup+ "</td><td>" +email+
		"</td><td> <button class='btn' title='Delete' id='remove' onclick=formModule.removeRow(this)>" + 
		"<i class='fa fa-trash'></i></button> <button class=\"btn \" title='Edit' onclick=formModule.editRow(this)>" +
		"<i class='fa fa-edit'></i> </button> </td></tr>");

		//ajax to call a php file which adds information of user to database.
		$.ajax({
		  type: "POST",
		  dataType: "json",
		  url: "register.php",
		  data: data,
		  dataType: "json",
		  success: function(fetch) {
			if( jQuery.parseJSON(fetch) == 1){
				var msg ="Registered Successfully";
				$success.html(msg);
				clearForm();
				$success.show();
				$(window).scrollTop(1000);
			}
			else{
				$success.hide();
				$mailError.html("Email already exists");
				$mailError.css("margin-left", "275px");
				$mailError.show();
				}
		  },
		  error:function(data)
		  {
		  	alert(data["json"]);
		  }
		});  
    
	}
	
	
	/**
	 * Removes the selected row of data
	 * 
	 * @param {string} row
	*/
	function removeRow(row) {
		var msg ="Deleted Successfully";
		$(row).parents("tr").remove(); //removing the selected row from the table.
		$success.show();
		$success.html(msg);
		clearErrors();
		
		if ($table.find('tr').length == 1)
		{
			var info ="No Data Found";
			$noData.html(info);	
			$noData.show();	  
		}
		
		$(window).scrollTop(1000);  //scrolls the browser to the bottom of the window to show message.
	}
	
	
	/**
	 * Fills the form with the data of selected
	 * 
	 * @param {string} index - the selected row node
	*/
	function editRow(index) {
		var row = $(index).parents("tr"); //fetching the complete row to edit.
		var cols = row.children("td");	//fetching the individual cells of the row.
		var rowIndex;
		
		$(window).scrollTop(0);
		$success.hide();
		clearErrors();
		
		rowIndex=$(cols[0]).text();
		$fName.val($(cols[1]).text());
		$lName.val($(cols[2]).text());
		$db.val($(cols[3]).text());
		$bGroup.val($(cols[5]).text());
		$email.val($(cols[6]).text());
		$pw.val($passwords[rowIndex-1]);
		$pw_c.val($passwords[rowIndex-1]);

		$submit.html("Update");
		$editState.val( $(cols[0]).text());
		//checking in the gender radio button as per the value stored in the table.
		$(cols[4]).text() == 'female'? $('#female').prop('checked', true) : $('#male').prop('checked', true);	
	}
	
	
	/**
	 * updates the values of the selected row in the table
	 * 
	*/
	function updateData() {
		var dataArray=[]; 	//array that stores all the form data.
		var email = emailToLowerCase($email.val());
		var index = $editState.val(),j,k;
		var msg ="Updated Successfully";
		
		dataArray.push($fName.val(),$lName.val(),$db.val(),$("input[name='gender']:checked").val(),$bGroup.val(),$.trim(email));
		
		for(k=0;k<=dataArray.length;k++){
			j=k+1;
			$table.find('tr:eq('+index+') td:eq('+j+')').html(dataArray[k]) ;
		}
	
		$success.show();
		$success.html(msg);
		clearForm();
		$(window).scrollTop(1000); //scrolls the browser to the bottom of the window to show message.
	}
	
	
	/**
	 * clears the form, scrolls to the top of the window, hides the messages
	 and resets the edit state.
	 * 
	*/	
	function clearForm(){
		$('form')[0].reset();
		$(window).scrollTop(0); //scrolls the browser window to the top of the page after clearing inputs
		$submit.html("Register");
		$editState.val("");
		$success.hide();
		clearErrors();
	}
	
	
	/**
	 * emailToLowerCase -converts the email id to lower case
	 * @param {string} email - email id entered by the user.
	 *
	 *  @returns {converted email string}
	*/
	function emailToLowerCase(email){
		email = email.toLowerCase();
		return email;
	}
	
	
	/**
	 * clearErrors - clears all the errors.
	 * 
	 *
	*/	
	function clearErrors()
	{	$pwcError.html("");
		$pwError.html("");
		$dbError.html("");
		$mailError.html("");
		$lError.html("");
		$fError.html("");
	}
	
	
	/**
	 * checkErrors - checks all the errors in email and birth date fields.
	 * 
	 *
	*/
	function checkErrors(){
		var error=0; 
		var email =$email.val();
		var at = email.indexOf("@");
		var dot = email.lastIndexOf(".");
		
		$noData.html("No data found");
		$noData.hide();
		$email.on('keyup',function(){
			error=0;
			$mailError.hide();
			if(email != ""){
				if (at < 1  || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)+$/.test(email)== false){
					$mailError.show();
					$mailError.html("Please enter a valid email ID");
					$mailError.css("margin-left", "230px");
					error=1;
				}
			}
		});
		
		$db.on("focus", function() {
			$dbError.html("");
		});

		//disables the submit button if there are any errors.
		$(".container").on('keyup',function(){
			error == 1 ? $submit.prop('disabled', true):$submit.prop('disabled', false) ; 
		});
	}
	
	/**
	 * checkPasswords - checks all the errors in password fields.
	 * 
	 *
	*/
	function checkPasswords(){
		$pw.on("keyup", function() {
			$pwError.hide();
		});
		
		$pw_c.on('keyup',function(){
			error=0;
			$pwcError.hide();
			var pw= $pw.val();
			var pw_c=$pw_c.val();
			if (pw != pw_c) {
				error=1;
				$pwcError.html("Password mismatch");
				$pwcError.show();
			}
		});
		
	}
	
	/**
	 * checkNames - checks all the errors in name fields.
	 * 
	 *
	*/
	
	function checkNames(){
		$fName.on('input',function(){
			var  status;
			var fName = $fName.val();
			$error=0;
			$fError.hide();
			
			if (fName == "") {
				 $fError.html("Fill in your first name");
				 $fError.show();
				 $lError.css("margin-left", "110px");
				 error=1;
			}
			
			status=validateName(fName);
			
			if(status){
				$fError.html("Invalid name")
				$fError.show();
				$lError.css("margin-left", "110px");
				error=1;
			}

		});
		
		$lName.on('input',function(){
			var lName = $lName.val();
			var  status;
			$error=0;
			$lError.hide();
			if (lName == "") {
				 $lError.css("margin-left", "190px");
				 $lError.html("Fill in your last name");
				 $lError.show();
				  error=1;
				 
			}
			
			status=validateName(lName);
			
			if(status){
				$lError.css("margin-left", "190px");
				$lError.html("Invalid name")
				$lError.show();
				error=1;
			}

		});
	}
	
	/**
	 * search - Operations related to search functionality.
	 * 
	 *
	*/
	
	function search(){
		var $search = $("#search");
		
		$search.on("keyup", function() {
			var value = $(this).val().toLowerCase();
			$success.hide();
		
			$("#dataList tr").filter(function() {
			  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
			
		  });
		  
		});
		
		$search.on({
			mouseenter: function(){
				$(this).css("background-color", "#cccccc");
			}, 
			mouseleave: function(){
				 $(this).css("background-color", "#ffffff");
			}
		});
		
	}
	
	/**
	* validateName - validates the entered name
	* @param {string} name - first name when called from the
	* event fired when first name is enetered and last name
	* if called from the event fired when last name is entered.
    *
	*  @returns {boolean value}
   */	
	function validateName(name)
	{
		if(name != "" && /^[a-zA-Z]+$/.test( name ) == false){
			error=1;
			return true;
		}
	}

	function init() {
		checkErrors();
		checkNames();
		checkPasswords();
		search();
	}
	
	
	
	return{
		validateForm:validateForm,
		showTableData:showTableData,
		editRow: editRow,
		removeRow:removeRow,
		clearForm:clearForm,
		init : init
	}
})();
 