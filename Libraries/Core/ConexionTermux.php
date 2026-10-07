
<?php 
#[AllowDynamicProperties]
	class Conexion{
		private $conect;
		public function __construct(){
			$server = $_SERVER['SERVER_NAME'];
			// para termux android:
			    $this->servidor 	= "127.0.0.1";
				$this->usuario 		= "root";
				$this->contrasena 	= "";
				$this->basedatos 	= DB_NAME;
			
			$connectionString = "mysql:host=".$this->servidor.";dbname=".$this->basedatos.";".DB_CHARSET.";";
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