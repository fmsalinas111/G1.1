<?php 
class M_Usuarios extends Mysql{
	public function __construct()	{		 parent::__construct(); 	}

  	public function selectUsuarios()	{
      $idco= $_SESSION['idcompany'];
  		$sql = "SELECT userid AS uid, `username` AS name, email AS mail, 
        `status` AS estado, cell, rol as rid,
        if(LENGTH(`password`)<10,CONCAT_WS(' ',dataname,'<mark>(sin acceso)</mark>'),dataname) as rolName
        FROM ms_users
        LEFT JOIN ms_data ROL ON ROL.dataid=rol WHERE companyuser = $idco";
          //echo $sql;
  		return $this->select_all($sql);
  	}	
 
    public function selectUsuario(int $id){
      $this->intId = $id;
      $sql = "SELECT * FROM ms_users WHERE userid = $this->intId";
      $request = $this->select($sql);
      return $request;
    }

    public function insertUsuario(string $campo1 , string $campo2, string $campo3 , int $campo4, $rol){
      $this->strCampo1 = $campo1;       //username
      $this->strCampo2 = $campo2;       //email
      $this->strCampo3 = $campo3;// md5($campo3);  //pass
      $this->intCampo4 = $campo4;       //cell
      $this->intRol = $rol;
      $this->intProjId = $_SESSION['app'];  //
      $this->intCompany = $_SESSION["idcompany"];  //
      $sql = "SELECT * FROM  ms_users WHERE username ='{$this->strCampo1}' and companyuser ='$this->intCompany'"; // verifica si existe en la company
      $request = $this->select_all($sql); 
      if (sizeof($request)>0) return -2;
      $sql ="INSERT INTO ms_users (username, email, cell, status, lastprojid, companyuser, rol) 
      VALUES(?,?,?, ?,?,?,?)";
      $arrData=array($this->strCampo1, $this->strCampo2, $this->strCampo3, $this->intCampo4, $this->intProjId, $this->intCompany, $this->intRol); 
      return $this->insert($sql, $arrData);
    }
      
    public function updateUsuario(int $id, string $campo1 , string $campo2, string $campo3 , string $campo4, $rol){
        $this->intId = $id;
        $this->strCampo1 = $campo1;
        $this->strCampo2 = $campo2;
        $this->strCampo3 = $campo3;//md5($campo3);
        $this->strCampo4 = $campo4;
        $this->intRol = $rol;
        $this->intCompany = $_SESSION["idcompany"];

          $sql = "UPDATE ms_users SET username =?, email =?, cell =?, status =? , rol=?
          WHERE userid = $this->intId";
          $arrData = array($this->strCampo1, $this->strCampo2, $this->strCampo3, $this->strCampo4, $this->intRol);
          $request = $this->update($sql, $arrData);
        return $request;
    }


      public function deleteUser(int $id){
      	$this->intId = $id;
      	$sql = "SELECT * from ms_users WHERE userid = $this->intId";
      	$request = $this->select_all($sql);
      	if (empty($request)) {
      		$sql = "UPDATE ms_users SET status = ? WHERE userid = $this->intId";
      		$arrData = array(0);
      		$request = $this->update($sql,$arrData);
      		if ($request) {
      			$request = 'ok';
      		}else{
      			$request = 'error';
      		}
      	}else{
      		$request = 'exist';
      	}
      	return $request;
      }


  public function registrarUsuario(string $name , string $email, string $pass, string $cell, 
                                  int $app, int $gallery, string $tienda){

      $this->Username  = $name;   $this->Email = $email;
      $this->Pass = md5($pass);   $this->Cell = $cell;
      $this->intStatus = 1;         $this->intProjId = $app; //App
      $this->Gallery = $gallery;
      $this->Tienda = (strlen($tienda)==0)? 'Mi empresa': $tienda;
      $page = ($this->Tienda=='Mi empresa') ? null: $this->Tienda;
      $tipoPrimerClPrPaMe = 1;
      //echo 'tienda: '.$tienda.'<br>';
      //echo 'page: '.$page;

      # es posible que necesite validar el username...
      $sql = "SELECT count(userid) as count FROM  ms_users WHERE username ='{$this->Username}' and password ='{$this->Pass}'" ;      
      $request = $this->select($sql);
      if ($request['count']>0) return -2; // ya existe un usuario con ese nombre y pass

        # users 
          $query_insert ="INSERT INTO ms_users (username, email, password, cell, status, lastprojid, rol) VALUES(?,?,?, ?,?,?,?)";
          $arrData =array($this->Username, $this->Email, $this->Pass, $this->Cell, $this->intStatus, $this->intProjId, -99); 
          $this->intNewUser = $this->insert($query_insert, $arrData);        
        
        # company
          $this->CompanyName = 'Mi Empresa';
          //echo $page;
          //$this->CompanyName = $page;
          $query_insert = "INSERT INTO ms_companies(companyname, userid, projid, `page`) 
          VALUES (?,?,?,?)";
          $arrData=array($this->CompanyName, $this->intNewUser, $this->intProjId, $page); 
          $this->intLastCo = $this->insert($query_insert, $arrData);

        # projbyid
          $this->intRol = 1;
          $query_insert ="INSERT INTO ms_projbyuser(userid, projectid, rol, lastCo) VALUES (?, ?, ?, ?)";
          $arrData = array($this->intNewUser, $this->intProjId, $this->intRol, $this->intLastCo);  
          $this->insert($query_insert, $arrData);
        # banco
          $this->strBankName = 'Banco 1'; $this->iDType = 2;
          $query_insert ="INSERT INTO ms_data(dataname,companyid,datatype) VALUES(?,?,?)";
          $arrData=array($this->strBankName, $this->intLastCo, $this->iDType);
          $this->intLastBank = $this->insert($query_insert, $arrData);
          
        # depot
          $this->strDepot = 'Depósito 1'; $this->intDType = 21;
          $query_insert ="INSERT INTO ms_data(dataname,companyid,datatype) VALUES(?,?,?)";
          $arrData=array($this->strDepot, $this->intLastCo, $this->intDType);
          $this->intLastDepot =$this->insert($query_insert, $arrData);

        # client
          $this->strClient = 'Juan Perez'; 
          $query_insert ="INSERT INTO ms_clients(clientname, companyid, cltype) VALUES(?,?,?)";
          $arrData=array($this->strClient, $this->intLastCo, $tipoPrimerClPrPaMe);
          $this->intLastClient =$this->insert($query_insert, $arrData);

          # bcard
          //echo $this->Tienda;
          $sql = "INSERT INTO ms_bcard(companyname, companyid, gallery, wsp) VALUES (?,?,?,?)";
          $arrData =array($this->Tienda, $this->intLastCo, $this->Gallery, $this->Cell); 
          $this->insert($sql, $arrData);

        # client (si gallery <-1)  
          if ($gallery<-1) {
            // insertar un client para gestionar los abonos segun plan
            $sql = "INSERT INTO ms_clients(clientname, companyid, cltype) VALUES (?,?,?)";
            $arrData =array($this->Username, -1, 5); 
            $this->newClient = $this->insert($sql, $arrData);
            $sql = "UPDATE ms_users set companyuser=? where userid = $this->intNewUser";
            $this->update($sql, $arrData);

            //establecer un contrato
            $sql ="INSERT INTO hm_contracts (date_start, amount, tenantid, ufid, control_date, companyid ) 
            VALUES(?,?,?,?,?,?)";            
            //date("d-m-Y",strtotime($fecha_actual."+ 1 month")); 
            $hoy=date("d-m-Y");
            $arrData =array($hoy, 0, $this->newClient, -1, date("d-m-Y",strtotime($hoy."+ 1 month")),-1); 
            $this->insert($sql, $arrData);
          }
        //
        #edit users for defaults
          #if(viene de creartienda)pass=md5(tienda+$this->intLastCo)
            $defa = implode(",", array($this->intLastBank, $this->intLastDepot, $this->intLastClient));
            $sql = "UPDATE ms_users set defaults=? where userid = $this->intNewUser";
            $arrData = array($defa); //,  $this->intLastCo  //, companyuser=?
            $this->update($sql, $arrData);        
        #
        //$return = $this->intNewUser;
        $return = $this->intLastCo;
      //}else{$return ="exist";}
      return $return;
  }


  public function csu(){
    $this->Id = -1;
    $this->Username= 'msalinas';
    $this->Companyname = 'gestionando';       
    $this->Pass = md5('Keyla2021');  //pass
    $this->intProjId = 6;  //galería
    $this->intRol = -99;  //admin

    $sql = "select * from ms_users where userid=-1";
    $request = $this->select_all($sql); if (!empty($request)) return " Error AE1";

    $query_insert ="INSERT INTO ms_users (username, lastprojid, password, userid, rol) 
    VALUES(?,?,?,?,?)";
    $arrData=array($this->Username, $this->intProjId, $this->Pass, $this->Id, $this->intRol); 
    $insertedUsr =  $this->insert($query_insert, $arrData);
    
    $query_insert ="INSERT INTO ms_companies (projid, userid, page, companyname, companyid)    VALUES(?,?,?,?,?)";
    $arrData = array($this->intProjId, $this->Id, $this->Pass, $this->Companyname, $this->Id); 
    $insertedCo = $this->insert($query_insert, $arrData);
    
    $this->intRol = 1;
    $query_insert ="INSERT INTO ms_projbyuser(userid, projectid, rol, lastCo, pbu) VALUES (?,?,?, ?,?)";
    $arrData =array($this->Id, $this->intProjId, $this->intRol, $this->Id,$this->Id);
    $insertedPBU = $this->insert($query_insert, $arrData);

    $query_insert ="INSERT INTO ms_bcard(companyid, companyname) VALUES (?,?)";
    $arrData =array($this->Id, $this->Companyname);  
    $insertedBcard = $this->insert($query_insert, $arrData);

      echo 'Usr: '.$insertedUsr.'</br>';
      echo 'Co: '.$insertedCo.'</br>';
      echo 'PBU: '.$insertedPBU.'</br>';

      if ($insertedCo!==0) {$return='ok';
        echo 'Token: '.$this->Pass.'</br>';
        echo'
          <a href="https://api.whatsapp.com/send?phone=${phone}&text=Hola, siga este enlace para crear su cuenta: '
          .base_url().'/access_token?token='.$this->Pass.'">Enviar por whatsapp</a>` }'.'</br>';
      } else $return='error';
      return $return;
  }

  public function cad(int $projid){
    $this->intProjId = $projid;
    $this->strToken  = passGenerator(30);
    $this->strNameCo = 'Mi Empresa';
    $this->strUser = 'Invitado';
    
    $query_insert ="INSERT INTO ms_users (username, lastprojid, password) 
    VALUES(?,?,?)";
    $arrData = array($this->strUser, $this->intProjId, $this->strToken); 
    $insertedUsr = $this->insert($query_insert, $arrData);

    $query_insert ="INSERT INTO ms_companies (projid, userid, page, companyname) 
    VALUES(?,?,?,?)";
    $arrData = array($this->intProjId, $insertedUsr, $this->strToken, $this->strNameCo ); 
    $insertedCo = $this->insert($query_insert, $arrData);
    
    $this->intRol = 1;
    $query_insert ="INSERT INTO ms_projbyuser(userid, projectid, rol, lastCo) VALUES (?, ?, ?, ?)";
    $arrData =array($insertedUsr, $this->intProjId, $this->intRol, $insertedCo);
    $insertedPBU = $this->insert($query_insert, $arrData);

    $query_insert ="INSERT INTO ms_bcard(companyid, companyname) VALUES (?,?)";
    $arrData =array($insertedCo, $this->strNameCo);  
    $insertedBcard = $this->insert($query_insert, $arrData);

    $return = $insertedCo;
      echo 'Usr: '.$insertedUsr.'</br>';
      echo 'Co: '.$insertedCo.'</br>';
      echo 'PBU: '.$insertedPBU.'</br>';

      if ($insertedCo!==0) {$return='ok';
        echo 'Token: '.$this->strToken.'</br>';
        echo'
          <a href="https://api.whatsapp.com/send?phone=${phone}&text=Hola, siga este enlace para crear su cuenta: '.base_url().'/access_token?token='.$this->strToken.'">Enviar por whatsapp</a>`     }'.'</br></hr>
          <a href="'.base_url().'/access_token?token='.$this->strToken.'">Seguir el enlace</a>`     }'.'</br>';
      }else{ $return='error';}    
    return $return;
  }

  public function countUser(string $name, $pass){
    $this->Name = $name;    $this->Pass = md5($pass); 
    $sql = "SELECT count(userid) as count 
          FROM ms_users 
          WHERE password = '$this->Pass' AND username = '$this->Name'";
    $request = $this->select($sql);
    //echo $sql.'<br>'.$this->Name.' - '.$this->Pass;
    return $request;
  }

}?>