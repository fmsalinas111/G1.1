<?php 
	class Conexion{
		private $conect;
		public function __construct(){
			$server = $_SERVER['SERVER_NAME'];
			if($server == "127.0.0.1" or $server == "localhost"){
			    $this->servidor 	= "localhost";
				$this->usuario 		= "root";
				$this->contrasena 	= "";
				$this->basedatos 	= DB_NAME;
			}else{
				$this->servidor     = "sv51.byethost51.org";  //$Host;
				$this->usuario     	= "gestion7";  //$User;
				$this->contrasena 	= "09-JBwJqG.r10p";  //$Password;
				$this->basedatos    = "gestion7_".DB_NAME;  //$Db;
			}			
			//$connectionString=mysql:host=".DB_HOST.";dbname=". DB_NAME.";.DB_CHARSET.";
			
			if (h($_SESSION['is_demo'],0) == 1) {$this->basedatos=$this->basedatos.'_demo';}
			$_SESSION['db'] = $this->basedatos;

			$connectionString = "mysql:host=".$this->servidor.";dbname=".$this->basedatos.";".DB_CHARSET.";";
			$this->basedatos;
			try{
				//$this->conect = new PDO($connectionString, DB_USER, DB_PASSWORD);
				//$this->conect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				$this->conect = new PDO($connectionString,$this->usuario,$this->contrasena);
				//echo("coneccion exitosa<br> server: $server<br> ".$this->basedatos.'<br>'.$_SESSION['is_demo']);
			}catch(Exeption $e){
				$this->conect = 'Error de conexion'; echo "error: ".$e->getMessage();
			}
		}
		public function conect(){return $this->conect;}
	}	
 ?>