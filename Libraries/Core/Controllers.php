<?php 
  #[AllowDynamicProperties]
	class Controllers{
		public function __construct(){
			$this->views = new Views();
			$this->loadModel();
		}

		public function loadModel(){
			$model = "M_".get_class($this);
			$routClass = "Models/$model.php";
			//echo "routClass: $routClass".'<br>';
			if (file_exists($routClass)) {
				require_once($routClass);
				$this->model = new $model();
			}else{
			//	echo "no model";
			}
		}

		public function verifyTkn($tkn){
			return ($tkn==h($_SESSION['tkn']));
		}

	}
?>
