<?php 
  class M_Mydata extends Mysql{
	public function __construct()  {   parent::__construct();  }

  public function selPerfil(){  //para mydata
    $sql = "SELECT 
          BC.bcardid AS bcid, BC.companyname AS coName, BC.address AS direccion,
          BC.face, BC.insta, BC.twitter, BC.tiktok, BC.phone, BC.wsp, BC.phone as fijo, BC.web, BC.email,
          BC.city AS ciudad, BC.gallery AS galeria, BC.businesscategory,
          BC.notes as reseña, BC.cardstatus as stt, BC.business_line AS bline,
          CO.companylogo AS logo, 
          CO.razonsocial as razon, CO.cuit, CO.categiva as iva, CO.iibb, CO.inicact as inicio,
          CO.cbu, CO.alias
      FROM ms_bcard BC
      LEFT JOIN ms_companies CO ON CO.companyid=BC.companyid
      WHERE BC.companyid = $this->co";
      //echo $sql;
    return  $this->select($sql);
  }  


  public function updCo(array $f ){  //co
      $sql = "UPDATE ms_companies 
              SET `page`=?, companylogo=?, cuit=?, razonsocial=?, categiva=?,
                   alias=?, cbu=?


      WHERE companyid = $this->co";
      $arrData = array($f['pagename'], $f['logo'], $f['cuit'], $f['razon'], $f['catIva'],
                        $f['alias'], $f['cbu'] );
      $request = $this->update($sql, $arrData);
      return $request;
  }
  
  public function updPerfil(array $fields ){ //bcard
      /*
        [nombre_empresa] => qqq        [eslogan] =>         [whatsapp] => 3344
        [telefono] =>         [email_contacto] =>         [horarios] =>         [direccion] =>         
        [instagram] =>         [facebook] =>         [tiktok] =>         [sitio_web] => 
    */
      //wsp=?, web=?, phone=?, email=?, twitter=?, businesscategory=?, cardstatus=?, notes=?, business_line=?, city=?, gallery=?, tiktok=?
      //address=?, face=?, insta=?, 
      $sql = "UPDATE ms_bcard SET companyname=?, wsp=?
      WHERE companyid = $this->co";
      //echo $sql;

      $arrData = array($fields['nombre_empresa'], $fields['whatsapp']);
      $request = $this->update($sql, $arrData);
      return $request;

  }

}?>