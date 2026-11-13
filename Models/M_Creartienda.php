<?php 
class M_Creartienda extends Mysql{
	public function __construct()	{		 parent::__construct(); 	}

  /*
    public function setProducts(array $prodNames, array $prices, array $photos){
        $sql ="INSERT INTO ms_products (productname, price, companyid, imagename) 
        VALUES(?,?,?,?)";
        $arrData = array($this->Nombre, $this->Precio, $this->co, $this->Img); 
        $request = $this->insert($sql, $arrData);  
      return $request;
      
    }
  */
    public function setProducts1(array $prodNames, array $prices, array $photos, int $lastCo) {
      $this->LastCo = $lastCo;
        $sql = "INSERT INTO ms_products (productname, price, companyid, imagename) 
                VALUES (?, ?, ?, ?)";                
        $insertados = 0;
        // Recorremos los productos usando el índice de cualquiera de los arrays
        for ($i = 0; $i < count($prodNames); $i++) {            
            // 1. Sanitizar y preparar los datos de cada fila
            $name  = filter_var($prodNames[$i], FILTER_SANITIZE_SPECIAL_CHARS);
            $price = filter_var($prices[$i], FILTER_VALIDATE_FLOAT);
            
            // 2. Manejar el nombre de la foto para la base de datos
            // PHP agrupa las propiedades de $_FILES de una forma particular: $_FILES['pPhoto']['name'][$i]
            $imgName = "default.jpg"; // Por si no suben foto
            
            if (!empty($photos['name'][$i])) {
                // Te sugiero renombrar el archivo con un ID único para que no se pisen en el servidor
                $extension = pathinfo($photos['name'][$i], PATHINFO_EXTENSION);
                $imgName = uniqid('prod_', true) . '.' . $extension;
                
                // Aquí deberías mover el archivo temporal a tu carpeta de imágenes:
                $destino = "../Assets/images/uploads/" . $imgName;
                move_uploaded_file($photos['tmp_name'][$i], $destino);
            }
        
            // 3. Armar el array de datos para ESTE producto en particular
            // Nota: asumo que $this->co es el id de la compañía/tienda que ya tenés seteado en el objeto
            $arrData = array($name, $price, $this->LastCo, $imgName); 
            
            // 4. Ejecutar la inserción usando tu método heredado
            $request = $this->insert($sql, $arrData);  
            
            if ($request > 0) {
                $insertados++;
            }
        }
        
        // Retornamos la cantidad de productos que se guardaron con éxito
        return $insertados; 
    }    
    
    
    public function setProducts(array $prodNames, array $prices, array $photos, int $lastCo) {
    	    $this->LastCo = $lastCo;
        $sql = "INSERT INTO ms_products (productname, price, companyid, imagename) 
                VALUES (?, ?, ?, ?)";                
        $insertados = 0;

        for ($i = 0; $i < count($prodNames); $i++) {
            
            $name  = filter_var($prodNames[$i], FILTER_SANITIZE_SPECIAL_CHARS);
            $price = filter_var($prices[$i], FILTER_VALIDATE_FLOAT);            
            // 1. Preparamos el nombre por defecto
            $imgName = "default.jpg"; 
            if (!empty($photos['name'][$i]) && $photos['error'][$i] === UPLOAD_ERR_OK) {
                
                $extension = strtolower(pathinfo($photos['name'][$i], PATHINFO_EXTENSION));
                $extensionesPermitidas = ['jpg', 'jpeg', 'png', 'webp', 'gif','jfif'];
                
                $tmpPath = $photos['tmp_name'][$i];
                $esImagenReal = @getimagesize($tmpPath);

                if (in_array($extension, $extensionesPermitidas) && $esImagenReal !== false) {
                    
                    // ¡AQUÍ ESTÁ EL TRUCO!
                    // Usamos time(), y para asegurarnos de que si suben las 3 fotos al mismo milisegundo 
                    // no se pisen, le sumamos el índice $i (quedaría por ejemplo: 171829340, 171829341, 171829342)
                    $id_tiempo = time() + $i; 
                    
                    $imgName = $id_tiempo . '.' . $extension;
                    $destino = "Assets/images/uploads/" . $imgName; // Tu ruta de uploads       
                    // Movemos el archivo físico al servidor
                    move_uploaded_file($tmpPath, $destino);
                }
            }
            // 2. Insertamos TODO junto. La base de datos ya recibe el nombre final con time()
            $arrData = array($name, $price, $this->LastCo, $imgName);             
            $request = $this->insert($sql, $arrData);              
            if ($request > 0)  $insertados++;
            
        }        
        return $insertados; 
    }
    
	public function storeExist(string $page){
        $sql = "SELECT page from ms_companies WHERE page = '$page' ";
        $request = $this->select_all($sql);
        //echo $sql.'<br>'.(empty($request));
        if (empty($request)) $request=1; else $request=-2;
        return $request;
	}
  
    public function selStores(){
      $sql = "SELECT companyname as page 
      FROM ms_bcard 
      where companyid>0
      AND companyname != ''
      order by companyname";
      return $this->select_all($sql);
    } 

    public function updAcount(string $uname, string $pass, string $wsp, string $email, int $usrid){
        $sql = "UPDATE ms_users set username = ?, `password` = ?, cell =?, email=?
                WHERE userid = $usrid"; 
        $arrData =array($uname, md5($pass), $wsp, $email); 
        $return = $this->update($sql, $arrData);
        return $return;
    } 

}?>