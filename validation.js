/**
 * validates form fields
 * 
 * 
 * @returns {boolean value}
*/
   function validateForm() {
		var fName = $('#fname').val();
		var lName = $('#lname').val();
		var success =$('#success');
		var error=0;
		var l=0;
		clearErrors();
		if (fName == "") {
			error=1;
			$("#fError").html("Fill in your first name");
		}
		
		if (lName == "") {
		  
		   $("#lError").html("Fill in your last name");
		   if(error==1)
		   {
			  $("#lError").css("margin-left", "110px"); 
		   }else{
			   $("#lError").css("margin-left", "224px");
		   }
		    error=1;
		}
		if(fName != "" && lName != ""){
			if( /^[a-zA-Z\s]+$/.test( fName ) == false || /^[a-zA-Z\s]+$/.test( lName ) == false ) {
			   error=1;
			   $("#fError").html("Invalid first name");
			   $("#fError").css("margin-left", "63px");
			   $("#lError").html("Invalid last name");
			   $("#lError").css("margin-left", "128px");
			}
		}
		
		var db =$('#db').val();
		if (db == "") {
		   error=1;
		   $("#dbError").html("Fill in your date of birth");
		}
		
		var email = $('#email').val();
		if (email == "") {
			error=1;
			$("#mailError").html("Fill in your email");
		}
		var at = email.indexOf("@");
		var dot = email.lastIndexOf(".");
			if(email != ""){
				if (at < 1 || ( dot - at < 2 ) ||/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)== false){
					error=1;
					$("#mailError").html("Please enter a valid email ID");
					 $("#mailError").css("margin-left", "230px");
				}
			 }
		var table=$('#dataTable');
		var index = $('#editState').val();
		for(var i=1;i<table.find('tr').length;i++){
			//to ignore the selected row while validating email during edit.
			if(index!="" && i == index) continue;		
			if($(table).find('tr:eq('+i+') td:eq(6)').text() == email){
					error=1;
					$("#mailError").html("Email already exists");
					$("#mailError").css("margin-left", "275px");
			}		
		}
		
		var pw = $('#pw').val();
		var pw_c = $('#pw_confirm').val();
		if (pw != pw_c) {
			error=1;
			$("#pwcError").html("Password mismatch");
		}
		
		if (pw == "" ) {
		   error=1;
		   $("#pwError").html("Please set a password");
		}
		if(error == 1){
			success.hide();  
			$(window).scrollTop(0);			
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
 * @param {string} first name
 * @param {string} last name 
 * @param {string} date of birth 
 * @param {string} email
 * @param {string} password
*/
	
	function showTableData(fname,lname,db,email,pw){
		$("#noData").hide();
		var gender = $("input[name='gender']:checked").val();
		var bGroup = $("#bGroup").val();
		var data = $("#showData");
		data.show();
		var table=$("#dataTable");
		var index=table.find('tr').length;
		table.append("<tr><td>" +index+ "</td><td>"+ fname+ "</td><td>" +lname+ "</td><td>" +db+ "</td><td>" +gender+ "</td><td>" +bGroup+ "</td><td>" +email+ "</td><td>" +pw+ "</td><td> <button class='btn' title='Delete' id='remove' onclick=removeRow(this)><i class='fa fa-trash'></i></button> <button class=\"btn \" title='Edit' onclick=editRow(this)><i class='fa fa-edit'></i> </button> </td></tr>");
		var msg ="Registered Successfully";
		var success = $("#success");
		success.html(msg);
		clearForm();
		success.show();
		$(window).scrollTop(1000);
	}
/**
 * Removes the selected row of data
 * 
 * @param {string} row
*/
	function removeRow(row) {
		$(row).parents("tr").remove();
		var msg ="Deleted Successfully";
		var success = $("#success");
		success.show();
		success.html(msg);
		clearErrors();
		if ($("#dataTable").find('tr').length == 1)
		{
			var info ="No Data Found";
			$("#noData").show();
			$("#noData").html(info);		  
		}
		$(window).scrollTop(1000);
	}
/**
 * Fills the form with the data of selected
 * 
 * @param {string} row
*/
	function editRow(index) {
		$(window).scrollTop(0);
		$("#success").hide();
		clearErrors();
		var row = $(index).parents("tr");
		var cols = row.children("td");
		$("#fname").val($(cols[1]).text());
		$("#lname").val($(cols[2]).text());
		$("#db").val($(cols[3]).text());
		if($(cols[4]).text() == 'female')
		{
			$('#female').prop('checked', true); 
		}
		else
		{
			$('#male').prop('checked', true);
		}
		$("#bGroup").val($(cols[5]).text());
		$("#email").val($(cols[6]).text());
		$("#pw").val($(cols[7]).text());
		$("#pw_confirm").val($(cols[7]).text());
		$("#submit").html("Update");
		$("#editState").val( $(cols[0]).text());
		
	}
/**
 * updates the values of the selected row in the table
 * 
*/
	function updateData() {
		var table=$("#dataTable");
		var index = $("#editState").val();
		var gender = $("input[name='gender']:checked").val();
		$(table).find('tr:eq('+index+') td:eq(1)').html($("#fname").val()) ;
		$(table).find('tr:eq('+index+') td:eq(2)').html($("#lname").val()) ;
		$(table).find('tr:eq('+index+') td:eq(3)').html($("#db").val()) ;
		$(table).find('tr:eq('+index+') td:eq(4)').html(gender) ;
		$(table).find('tr:eq('+index+') td:eq(5)').html($("#bGroup").val());
		$(table).find('tr:eq('+index+') td:eq(6)').html($("#email").val());
		$(table).find('tr:eq('+index+') td:eq(7)').html($("#pw").val()) ;
		window.scrollTo(0,document.body.scrollHeight);
		var msg ="Updated Successfully";
		$("#success").show();
		$("#success").html(msg);
		clearForm();
		$(window).scrollTop(1000);
	}
/**
 * clears the form, scrolls to the top of the window, hides the messages
 and resets the edit state.
 * 
*/	
	function clearForm()
	{	$('form')[0].reset();
		$(window).scrollTop(0);
		$("#submit").html("Register");
		$("#editState").val("");
		$("#success").hide();
		clearErrors();
	}
/**
 * Event that filters the table as per the value entered in the search bar
 * 
*/
$(document).ready(function(){
	$("#search").on("keyup", function() {
	$("#success").hide();
    var value = $(this).val().toLowerCase();
    $("#dataList tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
	
	$("#search").on({
		mouseenter: function(){
			$(this).css("background-color", "#cccccc");
		}, 
		mouseleave: function(){
			 $(this).css("background-color", "#ffffff");
		}
	});
	$("#fname").on("keyup", function() {
		$("#fError").html("");
		$("#lError").css("margin-left", "224px");
	});
	$("#lname").on("keyup", function() {
		$("#lError").html("");
	});
	$("#db").on("focus", function() {
		$("#dbError").html("");
	});
	$("#email").on("keyup", function() {
		$("#mailError").html("");
	});
	$("#pw").on("keyup", function() {
		$("#pwError").html("");
	});
	$("#pw_confirm").on("keyup", function() {
		$("#pwcError").html("");
	});
});
	function clearErrors()
	{	$("#pwcError").html("");
		$("#pwError").html("");
		$("#dbError").html("");
		$("#mailError").html("");
		$("#lError").html("");
		$("#fError").html("");
	}