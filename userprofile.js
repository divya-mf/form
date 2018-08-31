/**
 * @userprofile.js
 * Provides different operations related to user profile
 *
 * handles different events fired from the profile by the user
 */
 

var userModule = (function () {
  var $usersList=$("#usersList"),
      $users=$("#users");

 
 /**
  * search
  * toggles the display of dropdown content in search users
  * 
  * @returns {list}
  */
	function search() {
    $users.toggleClass("show");
  }


  /**
   * FilterFunction
   * filters the list as per the value entered in search field
   * 
   * @returns {list}
  */
  function filterFunction() {
      var input, filter, ul, li, a, i;
      
      input = $("#srch");
      filter = input.val().toUpperCase();
      div = $users;
      a = div.find("a");

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
    $.ajax({
            url: getBaseUrl()+"operations.php",
            type: "POST",
            data: {"uid": uid},
            
            success: function(data) {
              $("#userDetails").show();
              $("#del").show();   
              $("#all").html(data);
            },
            error:function(data)
      		  {
      		  	alert("error");
      		  }
          }); 
  }

  

  /**
   * save
   * updates the edited information
   * @param {int} id -user id of the logged in user
   * @returns {boolean value}
  */
  function save(){
  			var id =id;
  			var fname=$("#frst1").val();
  			var lname=$("#lst1").val();
  			var email=$("#em1").val();
  			var url=getBaseUrl();

  			$.ajax({
                url: url+"operations.php",
                type: "POST",
                data: {
                      "id": id,
              			  "fname": fname,
              			  "lname" :lname,
              			  "email" :email,
              			  "save":save
              			},
                
                success: function(data) {
                  
                  location.reload();
                  $('#msg').html(data)
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
  			var uid =$("#user_id").val();
  			var url=getBaseUrl();
  			$.ajax({
                url: url+"operations.php",
                type: "POST",
                data: {
                      "uid": uid,
        			        "delete":"delete"
    			           },   
                success: function(data)
                {
                  $('#msg').html(data);
                  $("#userDetails").hide();
                  getAllUsers();

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
    $("#frst1").val($(".frst").html());
    $("#lst1").val($(".lst").html());
    $("#em1").val($(".em").html());
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
    $usersList.html(" ");

    $.ajax({
            url: getBaseUrl()+"operations.php",
            type: "POST",
            data: {
                    "allUsers": "allUsers",
                  },
            success: function(data)
            {
              users=JSON.parse(data);
              $.each( users, function( index, value ) {
                $usersList.append('<a onclick="userModule.showUser('+users[index].id+')">'+
                 users[index].first_name+' ' +users[index].last_name+'</a>')
              });
              
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
              success: function(data)
              {
                 details=JSON.parse(data);

                 $(".frst").html(details.first_name);
                 $(".lst").html(details.last_name);
                 $(".em").html(details.email);

                 if(details.role=="admin")
                 {
                   $(".dropdown").css('display', 'inline-block');
                 }
              }
           });
  }


  /**
   * closeModal
   * event that is fired when close button is clicked in the user details modal.
   * 
   * @returns {change in view}
  */
  function closeModal()
  {
    $("#userDetails").hide();   
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
      closeModal:closeModal,
  		filterFunction:filterFunction,
  		search : search,
  		init:init
  	}

})();