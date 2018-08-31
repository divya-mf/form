<?php
/**
 * ActivityFunctions
 * class that manages all the functions required to handle ajax requests
 *
 */
class ActivityFunctions{

	private $id; 
	private $role;
	private $fmMethodsObj;


	/**
 	 * Constructor
 	 * includes the configuration file for database connectivity and FileMaker essentials
 	 * initializes the private class variables
 	 */
	public function __construct($id,$role){
		include("common.php");
		include("fileMakerMethods.php");
		$this->fmMethodsObj= $fmMethodsObj; //object of fileMakermethods class.
		$this->id= $id;
		$this->role=$role;
	}

	
	/**
	 * allUsers
     * fetches the information of all the users.
     *
     * returns json object
     */
	public function getAllUsers()
	{
	    $records = $this->fmMethodsObj->getAll('USR'); 

	    $users=array();
	    $i=0;
	    foreach ($records as $record) { 
	    	$users[] = array(
	    	);
	        $users[$i]['id']=$record->getField('id');
	        $users[$i]['first_name']=$record->getField('firstName');
	        $users[$i]['last_name']=$record->getField('lastName');

	        $i++;
	    }

	    echo json_encode($users);
	}


	/**
	 * addActivity
     * adds an activity to the database
     *
     * returns {boolean value}
     */
	public function addActivity()
	{
	    if($_POST['description']!='' && $_POST['user_id']!=''){

			$date = date("m-d-Y", strtotime($_POST['dueDate']));
	        $data = array(
	                    'description' =>sanitize($_POST['description']),
	                    '__fk_user_id' => sanitize($_POST['user_id']),
	                    'priority'=>sanitize($_POST['priority']),
	                    'dueDate'=>$date
	                    );

	        $return=$this->fmMethodsObj->createRecord('activities',$data);

	        echo json_encode($return);
	    }
	    else
	        echo json_encode("false");
	}


	/**
	 * getAllActivities
     * fetches all the activities
     *
     * returns {json object}
     */
	public function getAllActivities()
	{
	    $activities=array();
	        
	    if($this->role=='admin')
	    {
	    	if(isset($_POST['allANDs'])|| isset($_POST['allORs']))
	    	{
	          $allANDs=$_POST['allANDs'];
	          $allORs=$_POST['allORs'];

	          $records = $this->fmMethodsObj->getSearchResult('activities',$allANDs,$allORs);
	        }
	        else
	        {
	        	$records = $this->fmMethodsObj->getAll('activities');
	    	}
	    }
	    else
	    {
	    	if(isset($_POST['allANDs'])|| isset($_POST['allORs']))
	    	{
	          $allANDs=$_POST['allANDs'];
	          $allORs=$_POST['allORs'];

	          array_push($allANDs,['__fk_user_id'=>$this->id]);

	          $records = $this->fmMethodsObj->getSearchResult('activities',$allANDs,$allORs);
	        }
	        else
	        {
	        	$records = $this->fmMethodsObj->getOne('activities','__fk_user_id',$this->id);
	        }
	    }

	    $i=0;

	    if($records!="")
	    {
		    foreach ($records as $record) { 
		        $uid=$record->getField('__fk_user_id');
		        $res = $this->fmMethodsObj->getOne('USR','id',$uid);

		        $activities[$i]['id']=$record->getField('id');
		        $activities[$i]['description']=$record->getField('description');
		        $activities[$i]['status']=$record->getField('status');
		        $activities[$i]['user_id']=$record->getField('USR::fullName');
		        $activities[$i]['priority']=$record->getField('priority');
		        $activities[$i]['creationDate']=$record->getField('createdDate');
		        $activities[$i]['dueDate']=$record->getField('dueDate');

		        $i++;
		    }
		}
	    echo json_encode($activities);
	}

}

$functionsObj = new ActivityFunctions($_SESSION['id'],$_SESSION['role']);

?>