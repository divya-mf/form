<?php
include("config.php");
		$fm=$fm;
$query = $fm->newFindAllCommand('activities'); 
        $result = $query->execute();
        $records = $result->getRecords();
        
        if (FileMaker::isError($records))
        {
            $records=[];
        } 
        print_r($records);
?>