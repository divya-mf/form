<?php
/**
 * AuthController
 * class that manages all the login and registration of the user.
 *
 */

namespace Src\Controllers;

class AuthController extends Controller
 { 
    private $class;
    private $fmMethodsObj;
    private $log;

    public function __construct( $container)
    {
        $this->fmMethodsObj = $container->get('FileMakerWrapper'); //FileMaker connection object
        $this->log = $container->get('logger');
        $this->class = $container->get('Constants')->fileMaker;
	}
    
    /**
	 * signUp
     * registers user
     *
     * returns {json object}
     */
    public function signUp($request, $response)
    {
        $email = $request->getParsedBody()['email'];
        //array to store the values to pass into the database
        
        $userDetails = array(
                    'firstName' => $request->getParsedBody()['fname'],
                    'lastName' => $request->getParsedBody()['lname'],
                    'email' => $email,
                    'password' => $request->getParsedBody()['password']
                );
        $checkEmail = array(
                    'email'=> $email
                );
        $result=$this->fmMethodsObj->getOne('USR',$checkEmail);
       

        //to check if there are no records with similar email id.
        if (empty ($result['records'])) 
        {
            $newUser = $this->fmMethodsObj->createRecord('USR', $userDetails);

            $res = array('description'=>"registered successfully");  
            $http_status_code = 200;                
        }
        else
        { 
            $res = array('description'=>"email alreadyy exists");
            $http_status_code = 400;        
        }

        return $response->withJson($res)
                        ->withStatus($http_status_code);
      
    
    }

    /**
	 * login
     * user authentication for login
     *
     * returns {json object}
     */
    public function login($request, $response)
    {
        $email = $request->getParsedBody()['email'];
        $pw = $request->getParsedBody()['pw'];

        $loginData = array(
                'email'=> $email,
                'password'=>$pw
        );
        $result = $this->fmMethodsObj->getOne('USR',$loginData);

        if (empty ($result['records']) )
        { 
            $res = array('status'=> "BAD REQUEST", 'code'=> 400,'description'=>"incorrect credentials");
            return $response->withStatus(400)
                            ->withHeader('Content-Type', 'application/json')
                            ->write(json_encode($res));
        }
        else
        {
            $_SESSION['id'] = $result['records'][0]->getField('id');
            $_SESSION['role'] = $result['records'][0]->getField('role');

            $res = array('status'=> "Ok", 'code'=> 200,'description'=>"login successful");

            return $response->withStatus(200)
                            ->withHeader('Content-Type', 'application/json')
                            ->write(json_encode($res));
        }

       
    }


}