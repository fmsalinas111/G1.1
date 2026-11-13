<?php
class M_Prods extends Mysql{
	public function __construct()	{		parent::__construct(); 	}
	
    public function crudProduct(int $prid, string $nombre, string $sku, int $categ, string $price, int $factor, string $fotos, int $stt, int $inv){
      $this->intId = $prid;        
        if ($this->intId>0){
          $sql ="UPDATE ms_products 
                SET productname=?, code=?, categoryid=?, price=?, factor=?, imagename=?,
                `prodstatus`=?, inactive=?
                WHERE productid = $this->intId
                    and companyid=$this->co"; //agente 1
        $arrData = array($nombre, $sku, $categ, $price, $factor, $fotos, $stt, $inv);
        $request = $this->update($sql, $arrData);
        $request = ($request>0)?$request:'error';
        }else{
          $sql ="INSERT INTO ms_products (productname, code, categoryid, price, factor, imagename, companyid) 
          VALUES(?,?,?,?,   ?,?,?)";
          $arrData = array($nombre, $sku, $categ, $price, $factor, $fotos, 
          $this->co); 
          $request = $this->insert($sql, $arrData);  
        }
        return $request;
    }
      
    public function selImageProd(int $id){
      $this->intId = $id;
      $sql = "SELECT imagename FROM ms_products WHERE productid = $this->intId";
      return $this->select($sql);
    }




//********************** */
}?>