<?php
/**
 * FileMakerMethods
 * class that manages all the methods required to interact with database
 *
 */
class FileMakerMethods{
	private $fm;

	/**
 	 * Constructor
 	 * includes the configuration file for database connectivity
 	 * initializes the private class variable with FileMaker object 
 	 */
	public function __construct(){
		include("config.php");
		$this->fm=$fm; //FileMaker connection object
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
        if (FileMaker::isError($records))
        {
            $records=[];
        }
        return $records;
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

        if (FileMaker::isError($records))
        {
            $records=[];
        } 
        return $records;
	}


    /**
     * getAll
     * finds and fetches all the information from given layout.
     *
     * @param string $layout The FileMaker layout name.
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
            $records=[];
        }
        else{
            $records = $result->getRecords(); 

            if (FileMaker::isError($records))
            {
                $records=[];
            }
        }

        return $records;
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
	        return false;
    	}
    	
    	return true;
	}

}
$fmMethodsObj = new FileMakerMethods();
?>