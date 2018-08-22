


var userModule = (function () {

	function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

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
function getBaseUrl() {
	var re = new RegExp(/^.*\//);
	return re.exec(window.location.href);
}
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
function edit()
{
	$("#details").hide();
	$("#editDetails").show();
}

return{
		edit:edit,
		save:save,
		deleteUser:deleteUser,
		showUser: showUser,
		filterFunction:filterFunction,
		myFunction : myFunction
	}

})();