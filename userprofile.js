/**
 * @userprofile.js
 * Provides different operations related to user profile
 *
 * handles different events fired from the profile by the user
 */
 


var userModule = (function () {

	function myFunction() {
    $("#myDropdown").toggleClass("show");
}

/**
 * FilterFunction
 * filters the list as per the value entered in search field
 * 
 * @returns {list}
*/
function filterFunction() {
    var input, filter, ul, li, a, i;
    input = $("#myInput");
    filter = input.value.toUpperCase();
    div = $("#myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}


/**
 * showUser
 * Displays the details of the selected user
 * @param {int} uid -user id of the selected user.
 * @returns {list}
*/
function showUser(uid){
	$("#userDetails").hide();
 $.ajax({

            url: getBaseUrl()+"operations.php",
            type: "POST",
            data: {"uid": uid},
            
            success: function(data) {
              
                 $("#userDetails").show();   
                 $("#all").html(data);
            },
            error:function(data)
		  {
		  	alert("error");
		  }
      }); 

}

/**
 * getBaseUrl
 * captures the base url.
 * 
 * @returns {url}
*/
function getBaseUrl() {
	var re = new RegExp(/^.*\//);
	return re.exec(window.location.href);
}

/**
 * save
 * updates the edited information
 * @param {int} id -user id of the logged in user
 * @returns {boolean value}
*/
function save(id){
			var id =id;
			var fname=$("#fname").val();
			var lname=$("#lname").val();
			var email=$("#email").val();
			var db=$("#db").val();
			var bGroup=$("#bGroup").val();
			var gender=$("input[name='gender']:checked").val();
			var save=$("#save").val();
			var url=getBaseUrl();
			$.ajax({
            url: url+"operations.php",
            type: "POST",
            data: {
              "id": id,
			  "fname": fname,
			  "lname" :lname,
			  "db"	: db,
			  "email" :email,
			  "gender" :gender,
			  "blood_group" :bGroup,
			  "save":save
			},
            
            success: function(data) {
              
              location.reload();
              $('#msg').html(data)
            },
            error:function(data)
		  {
		  	console.log("error");
		  }
      }); 
    

}
/**
 * deleteUser
 * deletes the information of the selected user.
 * 
 * @returns {boolean value}
*/
function deleteUser(){
			var id =$("#user_id").val();
			var url=getBaseUrl();
			$.ajax({
            url: url+"operations.php",
            type: "POST",
            data: {
              "id": id,
			  "delete":"delete"
			},
            
            success: function(data) {
              
              location.reload();
              $('#msg').html(data)
            },
            error:function(data)
		  {
		  	console.log("error");
		  }
      }); 
    

}


/**
 * edit
 * event that is fired when edit button is clicked.
 * 
 * @returns {change in view}
*/
function edit()
{
	$("#details").hide();
	$("#editDetails").show();
}

/**
 * getAllUsers
 * function that does ajax call and fetch all users.
 * 
 * @returns {array}
*/
function getAllUsers()
{
  var users=[];
  $.ajax({
            url: getBaseUrl()+"operations.php",
            type: "POST",
            data: {
              "allUsers": "allUsers",
          },
            success: function(data) {
              users=JSON.parse(data);
              $.each( users, function( index, value ) {
              $("#usersList").append('<a onclick="userModule.showUser('+users[index].id+')">'+
               users[index].first_name+' ' +users[index].last_name+'</a>')
              });
            
            },
            error:function(data)
      {
        $("#msg").html("error");
      }
      });
}

/**
 * loggedUser
 * function that does ajax call and fetch details of logged in user.
 * 
 * @returns {array}
*/
function loggedUser(){
  var details;
 $.ajax({
            url: getBaseUrl()+"operations.php",
            type: "POST",
            data: {
              "userLogin": "userLogin",
      },
            
            success: function(data) {
              details=JSON.parse(data);
             $(".frst").html(details.first_name);
             $("#lst").html(details.last_name);
             $("#bd").html(details.birth_date);
             $("#em").html(details.email_id);
             $("#bg").html(details.blood_group);
             $("#gen").html(details.gender);
             if(details.type=='admin')
              $("#del").show();
            },
            error:function(data)
      {
        console.log("error");
      }
      });
}
/**
 * init
 * function that is being called at the time of loading file.
 * 
 * @returns {boolean value}
*/
function init(){

 getAllUsers();
 loggedUser();

}

return{
		edit:edit,
		save:save,
		deleteUser:deleteUser,
		showUser: showUser,
		filterFunction:filterFunction,
		myFunction : myFunction,
    getAllUsers:getAllUsers,
    loggedUser:loggedUser,
		init:init
	}

})();