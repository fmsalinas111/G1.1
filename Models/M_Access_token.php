<?php 
class M_Access_token extends Mysql{
	public function __construct()	{parent::__construct(); 	}

  public function gToken(int $id, string $token, int $cli, $type){
    $this->intId = $id;  $this->strToken = $token;  $this->Cli=$cli;  $this->Type=$type;
    //antes de generar el token poner un centinela iCo aquí 
    $sql ="INSERT INTO `ms_tkn`(`userid`, `token`, client, type) VALUES(?,?,?,?)";
    $arrData = array($this->intId, $this->strToken, $this->Cli, $this->Type );
    $request=$this->insert($sql, $arrData);
    return $request;
  }

  public function verificarToken(string $token, string $type=''){
    $this->strToken = $token;    $this->strType = $type;
    $sql = (!$this->strType==='usr')? 
      "SELECT Co.userid as uId, Co.companyname as coName, Co.companyid as coId, Co.page as microSite, C.clientname AS usuario
      FROM ms_companies Co 
      LEFT JOIN ms_clients C ON C.clientid = Co.userid WHERE page='$this->strToken'" : 
      "select T.userid as uId, U.username as usuario  FROM ms_tkn T 
        LEFT join ms_users U ON U.userid=T.userid WHERE token='$this->strToken'";
    if ($type==='1') {
      $sql = "SELECT token AS tkn, CLIENT AS cli FROM ms_tkn WHERE token='$this->strToken'";
    }
      //echo $sql.'<hr>';
    return $this->select($sql);
  }

  public function updatePass(string $tkn, string $pass){
    $this->Tkn = $tkn;    $this->strPass = $pass;
    $sql = "SELECT userid FROM ms_tkn WHERE token = '$this->Tkn'";
    $request = $this->select($sql);
      //echo $sql;
      //print_r($request);
    if (empty($request)) {//sizeof($request)
      $request="not found";
    }else{
      $usrId=$request['userid'];
      $sql = "UPDATE ms_users SET  password=?  WHERE userid = $usrId";
      $arrUsr = array( $this->strPass);
      $request = $this->update($sql, $arrUsr);
      if ($request==1) { // eliminar tkn
        $sql ="DELETE FROM ms_tkn WHERE token = '$this->Tkn'";
        $this->delete($sql);
      }
    }
    return $request;
  }


  public function updatePage(int $coId, string $pageName, string $nomUsuario, string $pass, $suar, $tkn){
    $this->intCoId = $coId;
    $this->strPagName = $pageName; 
    $this->strNomUsuario = $nomUsuario;
    $this->strPass = $pass;
    $this->intSuar = $suar;
    $this->Tkn = $tkn;
    $sql = "SELECT * FROM ms_companies 
      WHERE page = '$this->strPagName'  AND companyid != $this->intCoId";
    $request = $this->select_all($sql);
    if (empty($request)) {//sizeof($request)
      $sql = "SELECT Co.userid AS coUser, U.userid as user FROM ms_companies Co
      INNER JOIN ms_users U ON  U.`password`=Co.page
        WHERE page = '$this->Tkn' ";
      $request = $this->select_all($sql);
      if (sizeof($request)>0) {
        $this->User = $request[0]['user'];
        $sql = "UPDATE ms_companies SET page=?, companyname =?, userid=?
        WHERE page = '$this->Tkn'";
        $arrData = array($this->strPagName,$this->strPagName,$this->User);
        $request = $this->update($sql, $arrData);

        $sql = "UPDATE ms_users SET username=?, password=?
        WHERE password = '$this->Tkn'";
        $arrUsr = array($this->strNomUsuario, $this->strPass);
        $request = $this->update($sql, $arrUsr);    

        $sql = "UPDATE ms_bcard SET companyname=?
        WHERE companyid = $this->intCoId";
        $arrUsr = array($this->strPagName);
        $request = $this->update($sql, $arrUsr);    
      }
    }else{$request = "exist";}
    return $request;
  }


  public function insertMicrosite(int $cid){

    if ($_SESSION['app']<>6) return -2;
    $this->intClid   = $cid;
    $this->intProjId = 5;
    $this->strToken  = token();
    $this->strMitienda = 'Mi tienda';
    
    $query_insert ="INSERT INTO ms_companies (projid, userid, page, companyname) 
    VALUES(?,?,?,?)";
    $arrData = array($this->intProjId, $this->intClid, $this->strToken, $this->strMitienda ); //array 
    $insertedCo = $this->insert($query_insert, $arrData);
    
    $query_insert ="INSERT INTO ms_users (suar, companyuser, lastprojid, password) VALUES(?,?,?, ?)";
    $arrData = array($this->intClid, $insertedCo, $this->intProjId, $this->strToken); 
    $insertedUsr = $this->insert($query_insert, $arrData);
  
    $this->intRol = 1;
    $query_insert ="INSERT INTO ms_projbyuser(userid, projectid, rol, lastCo) VALUES (?, ?, ?, ?)";
    $arrData =array($insertedUsr, $this->intProjId, $this->intRol, $insertedCo);  
    $insertedPBU = $this->insert($query_insert, $arrData);

    $query_insert ="INSERT INTO ms_bcard(companyid, companyname) VALUES (?,?)";
    $arrData =array($insertedCo, $this->strMitienda);  
    $insertedBcard = $this->insert($query_insert, $arrData);


    $return = $insertedCo;
    return $return;
  }
    
	public function selectCtactes(int $tipo)	{
    $this->intTipo = $tipo;
    //$idco= $_SESSION['idcompany'];
    
		$sql = "select salesid as si, saux, notes, 
      DATE_FORMAT(salesdate, '%d-%m-%Y') as ffecha, salesdate as fecha, 
      clientname, amount, C.cltype,
      if (C.cltype=5,coalesce(dataname,notes),
	      if ((isnull(dataname) ),'*compra*', coalesce(dataname,'') ) )AS bank,
      if(STATUS=2 OR STATUS=3,'n', if(amount>0, 'e', 'r')) as payd,
      if(debit > 0, debit, 0) as cargo,
      if(credit> 0, credit, 0) as abono, 
          @running_total := @running_total + ms_sales.debit-ms_sales.credit AS balance 
      FROM ms_sales JOIN (SELECT @running_total := 0) r 
          INNER JOIN ms_clients C ON C.clientid = ms_sales.clientid
          LEFT JOIN ms_data BANK ON BANK.dataid = ms_sales.bankid
          WHERE C.clientid=$this->intTipo 
          and (debit+credit<>0)
          ORDER BY saux ";
          //track  and (debit+credit<>0)
    $sql = "SELECT si, saux, notes,  SA.img, ffecha, fecha,  amount, 
          coalesce(dName(bankid),notes) AS bank, debit,    credit,

              if(debit > 0, debit, 0) as cargo, if(credit> 0, credit, 0) as abono, 
              SUM(debit-credit) OVER (PARTITION BY cli ORDER BY saux ASC) AS balance

          FROM sales_img SA 
          WHERE cli = $this->intTipo 
          ORDER BY saux           "  ;    
		$request = $this->select_all($sql);
    //echo $sql;
		return $request;
	}	  
  public function selSuty(int $id){
    $this->intId = $id; 
    $sql = "SELECT clName($this->intId)";
    //echo $sql;
    return $this->select($sql);
  }


}?>