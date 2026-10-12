<?php 
class M_Tenant extends Mysql{
	public function __construct()	{		 parent::__construct(); 	}
 
     public function getPage(string $page){
      $this->strPage = $page;
      $sql = "SELECT BC.*, productconfig, `page`, template, projid as APP 
              FROM `ms_bcard` BC
              left join `ms_companies` C ON C.companyid=BC.companyid
              WHERE  page='$this->strPage' AND cardstatus"; 
              //echo $sql;
      return $this->select($sql);
    }

    public function getRubro(string $page){
      $this->strPage = $page;
      $sql = "SELECT BC.*, productconfig, `page` FROM `ms_bcard` BC
              left join `ms_companies` C ON C.companyid=BC.companyid
              LEFT JOIN ms_data DA ON DA.dataid=BC.businesscategory
              WHERE  dataname='$this->strPage'";   //echo $sql;
      return $this->select($sql);
    }


    public function selectProducts()  { //$idco= $_SESSION['idcompany'];
      $idco=$data['page_idCo'];
      $sql="SELECT * FROM ms_products WHERE ms_products.companyid = $idco";
      return $this->select_all($sql);
    } 
    public function gallery($p){ //todel?
      $data['page_tag'] = 'Galeria';
      $data['page_title'] ='Galeria Página principal';
      $data['page_name'] = 'gallery';
      $this->views->getView($this,$data['page_name'],$data);
    }


    
    
    //††*************
    }