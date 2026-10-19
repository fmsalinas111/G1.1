<?php if (session_status() == PHP_SESSION_NONE) session_start(); 
class Usuarios extends Controllers {
	public function __construct(){parent:: __construct();}	
	public function usuarios(){
		$data['page_id'] 	= 6;
		$data['page_title'] = 'Usuarios - Usuario';
		$data['page_name'] 	= 'usuarios';
		$data['page_tag'] 	= 'Usuario Usuario <small>'.$_SESSION["company"].'</small>';
        $data['page_jquery'] = true; $data['page_datatable'] = true;
		$this->views->getView($this,"usuarios",$data);
	}

	public function getUsuarios(){
		$arrData = $this->model->selectUsuarios();
        //print_r($arrData);
/*		 for ($i=0; $i < count($arrData); $i++){
			 if ($arrData[$i]['estado']==1) {
			  $arrData[$i]['estado'] = '<span class = "badge badge-success">Activo</span>';
			 }else{
			  $arrData[$i]['estado'] = '<span class = "badge badge-danger">Inactivo</span>';
			}
		 }
*/		echo json_encode($arrData,JSON_UNESCAPED_UNICODE);die();
	}


	public function getUsuario(int $id){
		$intId = intval(strClean($id));
		if ($intId>0) {
			$arrData = $this->model->selectUsuario($intId);
			if (empty($arrData)) {
				$arrResponse = array('status'=>false, 'msg'=>'Datos no encontrados.');
			}else{
				$arrResponse = array('status'=>true, 'data'=>$arrData);
			}
			echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
		}
		die();
	}

    public function setUsuario(){    	//dep($_POST);
        $campos	 = json_decode($_POST['campos'],true);
        $intId   = intval(strClean($campos['id']));
        
        $uname = strClean($campos['campo1']);	
        $mail  = strClean($campos['campo2']); 	//email
        $cell  = strClean($campos['campo3']); 	//cell
        $stt   = strClean($campos['campo4']); //status
        $intRol = intval(strClean($campos['campo5']));

        if ($intId==0) { //crear
            $request_rol = $this->model->insertUsuario($uname, $mail, $cell, $stt, $intRol);            $option = 1;
        }else{	            //actualizar
            $request_rol = $this->model->updateUsuario($intId, $uname, $mail, $cell, $stt, $intRol);            $option = 2;
        }
        if ($request_rol>0) {
            if ($option==1)  {
                $arrResponse = array ('status' => true, 'msg'=>'Datos Guardados Correctamente');
            }else{
                $arrResponse = array ('status' => true, 'msg'=>'Datos Actualizados Correctamente');
            }
        }else if( $request_rol=='exist'){
        	$arrResponse = array('status' => false,'msg' =>'ya existe! ');
       	}else{
        	$arrResponse= array("status"=> false,'msg'=>'No es posible almacenar.');
       	}
        echo json_encode($arrResponse,JSON_UNESCAPED_UNICODE);
        die(); //detiene el proceso  
    }

    public function registrar(){//dep($_POST);
        //echo saca_dominio(server(),7)==='gestion'; 
        $name = strClean($_POST['usuario']);
        $email = strClean($_POST['email']); 
        $pass = strClean($_POST['password']); 
        $cell = strClean($_POST['cell']); 
        $gallery = intval(strClean(h($_POST['gallery'],0)));

        $app   = intval(strClean(h($_POST['app'],saca_dominio(server(),7)==='gestion'?5:11))); //app
        //$intApp = strClean($_POST['app']); //cell
        //definir la app por defecto: 5, 11, klk?
        //$intApp = ($gallery<0)? 11: h($_SESSION['app'],5); //app
        //echo 'gallery: '.$intApp.'<br>tienda: '.h($_POST['tienda']);
        $tienda =h($_POST['tienda'],''); 
        //debe habilitarse esta linea, dependiendo de un  plan premium
        //$intCampo5 = ($_SESSION['app']==1)?5: $_SESSION['app']; //app
        //echo 'app: '.$intApp;
        //bitac: si no pasa el strClean, mostrar el rechazo del servidor

        $request = $this->model->registrarUsuario($name, $email, $pass, $cell, $app, $gallery, $tienda);
        $option = 1; 
        echo analizeSet($request, $option); die();
    }

    public function delRol(){
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

    public function csu($projid){
    	$intProjid = intval(strClean($projid));
    	if ($intProjid==0) {
    		echo "Error: parameter not found";
    		exit();
    	}
      if (isset($_SESSION['login'])) {
        if ($_SESSION['userid']==-1) {
          echo 'SU '.$_SESSION['userid'].'</br>';
        $request = $this->model->cad($intProjid);
        }else{ echo 'forbidden'; exit(); }
      }else{// sin log
      	$request = $this->model->csu();
      }      
      echo "request:".$request;
    	die(); //detiene el proceso  
    }

	public function contUsuarios($name, $pass){
        $arrData = $this->model->countUser($name, $pass);
		echo json_encode($arrData,JSON_UNESCAPED_UNICODE);die();
	}

} ?>