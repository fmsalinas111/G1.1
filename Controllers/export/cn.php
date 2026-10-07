
<?php
if($_SERVER["SERVER_NAME"] == "127.0.0.1" or $_SERVER["SERVER_NAME"] == "localhost"){
	$mysqli=new mysqli("localhost","root","","sava"); 
}else{
	$mysqli=new mysqli("sql211.byethost.com","b13_25376445","Treeking2020","b13_25376445_dbsava"); 
}
	if(mysqli_connect_errno()){
		echo 'Conexion Fallida : ', mysqli_connect_error();
		exit();

	}else{
		//echo 'conexion exitosa';
	}

?>