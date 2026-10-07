<?php
	//if (session_status() == PHP_SESSION_NONE) session_start(); 
echo base_url();
if (!termux()){	
	if(session_status() !== PHP_SESSION_ACTIVE) session_start();
	$isLogged = (USR()>0)?'dash':'gen1_1';
	
	$app  = isset($_GET['app'])? intval($_GET['app']) :0; //get
	// $appId = APP();	
		echo $isLogged.'<br>';
		echo base_url();
		echo "tenant: ".TENANT_SLUG;
	header("Location:".base_url().$isLogged);
}
?>
<!DOCTYPE html>

<html>
<head>
  <meta http-equiv="CONTENT-TYPE" content="text/html; charset=UTF-8">
  <link rel="stylesheet" href="styles/style.css"/>
  <title>start!</title>
</head>
<body>
  <h1>
    main page trmx
  </h1>
  <a  href="login">iniciar sesión</a>
  <a href="gen1_1">gen1</a>
</body>
</html>

