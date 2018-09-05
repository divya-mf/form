<?php
/**
 * FileMakerWrapper
 * class that manages all the methods required to interact with database
 *
 */
class FileMakerWrapper{
	private $fm;

	/**
 	 * Constructor
 	 * includes the configuration file for database connectivity
 	 * initializes the private class variable with FileMaker object 
 	 */
	public function __construct(){
		
		$this->fm=include(__DIR__ .'/config.php'); //FileMaker connection object
	}

	/**
	 * getOne
     * finds and fetches the information as per given criteria.
     *
     * @param string $layout The FileMaker layout name.
     * @param string $field The FileMaker field name.
     * @param string $value The value that needs to be searched in the field.
     * returns {array}
     */
	public function getOne($layout, $field, $value)
	{
		$findCommand = $this->fm->newFindCommand($layout);
        $findCommand->addFindCriterion($field,$value);
        $result = $findCommand->execute();
        $records = $result->getRecords();
        $status['msg']=array('status'=> "Ok", 'code'=> 200);
        $status['records']=$records;
        if (FileMaker::isError($records))
        {   
            $status['msg']=array('status'=> $records->getMessage(), 'code'=> $records->code);
            $status['records']=[];
        }
        return $status;
    }

	/**
	 * getAll
     * finds and fetches all the information from given layout.
     *
     * @param string $layout The FileMaker layout name.
     * returns {array}
     */
	public function getAll($layout)
	{
		$query = $this->fm->newFindAllCommand($layout); 
        $result = $query->execute();
        $records = $result->getRecords();
        $status['records']=$records;
        $status['msg']=array('status'=> "Ok", 'code'=> 200);
        if (FileMaker::isError($records))
        {
            $status['msg']=array('status'=> $records->getMessage(), 'code'=> $records->code);
            $status['records']=[];
        } 
        return $status;
    } 


    /**
     * getSearchResult
     * finds and fetches all the information from given layout as per the search.
     *
     * @param string $layout The FileMaker layout name.
     * @param array $allANDs fields that needs AND operation
     * @param array $allORs fields that needs OR operation.
     * returns {array}
     */
    public function getSearchResult($layout,$allANDs,$allORs)
    {
        $findCommand = $this->fm->newCompoundFindCommand($layout);

        $i=1;

        foreach ($allORs as $key => $val) {

            ${'findRequest' . $i} = $this->fm->newFindRequest($layout);

            if($val!='')
            {
                ${'findRequest' . $i}->addFindCriterion($key, "*$val*");
            }
            
            foreach ($allANDs as $field => $value)
            {
                if($value!='')
                {
                    ${'findRequest' . $i}->addFindCriterion($field, "==$value");
                }
            }

            $findCommand->add($i, ${'findRequest' . $i});
            $i++;
        }

        $result = $findCommand->execute();

        if (FileMaker::isError($result))
        {
            $status['msg']=array('status'=> $result->getMessage(), 'code'=> $result->code);
            $status['records']=[];
        }
        else{
            $records = $result->getRecords(); 
            $status['records']=$records;
            $status['msg']=$records->code.'=> '.$records->getMessage();
            if (FileMaker::isError($records))
            {
                $status['msg']=array('status'=> $records->getMessage(), 'code'=> $records->code);
                $status['records']=[];
            }
        }

        return $status;
    }
    

	/**
	 * createRecord
     * creates/adds record to database.
     *
     * @param string $layout The FileMaker layout name.
     * @param string $data The data to insert in the database.
     * returns {boolean value}
     */
	public function createRecord($layout, $data)
	{
        $rec = $this->fm->createRecord($layout, $data);
        $result = $rec->commit();

       if (FileMaker::isError($result)) 
       {
        $status['msg']=$result->code.'=> '.$result->getMessage();
        $status['msg']='false';
        return $status;
       }

       return $status['msg']='true';
   }

   
   
}


?>