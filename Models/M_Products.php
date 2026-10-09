<?php 
class M_Products extends Mysql{
	public function __construct()	{		 parent::__construct(); 	}
 
    public function selMyProducts2(int $type)  {      
      $this->Type = $type;      
      $sql = "
        SELECT productid as prid, productname as name, description as `desc`, brand as brid, 
        D2.dad as daddy, D3.dataname AS daddyName, categoryid as cid, 
        !P.inactive AS `visible`, P.prodstatus as estado,  
        provider, P.`client` AS doc, code as art, barcode as baco,
        coalesce(dName(brand),'') AS marca,  
        if(D2.dad>0,D3.dataname,if(ISNULL (D2.dataname),'s/c',D2.dataname)) AS category,
          P.price, factor as multiplo, bline, 
        if(ISNULL(imagename)OR imagename='', 'default.jpg', imagename) AS images,          
        -- imagename as images,
        P.prodtype as tipo,
        coalesce(PL.offqty,0) AS offQty, coalesce(PL.price,0) AS offPrice, 
        coalesce(PL.offdue,'') AS offDue, coalesce(PL.plid,0) AS offPlid, coalesce(PL.apd,0) AS offApd
        FROM ms_products P
        
        LEFT JOIN ms_data D2 ON D2.dataid = P.categoryid
        LEFT JOIN ms_data D3 ON D3.dataid = D2.dad
        LEFT JOIN ms_pricelist PL ON PL.prid=P.productid
        WHERE P.companyid =  $this->co
        and P.prodtype = $this->Type
        ";    
        //echo $sql.'<hr>';
      $request = $this->select_all($sql);
      return $request;
    } 




  public function selMyProducts(int $type)  {      
      $args =argTo2($type);
      $type = $args['arg1'];  
      $inactive = ( $args['arg2']>0 )?  ' and not P.inactive ': '';
      $this->Type = $type;
      
      $this->intCompany = $_SESSION['idcompany'];      
        //if(ISNULL (D2.dataname),'s/c',D2.dataname) AS categoria, 
      $sql = "
      SELECT productid as prid, productname as name, description as `desc`, brand as brid, 
        D2.dad as daddy, D3.dataname AS daddyName, categoryid as cid, 
        P.inactive as invisible, P.prodstatus as estado,  
        provider, P.`client` AS doc, code as art, barcode as baco,
        coalesce(dName(brand),'') AS marca,  
        if(D2.dad>0,D3.dataname,if(ISNULL (D2.dataname),'s/c',D2.dataname)) AS categoria,
          P.price, factor as multiplo, bline, 
        if(ISNULL(imagename)OR imagename='', 'noimage.jpg', imagename) AS img, P.prodtype as tipo,
        coalesce(PL.offqty,0) AS offQty, coalesce(PL.price,0) AS offPrice, 
        coalesce(PL.offdue,'') AS offDue, coalesce(PL.plid,0) AS offPlid, coalesce(PL.apd,0) AS offApd
        FROM ms_products P
        
        LEFT JOIN ms_data D2 ON D2.dataid = P.categoryid
        LEFT JOIN ms_data D3 ON D3.dataid = D2.dad
        LEFT JOIN ms_pricelist PL ON PL.prid=P.productid
        WHERE P.companyid =  $this->intCompany
        and P.prodtype = $this->Type
        $inactive";    
        //echo $sql.'<hr>';
      $request = $this->select_all($sql);
      return $request;
    } 

  	public function selectProducts(int $type)	{//tipo de producto: prod, serv, insumo
      $this->intType = $type;      //$iduser= $_SESSION['userid'];
      $idco= $_SESSION['idcompany'];
      $type=  ($this->intType>0)?"and prodtype = $this->intType":'';
  		$sql = "SELECT P.productid AS prid, P.productname AS nombre, 
        P.description AS descripcion, P.price AS precio, P.brand AS marca, 
        P.categoryid AS categoria, P.provider AS proveedor, P.`client` AS doc, 
        P.inactive AS invisible, P.factor as factor, 
        P.imagename AS imagen, P.prodtype as tipo
        FROM ms_products P
        WHERE P.companyid = $idco 
        AND prodstatus
        $type";
      //echo $sql.'<hr>';
  		$request = $this->select_all($sql);
  		return $request;
  	}	
 
    public function selectProduct(int $id){
      $this->intId = $id;
      $sql = "SELECT * FROM ms_products WHERE productid = $this->intId";
      $request = $this->select($sql);
      return $request;
    }
    public function selImageProd(int $id){
      $this->intId = $id;
      $sql = "SELECT imagename FROM ms_products WHERE productid = $this->intId";
      //echo $sql;
      return $this->select($sql);
    }

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
      
    public function ins_updProduct(int $id, string $nombre , string $desc, string $precio, int $stt,
     int $campo5, int $speciality, int $factor, int $vendor, int $insumo, string $img, string $bline,
     string $art, string $baco){
        
      $this->intId = $id;       $this->Nombre = $nombre;    $this->Descr = $desc;     
      $this->Precio = $precio;  $this->Stt = $stt;          $this->DocBrand = $campo5; //doc/marca
      $this->intEspecialidad = $speciality;     $this->Factor = $factor;      
      $this->Proveedor = $vendor;   $this->Insumo = $insumo;      $this->Img = $img;
      $this->Bline = $bline;        $this->Art = $art;        $this->Baco = $baco;        
      $this->intCompany = $_SESSION['idcompany'];
      /*$sql = "SELECT * FROM ms_products WHERE productname = '$this->strCampo1' AND productid != $this->intId";// original sql */
      $client_brand = ($_SESSION['app']==3)?'client':'brand';
      if ($id==0) {  # new
        $sql ="INSERT INTO ms_products (productname, description, price, prodstatus, companyid, $client_brand, categoryid, factor, `provider`, prodtype, imagename, bline, code, barcode) 
        VALUES(?,?,?, ?,?,?, ?,?,?, ?,?,?, ?,?)";
        $arrData = array($this->Nombre, $this->Descr, $this->Precio, $this->Stt, $this->intCompany, $this->DocBrand, $this->intEspecialidad, $this->Factor, $this->Proveedor, $this->Insumo, $this->Img, $this->Bline, $this->Art, $this->Baco); 
        $request = $this->insert($sql, $arrData);  
        
      }else{    # upd
        $sql = "UPDATE ms_products SET productname=?, description=?, price = ?, prodstatus=?, $client_brand=?, categoryid=?, factor=?, `provider`=?, prodtype=?, imagename=?, bline=?, code=?, barcode=? 
        WHERE productid = $this->intId
        and companyid=$this->intCompany"; //agente 1
        $arrData = array($this->Nombre, $this->Descr, $this->Precio, $this->Stt, $this->DocBrand, $this->intEspecialidad, $this->Factor, $this->Proveedor, $this->Insumo, $this->Img, $this->Bline, $this->Art, $this->Baco);
        $request = $this->update($sql, $arrData);
        $request = ($request>0)?$request:'error';
      }
      //echo $request.$sql;
      return $request;
    }

    public function updProdMulti(int $clave, string $valor, string $prids, int $categ, string $bline){
      $this->intCompany = $_SESSION['idcompany'];
      $arreglo = explode(',', $prids);
      $campos=array('price', 'description', 'productname', 'categoryid', 'bline');
      $campo=$campos[$clave-1];
      $arrData=array($valor);
      if ($clave===4) $arrData=array($categ); 
      if ($clave===5) $arrData=array($bline); 
      foreach ($arreglo as $v) {
        $sql ="UPDATE ms_products SET $campo=?
                WHERE productid=$v AND companyid=$this->intCompany";
        $this->update($sql, $arrData);
      }
      return'ok';
    }
    //

    public function deleteProduct(int $id){
    	$this->intId = $id;
      #si existen órdenes con este producto, no se puede eliminar
      $sql="SELECT * FROM ms_details WHERE productid=$this->intId";
      $request = $this->select_all($sql);
      if (is_array($request) && count($request)>0) {
        $sql = "UPDATE ms_products SET  prodstatus=? 
        WHERE productid = $this->intId";
        $arrData = array(0);
        $request = $this->update($sql,$arrData);
        $request = 'exist';
      }else{
        //$sql="DELETE FROM ms_pricelist WHERE prid=$this->intId";
        //$this->delete($sql);  
        
        #eliminar imágenes del producto
        $sql="SELECT imagename FROM ms_products WHERE productid=$this->intId";
        $request = $this->select_all($sql);
        $uploadPath = "./Assets/images/uploads/"; 
        foreach ($request as &$value) {
          $img = $value['imagename']; 
          if (file_exists($uploadPath.$img)&&strlen($img)>0) unlink($uploadPath.$img);
        }
        
        $sql ="DELETE FROM ms_products WHERE productid = $this->intId";
        $request = $this->delete($sql);  
        $request = 'ok';
      }
      return $request;
  }


  public function updateImage(int $id, string $nombre){
    $this->intId = $id;
    $this->strCampo1 = $nombre; 

    $sql = "UPDATE ms_products SET imagename=?
    WHERE productid = $this->intId";
    $arrData = array($this->strCampo1);
    $request = $this->update($sql, $arrData);

    return $request;
  }


  public function updTogle(int $id, int $newValue, string $arg){
    $this->intId = $id;    $this->NV = $newValue; 
    $campo = ($arg=='active')?'prodstatus':'inactive';
    $sql = "UPDATE ms_products SET $campo=?
    WHERE productid = $this->intId";
    $arrData = array($this->NV);
    $request = $this->update($sql, $arrData);
    return $request;
  }



  public function setConfig(string $config){
    $this->Company = $_SESSION['idcompany'];
    $this->Config  = $config;

    $sql = "UPDATE ms_companies set productconfig=?
    WHERE companyid=$this->Company";
    $arrData = array($this->Config);
    $request = $this->update($sql, $arrData);
    $_SESSION['productconfig']=$this->Config;
    return $request;
  } 


  
}?>