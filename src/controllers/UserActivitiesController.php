<?php
/**
 * UserActivitiesController
 * class that manages all the operations related to users and activities.
 *
 */

namespace Src\Controllers;

class UserActivitiesController 
 { 
    private $class= 'FileMaker';
    private $common='Common';
    private $fmMethodsObj;
    private $id; 
	private $role;

    public function __construct(){
		
        include __DIR__ .'/../api/common.php';
        include __DIR__ .'/../api/FileMakerWrapper.php';
		$this->id= $_SESSION['id'];
        $this->role=$_SESSION['role'];
        $this->fmMethodsObj= new \FileMakerWrapper();
	}
    
    /**
	 * allUsers
     * fetches the information of all the users.
     *
     * returns json object
     */
	public function getAllUsers($request, $response)
	{
	    $result = $this->fmMethodsObj->getAll('USR'); 
        $records=$result['records'];
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
        //$result['users']=$users;
        $userInfo['msg']= $result['msg'];
        $userInfo['users']=$users;
        
	    header('Content-type: application/json');
	    echo json_encode($userInfo);
	}


	/**
	 * addActivity
     * adds an activity to the database
     *
     * returns {boolean value}
     */
	public function addActivity($request, $response)
	{
	    if($_POST['description']!='' && $_POST['user_id']!=''){

			$date = date("m-d-Y", strtotime($_POST['dueDate']));
	        $data = array(
	                    'description' =>$this->common::sanitize($_POST['description']),
	                    '__fk_user_id' => $this->common::sanitize($_POST['user_id']),
	                    'priority'=>$this->common::sanitize($_POST['priority']),
	                    'dueDate'=>$date
	                    );

	        $return=$this->fmMethodsObj::createRecord('activities',$data);

	        header('Content-type: application/json');
	        echo json_encode($return);
	    }
	    else
	        {   
                $return['msg']='Fill all the fields';
                header('Content-type: application/json');
                echo json_encode($return);
            }
	}


	/**
	 * getAllActivities
     * fetches all the activities
     *
     * returns {json object}
     */
	public function getAllActivities($request, $response)
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
        $result['msg']= $records['msg'];
	    if($records['records']!="")
	    {
            $records=$records['records'];
		    foreach ($records as $record) { 

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
        $result['activities'] = $activities;
		header('Content-type: application/json');
	    echo json_encode($result);
	}



}