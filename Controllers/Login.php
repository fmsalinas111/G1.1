<?php 
if (session_status() == PHP_SESSION_NONE) session_start(); 
class Login extends Controllers {
	public function __construct(){parent:: __construct();}   
	public function login(){
		$data['page_id'] = -1;
		$data['page_tag'] = 'Login';
		$data['page_title']= 'Login';
		$data['page_name'] = 'login';
		$this->views->getView($this,"login",$data);
	}

	public function loginUser(){		//dep($_POST);
		if ($_POST) {
			if (empty($_POST['usuario']) || empty($_POST['password'])) {
				$arrResponse =array('status'=>false,'msg'=>'Error');
			}else{
				$strUser  = strtolower(strClean($_POST['usuario']));
				$strPass = (strClean($_POST['password']));
				if ($strUser=='sinregistro') $_SESSION['is_demo'] = 1;
				//echo 'pepe:'.isset($_SESSION['is_demo']);
				//$strPassword = hash("SHA256",$_POST['txtPassword']);
				$strPassword = md5($strPass);
				$requestUser = $this->model->obtenerUsuario($strUser, $strPassword);
				if (empty($requestUser)) {
					$arrResponse = array('status'=>false,
							'msg'=>'Credenciales incorrectas',
							//'isDemo'=>$_SESSION['is_demo'],
							//'db'=>$_SESSION['db'],							
							);
				}else{
					$arrData = $requestUser;
					//print_r($arrData);
					if ($arrData['stt']==1) {
						$_SESSION['userid'] = $arrData['userid'];
						$_SESSION['username'] = $arrData['username'];
						$_SESSION['usremail'] = $arrData['email'];
						$_SESSION['login'] = true;
					  
						$_SESSION['app']= $arrData['uLastPr'];
						$_SESSION['appName']= $arrData['projName'];
						$_SESSION['suar'] = $arrData['suar'];
						$_SESSION['rid'] = $arrData['rid'];
						$_SESSION['rolName'] = $arrData['rolName'];
						$_SESSION['allowed'] = $arrData['allowed'];
						$_SESSION['modules'] = $arrData['mods'];

						//$companyUser = intval($arrData['companyuser']);
						//$lastProjid  = intval($arrData['lastprojid']);

						$_SESSION['idcompany']=$arrData['pbuLastCo'];
						$_SESSION['company']=$arrData['companyname'];
						$_SESSION['companyDescription']=$arrData['description'];
						$_SESSION['companyAddress']=$arrData['address'];
						$_SESSION['logo'] = $arrData['logo'];
					  	$_SESSION['productconfig'] =$arrData['productconfig'];
					  	$_SESSION['page']=$arrData['page'];
						$_SESSION['userData'] = $arrData;

						/*
						if ($companyUser>0) {//obtenerEmpresa si no es admin
							$_SESSION['idcompany']=$companyUser;
							$requestCo=$this->model->selectCompany($companyUser);
						}else{  //si es 0 o < 0
							$requestCo = $this->model->obtenerCo($lastProjid, intval( $arrData['userid']));
							//echo '0 o menor a cero -- '.$requestCo['companyid'];
							$_SESSION['idcompany']= $requestCo['coId'];
							$_SESSION['superusuario'] = true;
						}
						echo $companyUser.': ';
						print_r($requestCo);
						
						$_SESSION['showInactive'] = 0;
						$_SESSION['company']=$requestCo['companyname'];
						$_SESSION['companyDescription']=$requestCo['description'];
						$_SESSION['logo'] = $requestCo['companylogo'];
					  	$_SESSION['productconfig'] =$requestCo['productconfig'];
					  	$_SESSION['page']=$requestCo['page'];
						$_SESSION['userData'] = $arrData;
						*/
						$arrResponse=array(
							'status'=>true,'msg'=>'ok', 
							'app'=>$_SESSION['app'],
							'iCo'=>$_SESSION['idcompany'],
							'page'=>$_SESSION['page'],
							'usrName'=>$_SESSION['username'],
							'login'=>$_SESSION['login'],
							//'isDemo'=>$_SESSION['is_demo'],
							//'db'=>$_SESSION['db'],
						);
					}else{
						$arrResponse=array('status'=>false,'msg'=>'Inactivo');
					}
				}
			}
			echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
		}
		die();
	}
	
}?>