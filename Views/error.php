<?php 
	$texto= (!isset($data['page_content']))?'Página no encontrada':$data['page_content'];
	//$texto= (!isset($_SESSION['err_content']))?'404':$_SESSION['err_content'];
	//$_SESSION['err_content']='';
	if (USR()>0) echo 'sesión: iniciada' ;
	//	if ($_SESSION['login']) $texto= 'para crear su web click <a href="misdatos">acá</a>';
 ?>
<!DOCTYPE html>
<html>
<head>
	<title> Gestionando</title>
</head>
<body>
	<h1><?=$texto; ?></h1>
	<h2>Acceso denegado</h2>
	<script>
		//console.log(localStorage.logged)
	</script>
</body>
</html>