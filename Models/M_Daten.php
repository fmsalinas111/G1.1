<?php 
class M_Daten extends Mysql{
  public function __construct()	{ parent::__construct(); }
  public function selData(int $id)	{
    $this->intType = $id;
    $sqlMain = "SELECT dataid as did, dataname as `name`, COALESCE (datadescription,'') as `description`,
                datastatus as stt, dad";
    if ($this->intType==2) {
      $sql = "SELECT dataid as did, dataname as `name`, datadescription as `description`, 
            COALESCE (SUM( if(S.acctype=1,credit, 
              if(S.acctype=2,-credit, 
                if(S.acctype=3 AND S.credit>0, credit,
                  if(S.acctype=3 AND S.debit>0, -debit,0)) ))
                  ),0) AS saldo, datastatus as stt, dad 
          from ms_data D
          LEFT  JOIN ms_sales S ON S.bankid = D.dataid
          WHERE datatype = 2 AND D.companyid = $this->co
          GROUP BY dataname";
    }elseif ($this->intType==4) {
      $sql ="SELECT ms_data.*, price as saldo FROM ms_data
              left JOIN ms_products ON dataid = ms_products.data
              WHERE ms_data.companyid = $this->co
              AND datatype = 4";
    }elseif($this->intType===17) {
      $sql ="SELECT ms_data.*, ' ' as saldo FROM ms_data
              WHERE ms_data.companyid = $this->co
              AND datatype = $this->intType";
    }else{
  		$sql = $sqlMain
            ." FROM ms_data
            WHERE companyid = $this->co AND datatype = $this->intType
            AND dad<=0";
    }   
    //echo $sql.'<br>'.$this->intType;
		$request = $this->select_all($sql);
		return $request;
	}	

  public function crudDaten(array $fields ){ 
      $this->intId = $fields['id'];
     if ($this->intId ===0){//nuevo
        $sql ="INSERT INTO ms_data (dataname, datadescription, companyid, datatype, datastatus, dad)   VALUES(?,?, ?,?,?,?)";
        $arrData = array($fields['nombre'], $fields['description'], $this->co, $fields['datatype'], $fields['estado'], $fields['dad']);
        $request = $this->insert($sql, $arrData);
     }else{
		    $sql = "UPDATE ms_data SET dataname=?, datadescription=?, datastatus=?, dad=?
      				WHERE dataid = $this->intId
      				AND companyid = $this->co";
      	$arrData = array($fields['nombre'], $fields['description'], $fields['estado'], $fields['dad']);
        $request = $this->update($sql, $arrData);
      } 
      return $request;
  }
  public function delData(int $id, int  $type){
      $this->intId = $id;  
      #primero las subcats
      $sql ="DELETE FROM ms_data WHERE dad = $this->intId and companyid=$this->co";
      $this->delete($sql);
      $sql ="DELETE FROM ms_data 
      WHERE dataid = $this->intId and companyid=$this->co";
      //echo $sql;
      return $this->delete($sql);
 }
//************** */
}
