<?php if (session_status() == PHP_SESSION_NONE) session_start(); 
	class Companies extends Controllers {
	public function __construct(){parent:: __construct();}	

	public function companies(){
		$data['page_id'] 	= 3;
		$usr=h($_SESSION['userid'],0);
		$data['page_title'] = (intval($usr)<>-1)?'Empresas':'Galerías';
		$data['page_name'] 	= 'companies';
		$data['page_tag'] 	= 'Empresas <small>'.$_SESSION["company"].'</small>';
		$data['page_jquery'] = true; $data['page_datatable'] = true;

		$data['page_script'] = ($usr<>-1)?'``':'`<div class="col-md-2" id="isGalery" style="padding-top: 15px;">
            <div class="form-check">
              <label class="form-check-label" >
                <input type="checkbox" class="form-check-input" id="campo4" name="campo"><b>Galería</b>
              </label> </div> </div>`  ';
		$this->views->getView($this,$data['page_name'],$data);
	}

	public function getEmpresas(){
		$arrData = $this->model->selectEmpresas();
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE);	die();
	}

	public function establecerEmpresa(){
		//setear el campo projbyuser.lastCo
		$strCampo1 = strClean($_POST['campo1']);//coid
        $strCampo2 = strClean($_POST['campo2']); //usrid
        $strCampo3 = strClean($_POST['campo3']); //projid
        $strCampo4 = strClean($_POST['campo4']); //
        $prodConfig = strClean($_POST['campo6']); //
        $logo  = strClean($_POST['campo5']); 
        $coDes = strClean($_POST['campo7'],true); 
		$arrData = $this->model->establecerEmpresa($strCampo1, $strCampo2, $strCampo3);
		if (($arrData)) {
			$arrResponse = array('status'=>true, 'msg'=>'éxito');
			$_SESSION['company'] = $strCampo4;
			$_SESSION['idcompany'] = $strCampo1;
			$_SESSION['logo'] = $logo;
			$_SESSION['productconfig'] = $prodConfig;
			$_SESSION['companyDescription'] = $coDes;
		}else{
			$arrResponse = array('status'=>false, 'msg'=>'Error.');
		}
		echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);		die();
	}

	public function establecerLogo(){ //dep($_POST);
        $logo  = strClean($_POST['newLogo']); 
		$_SESSION['logo'] = $logo;
		echo json_encode(array('status'=>true, 'msg'=>'éxito','newLogo'=>$_SESSION['logo']),JSON_UNESCAPED_UNICODE);
		die();}

	public function getCompanyBySuar(int $id){ //clprname.js
		$intId = intval(strClean($id));
		if ($intId>0) {
			$arrData = $this->model->selectEmpresaBySuar($intId);
			if (empty($arrData)) {
				$arrResponse = array('status'=>false, 'msg'=>'Not found.');
			}else{
				$arrResponse = array('status'=>true, 'data'=>$arrData);
			}
			echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
		}
		die();
	}

	public function getCards($gallery){//dep($_POST);
		$gallery=($gallery=='gallery')?-99:intval($gallery);
		$arrData = $this->model->selectCards($gallery);
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE);		die();
	}

	

	public function getCardsByGallery($gallery){
		$arrData = $this->model->selCardsByGallery(intval($gallery));
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE);		die();
	}

	public function getPage($page){// is working?
		$arrData = $this->model->selPage($page);
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE);		die();
	}

	public function getMyBlines(){
		$arrData = $this->model->selMyBlines();
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE);		die();
		//echo analizeGet($this->model->selMyBlines());die();
	}
	public function getBlineBy(int $id){ 
		$intId = intval(strClean($id));
		echo analizeGet($this->model->selBlineBy($intId));die();
	}
	public function getBcardBy(int $id){
		$intId = intval(strClean($id));
		if ($intId>0) echo analizeGet($this->model->selectBcard($intId));die();
	}
	public function getBcard(){
		$arrData = $this->model->selectBcard(CO());
		if (empty($arrData)) {
			$arrResponse = array('status'=>false, 'msg'=>'Not found.');
		}else{
			$arrResponse = array('status'=>true, 'data'=>$arrData);
		}
		echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);die();
	}

    public function setCompanie(){ //dep($_POST);
        $campos	= json_decode($_POST['campos'],true);
        $intId 	= intval(strClean($campos['id']));

        $coName  = strClean($campos['campo1']);
        $descrip = strClean($campos['campo2'], true);
		$img 	 = strClean($campos['campo3']);
		$isGale  = intval(strClean(h($campos['campo4'])));
		$stt 	 = intval(strClean(h($campos['campo5'])));
		$city    = intval(strClean(h($campos['campo6'])));
		$request = $this->model->upd_sttBcard($intId,$stt);
		$request = $this->model->in_updEmpresa(
			$intId, $coName, $descrip, $img, $isGale, $city);
		$option = ($intId==0)?1:2;
        echo analizeSet($request, $option);	 die();
    }


	public function setBcard(){ //dep($_POST);
	    $intId  	= intval($_SESSION["idcompany"]);
	    $coName  	= strClean($_POST['campo1']);
	    $rubro		= intval  ($_POST["campo2"]);
	    $address 	= strClean($_POST['campo3'], true);
	    $twitter	= strClean($_POST["campo4"]);
	    $face 		= strClean($_POST['campo5']); 

	    $insta		= strClean($_POST['campo6']); 
	    $tel		= strClean($_POST['campo7']);
	    $wsp		= strClean($_POST['campo8']);
	    $web		= strClean($_POST['campo9']);
	    $email		= strClean($_POST['campo10']);
	    $stt		= intval  ($_POST['campo11']);
	    $notes		= strClean($_POST['campo12']);
		//$gallery	= (isset($_POST['gallery']))?intval($_POST['gallery']):0;
		$bline		= strClean($_POST['campo13']);
		$city		= intval  ($_POST['campo14']);
		$gallery	= (isset($_POST['campo15']))?intval($_POST['campo15']):0;
		$tiktok		= strClean($_POST['campo16']); 
		//echo 'gallery: '.$gallery;
	    if ($intId==0) { //crear
	        $request = $this->model->insertBcard($coName, $rubro, $address, $twitter, $face, $insta, $wsp, $web, $tel, $email, $stt, $notes, $gallery, $bline, $city, $tiktok); $option = 1;
	    }else{	            //actualizar
	        $request = $this->model->updateBcard($intId, $coName, $rubro, $address, $twitter, $face, $insta, $wsp, $web, $tel, $email, $stt, $notes, $gallery, $bline, $city, $tiktok); $option = 2;
	    }
	    echo analizeSet($request, $option);	die();
	}

	public function setBcard2(){ //dep($_POST);
		$campos     = json_decode($_POST['campos'],true);
        $intId  = intval(strClean($campos['id']));
        //if (!$this->verifyTkn(strClean($campos['tkn']))) {echo ':401<hr>'.$_SESSION['tkn'].'<hr>'.$campos['tkn']; exit();}

	    $coName  	= strClean($campos['campo1']);	    $rubro		= intval  ($campos["campo2"]);
	    $address 	= strClean($campos['campo3'], true);
	    $twitter	= strClean($campos["campo4"]);	    $face 		= strClean($campos['campo5']); 
	    $insta		= strClean($campos['campo6']);	    $tel		= strClean($campos['campo7']);
	    $wsp		= strClean($campos['campo8']);	    $web		= strClean($campos['campo9']);
	    $email		= strClean($campos['campo10']);	    $stt		= intval  ($campos['campo11']);
	    $notes		= strClean($campos['campo12']);		$bline		= strClean($campos['campo13']);
		$city		= intval  ($campos['campo14']);		$gallery	= (isset($campos['campo15']))?intval($campos['campo15']):0;
		$tiktok		= strClean($campos['campo16']);		$razon		= strClean($campos['campo21']);
		$cuit		= strClean($campos['campo22']);		$iva		= intval  ($campos['campo23']);
		$ingbrutos	= strClean($campos['campo24']);		$inicio		= strClean($campos['campo25']);
				
		$request = $this->model->updtBcard($coName, $rubro, $address, 
			$twitter, $face, $insta, $wsp, $web, $tel, $email, $stt, $notes, 
			$gallery, $bline, $city, $tiktok,$razon, $cuit, $iva, $ingbrutos, $inicio); 
		
	    echo analizeSet($request, 2);	die();
	}



    public function setLogo(){ //dep($_POST);
		//$campos  = json_decode($_POST['campos'],true);
		$intId = isset($_POST['id']) ? intval($_POST['id']) : 0;
      	$imageName = strClean($_POST['imgName']);
      	$request = $this->model->updateLogoCo($intId, $imageName);
      	$option = 2;
		echo analizeSet($request, $option);	die();	    
	}

    public function setLogoBCard(){  	//dep($_POST);
        $campos=(json_decode($_POST['campos'],true));
        $imageName = strClean($campos['campo1']);
      	$request = $this->model->updateLogoBCard($imageName);
		echo analizeSet($request, 2);	die();	    
	}

    public function setTemplate(){
    	$campos=(json_decode($_POST['campos'],true));
      	$template = strClean($campos['campo1']);
      	$request  = $this->model->updteTemplate($template);
		echo analizeSet($request, 2);	die();	    
	}


	public function verifyPagename(){
		$page = strClean($_POST['campo1']);
		$arrData = $this->model->verifyPagename($page);
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE);		die();
	}

    public function delEmpresa(){ //to del?
        if($_POST){
            $intIdrol = intval($_POST['idrol']);
            $requestDelete = $this->model->deleteRol($intIdrol);
            if($requestDelete == 'ok'){
                $arrResponse = array('status' => true, 'msg' => 'Se ha eliminado el rol');
            }else if($requestDelete == 'exist'){
                $arrResponse = array('status' => false, 'msg' => 'No es posible eliminar un Rol asociado a usuarios.');
            }else {
                $arrResponse = array('status' => false, 'msg' => 'Error al eliminar el Rol');
            } 
            echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
        } 
        die();
    }	 
//*************** */
} ?>