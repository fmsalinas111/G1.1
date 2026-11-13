<?php 
class M_ufs extends Mysql{
	public function __construct()	{		 parent::__construct(); 	}

  	public function selectUfs()	{
  		$sql = "SELECT clName (tenantid) AS fullname,
	        U.ufid AS did, U.ufname AS `name`, U.ufdescription AS `description`, 
          U.ufprice AS price, U.tenantid AS cli, U.ufstatus AS stt
          FROM hm_ufs U
          WHERE U.companyid = $this->co";
      //echo $sql;
      return $this->select_all($sql);
  	}	
 
    public function crudUf(array $fields){
      $this->intId = $fields['id']; $table = "hm_ufs";
     if ($this->intId ===0){//nuevo
        $sql ="INSERT INTO $table (ufname, ufdescription, companyid, ufprice, tenantid,  ufstatus)   VALUES(?,?,  ?,?,  ?,?)";
        $arrData = array($fields['nombre'], $fields['description'], $this->co, $fields['price'], $fields['tenant'], $fields['estado']);
        $request = $this->insert($sql, $arrData);
     }else{
		    $sql = "UPDATE $table SET ufname=?, ufdescription=?, ufprice=?, ufstatus =? 
      				WHERE ufid = $this->intId	AND companyid = $this->co";
      	$arrData = array($fields['nombre'], $fields['description'], $fields['price'], $fields['estado']);
        $request = $this->update($sql, $arrData);
      } 
      return $request;

    }

    //
    public function insertContract(string $campo1 , string $campo2, int $campo3, int $campo4){
      $return ="";

      $this->dateCampo1 = $campo1;  //date
      $this->deciCampo2 = $campo2;  //importe
      $this->intCampo3 = $campo3;   //tenant
      $this->intCampo4 = $campo4;   //uf

      $this->intCompany = $_SESSION['idcompany'];

      $query_insert ="INSERT INTO hm_contracts (date_start, amount, tenantid, ufid, control_date, companyid ) 
      VALUES(?,?,?,?,?,?)";

      //$xd = strtotime($this->dateCampo1); $mth=1;
      //$retDAY = date('Y-m-d', mktime(0,0,0,date('m',$xd)+$mth,date('d',$xd),date('Y',$xd)));
      //$cam1=$retDAY;        

      $arrData = array($this->dateCampo1, $this->deciCampo2, $this->intCampo3, $this->intCampo4, $this->dateCampo1, $this->intCompany); 
      $request_insert = $this->insert($query_insert, $arrData);
      $return = $request_insert;
      return $return;
    }
      

    public function insertPrimeraDeuda(string $campo1 , string $campo2, int $campo3, int $campo4, string $newAux){
      // bitac: tal vez hay que eliminar esta function
      $this->dateCampo1 = $campo1;  //date
      $this->deciCampo2 = $campo2;  //importe
      $this->intCampo3 = $campo3;  //tenant
      $this->intCampo4 = $campo4;  //uf
      $this->strNotes   = 'Primer alquiler ';
      $this->intCompany = $_SESSION['idcompany'];
      $this->strNewAux  = $newAux;
      $this->dateDue = date("Y-m-d",strtotime($campo1."+ 10 days")); 

      $query_insert ="INSERT INTO ms_sales (salesdate, amount, clientid, companyid, notes, duedate, debit, balancedue, saux ) 
      VALUES(?,?,?, ?,?,?, ?,?,? )";
      $arrData = array($this->dateCampo1, $this->deciCampo2, $this->intCampo3, $this->intCompany, $this->strNotes, $this->dateDue, $this->deciCampo2, $this->deciCampo2, $this->strNewAux ); 
      $request_insert = $this->insert($query_insert, $arrData);
      $return = $request_insert;

      return $return;
    }
    
    public function updateUfTenant(int $id, int $campo3){  //paso 3 para alquilar
      $this->intId     = $id;
      $this->intCampo3 = $campo3; //tenant        
      $sql = "UPDATE hm_ufs SET tenantid = ? WHERE ufid = $this->intId";
      $arrData = array($this->intCampo3);
      return $this->update($sql, $arrData);
    }

    public function deleteUf(int $id){
    	$this->intId = $id;
    	$sql = "SELECT * from hm_ufs WHERE ufid = $this->intId";
    	$request = $this->select_all($sql);
    	if (empty($request)) {
    		$sql = "UPDATE hm_ufs SET ufstatus = ? WHERE ufid = $this->intId";
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

    /* Se está ejecutando en Libraries\core\mysql
    public function maxAux(int $aux)  {
      $this->dlbAux = $aux;
      $this->intCompany = $_SESSION['idcompany'];
      $sql = "SELECT max(saux)+.01 as newAux
              FROM ms_sales
              WHERE saux >= $this->dlbAux AND saux <$this->dlbAux+1
              and companyid = $this->intCompany
              ";
      $request = $this->select($sql);
      return $request;
    }  */

  public function delUf(int $id, int  $type, bool $logical){
      $this->intId = $id;  
      #primero los contracts? mirar las tablas y campos
      if (!$logical) {
      $sql ="DELETE FROM ms_data WHERE dad = $this->intId and companyid=$this->co";
      $this->delete($sql);
      $sql ="DELETE FROM ms_data 
      WHERE dataid = $this->intId and companyid=$this->co";
      }else{
			 $sql = "UPDATE ms_data SET datastatus = ?
          		WHERE dataid = $this->intId. and companyid=$this->co";
          $arrData = array(0);
          $return = $this->update($sql, $arrData);
		}
 //echo $sql;
      return $return;
      
      return $this->delete($sql);
 }





}?>