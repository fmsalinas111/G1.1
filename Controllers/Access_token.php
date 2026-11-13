<?php 
if (session_status() == PHP_SESSION_NONE) session_start(); 
class Access_token extends Controllers {
	public function __construct(){parent:: __construct();}	

	public function access_token(){
   		session_destroy(); //why? because we want to ensure no previous session data is carried over
		$data['page_tag'] = 'Access_token';
		$data['page_title'] = 'Token access';
		$data['page_name'] = 'access_token';
		$this->views->getView($this,"access_token",$data);
	}		

	public function verifyToken(){ //dep($_POST);
		session_destroy(); //cierra sesiones
		$token=strClean($_POST['token']); $type=strClean($_POST['type']);

		$arrData = $this->model->verificarToken($token, $type);
		if(empty($arrData)) $arrResponse=array('status'=>false,'msg'=>'Empty');
		else {
			if ($type==='1') { //Ctactes
				$cli = $arrData['cli'];
				$cName = $this->model->selSuty($cli);
				$clName = $cName["clName($cli)"];
				//die();
				//$cName = $cName[0];
				$arrData = $this->model->selectCtactes($arrData['cli']);
				$arrResponse = array('status'=>true, 'data'=>$arrData, 'clientName'=>$clName);	 
				//echo json_encode($arrData,JSON_UNESCAPED_UNICODE);	
				//die();
			}else{
				$arrResponse = array('status'=>true, 'data'=>$arrData);	 
			}
		}
		echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
	}

	public function setMicrosite(){ //dep($_POST);
		$nomUsuario = strClean($_POST['campo1']); $pass = md5(strClean($_POST['campo2']));
		$page = strClean($_POST['campo3']);  $tkn = strClean($_POST['tkn']);
		$compId = isset($_POST['coId']) ? intval($_POST['coId']) : 0;
		$uId = isset($_POST['uId'])  ? intval($_POST['uId'])  : 0;
	    $request=$this->model->updatePage($compId, $page, $nomUsuario, $pass, $uId,$tkn);
    	$option = 2; echo analizeSet($request, $option);	die();
   	}
	public function setNewPwd(){//dep($_POST);
		$tkn = strClean($_POST['tkn']);		$pass = md5(strClean($_POST['campo2']));
	    $request=$this->model->updatePass($tkn, $pass);
    	$option = 2; echo analizeSet($request, $option);	die();
   	}

	public function getToken(){//dep($_POST);
		$tkn = token();		$_SESSION['tkn'] = $tkn;
		$arrResponse = array('status'=>true, 'data'=>$tkn);
		echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
   	}
   	
	public function setToken(){//dep($_POST);
		//$tkn = strClean($_POST['tkn']);
		$clid 	= isset($_POST['campo2']) ? intval($_POST['campo2']): 0;
	    $request= ($this->model->insertMicrosite($clid));
		$option = 1; echo analizeSet($request, $option);die();
		return json_encode(token(),JSON_UNESCAPED_UNICODE);
   	}

	public function passRecovery(){//dep($_POST);
        $campos = json_decode($_POST['campos'],true);
        $intId  = intval(strClean($campos['id']));
        $token=token();
        $request=$this->model->gToken($intId, $token, 0, 0);
        if ($request>0) $request=$token;
		$option = 1; echo analizeSet($request, $option);	die();
   	}

	public function createTkn(){//dep($_POST);
        $campos=json_decode($_POST['campos'],true);
		
        $intId = intval(strClean($campos['id'])); $client= intval(strClean($campos['clid']));
		$iType = intval(strClean(h($campos['type'],0)));

        $token = token();
        $request=$this->model->gToken($intId, $token, $client, $iType);
        if ($request>0) $request=$token;
		$option = 1; echo analizeSet($request, $option);	die();
   	}


}?>