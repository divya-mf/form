<?php
/**
 * UserActivitiesController
 * class that manages all the operations related to users and activities.
 *
 */

namespace Src\Controllers;

class UserActivitiesController extends Controller
 { 
    private $fmMethodsObj;
    private $id; 
	private $role;

    public function __construct($container){
        //include __DIR__ .'/../api/FileMakerWrapper.php';
		$this->id= $_SESSION['id'];
        $this->role=$_SESSION['role'];
        $this->fmMethodsObj= $container->get('FileMakerWrapper');
	}
    
    /**
	 * getAllUsers
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
        $userInfo['msg']= $result['msg'];
        $userInfo['users']=$users;
        
        return $response->withStatus(200)
                        ->withHeader('Content-Type', 'application/json')
                        ->write(json_encode($userInfo));
	}


	/**
	 * addActivity
     * adds an activity to the database
     *
     * returns {json object}
     */
	public function addActivity($request, $response)
	{
	    if($request->getParsedBody()['description']!='' && $request->getParsedBody()['user_id']!=''){

			$date = date("m-d-Y", strtotime($request->getParsedBody()['dueDate']));
	        $activityDetails = array(
	                    'description' =>$request->getParsedBody()['description'],
	                    '__fk_user_id' =>$request->getParsedBody()['user_id'],
	                    'priority'=>$request->getParsedBody()['priority'],
	                    'dueDate'=>$date
	                    );

	        $result=$this->fmMethodsObj->createRecord('activities',$activityDetails);

	        return $response->withStatus(200)
                            ->withHeader('Content-Type', 'application/json')
                            ->write(json_encode("Activity added successfully"));
	    }
	    else
	        {   
				$res = array('status'=> "BAD REQUEST", 'code'=> 400,'description'=>"Fill in all the fields");
				
           		 return $response->withStatus(400)
                            	 ->withHeader('Content-Type', 'application/json')
                            	 ->write(json_encode($res));
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
		
		if(isset($request->getParsedBody()['allANDs']) || isset($request->getParsedBody()['allORs'])){
			$allANDs=$request->getParsedBody()['allANDs'];
			$allORs=$request->getParsedBody()['allORs'];
		}
	    if($this->role=='admin')
	    {
	    	if(isset($allANDs) || isset($allORs))
	    	{
	          $records = $this->fmMethodsObj->getSearchResult('activities',$allANDs,$allORs);
	        }
	        else
	        {
	        	$records = $this->fmMethodsObj->getAll('activities');
	    	}
	    }
	    else
	    {
	    	if(isset($allANDs)|| isset($allORs))
	    	{
	          array_push($allANDs,['__fk_user_id'=>$this->id]);

	          $records = $this->fmMethodsObj->getSearchResult('activities',$allANDs,$allORs);
	        }
	        else
	        {
	        	$records = $this->fmMethodsObj->getOne('activities','__fk_user_id',$this->id);
	        }
	    }

	    $i=0;
        
	    if(!empty($records['records']))
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

            return $response->withStatus(200)
                            ->withHeader('Content-Type', 'application/json')
                            ->write(json_encode($activities));
        }
        
	}



}