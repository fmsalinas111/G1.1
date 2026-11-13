<?php 
class M_H_contracts extends Mysql{
	public function __construct()	{		 parent::__construct(); 	}

  	public function selectContracts(int $inactive)	{
      $this->intInactive = $inactive;
      $and = ($this->intInactive===0)? " AND !C.inactive": " AND C.inactive";
      $iduser= $_SESSION['userid'];
      $app= $_SESSION['app'];
      $idco= $_SESSION['idcompany'];
  		$sql = "SELECT contractid as cid, clientid as clid,
        CONCAT_WS (' ', clientname, clientlastname) AS inquilino,
        DATE_FORMAT(date_start, '%d-%m-%Y') as fecInicial, 
        DATE_FORMAT(date_start, '%Y-%m-%d') as ffecha2,
        date_end as fecfin,
        amount AS alquiler,
        ufname as unidad, C.ufid as unit, C.inactive      
      FROM hm_contracts C
      LEFT JOIN ms_clients CL ON tenantid = CL.clientid
      LEFT JOIN hm_ufs U ON C.ufid=U.ufid
      WHERE C.companyid  = $idco".$and;      
      //echo $inactive.$sql;
  		$request = $this->select_all($sql);
  		return $request;
  	}	
    public function endContract(int $id){
      $this->intId = $id;
      $this->intStatus = 1;
          $sql = "UPDATE hm_contracts C 
          INNER JOIN hm_ufs U ON C.ufid = U.ufid
          SET C.inactive = ?, U.tenantid = ?
          WHERE C.contractid= $this->intId";
          $arrData = array($this->intStatus,0);
          $request = $this->update($sql, $arrData);
          //echo $sql;
      return $request;
    }

    public function updContract(int $id, float $precio, string $fecIni, string $fecFin){
      $this->intId = $id;
      $this->Precio = $precio; $this->F_ini = $fecIni; $this->F_fin = $fecFin;
      if ($this->intId>0) {
          $sql = "UPDATE hm_contracts C 
          SET C.amount = ?, C.date_start=?, C.date_end=?
          WHERE C.contractid= $this->intId";
          $arrData = array($this->Precio,$this->F_ini,$this->F_fin);
          $request = $this->update($sql, $arrData);
          //echo $sql;
      }
      return $request;
    }
 
}

?>