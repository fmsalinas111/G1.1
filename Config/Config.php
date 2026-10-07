<?php

	if (in_array($_SERVER["SERVER_NAME"] , 
		['0.0.0.0', '127.0.0.1', 'localhost'])){
    	require_once("ConfigLocal.php");
	}else{ 
		require_once("ConfigServer.php");
	}

?>
