<?php 
  class M_Clprpames extends Mysql{
	public function __construct()	{		 parent::__construct(); 	}


  public function addInvoice(){ //ejemplo de uso de transacciones
    $db = new Mysql();
    try {
        // 1. Iniciamos la transacción
        $db->beginTransaction();
        // 2. Primera operación (ej. insertar una cabecera)
        $query1 = "INSERT INTO ms_sales (clientid, amount) VALUES (?, ?)";
        $idFactura = $db->insert($query1, [1, 1500.00]);
        if (!$idFactura) {
            throw new Exception("Error al insertar la factura.");
        }

        // 3. Segunda operación (ej. insertar los detalles)
        $query2 = "INSERT INTO ms_details (salesid, productid, quantity) VALUES (?, ?, ?)";
        $resDetalle = $db->insert($query2, [$idFactura, 5, 2]);

        if (!$resDetalle) {
            throw new Exception("Error al insertar el detalle de la factura.");
        }

        // Si todo salió bien, confirmamos los cambios permanentemente
        $db->commit();
        echo "¡Transacción exitosa!";

    } catch (Exception $e) {
        // Si algo falló, deshacemos todos los cambios realizados
        $db->rollBack();
        echo "Transacción abortada: " . $e->getMessage();
    }    
  }




  public function selectClprpames(int $tipo)	{
    $this->intCompany= $_SESSION['idcompany'];
    $this->intTipo = $tipo;
		$sql = "SELECT C.clientid as cid,clientname, clientlastname, 
      CONCAT_WS (' ', clientname, clientlastname) AS fullname, 
      clientphone as celu, clientemail, clientaddress, clientci, C.companyid,  C.`cltype`, C.obs, C.`clstatus`, 
      if (C.`cltype`=4,D.dataname,C.clientphone) AS especialidad,
        iva
      FROM ms_clients C
      left JOIN k_doctor K ON C.clientid=K.clientid
      left JOIN ms_data D  ON K.speciality=D.dataid
      WHERE C.companyid = $this->intCompany
      AND cltype = $this->intTipo
      order by clientname ";
      $sql = "CALL `SP_GETCLIENTS`($this->intCompany, $this->intTipo)";  
    //echo $sql;
		$request = $this->select_all($sql);
		return $request;
	}	
	public function selectClprpames2(int $tipo)	{
    $this->intTipo = $tipo;
		$sql = "SELECT C.clientid as cid, clientname as nombre, 
    coalesce(clientlastname,' ') as apellido,
      CONCAT_WS (' ', clientname, clientlastname) AS fullname, 
      clientphone as telefono, clientemail as email , clientaddress as direccion, clientci as documento,
       C.obs, C.`clstatus` as estado, 
      if (C.`cltype`=4,D.dataname,C.clientphone) AS especialidad,
        iva
      FROM ms_clients C
      left JOIN k_doctor K ON C.clientid=K.clientid
      left JOIN ms_data D  ON K.speciality=D.dataid
      WHERE C.companyid = $this->co
      AND cltype = $this->intTipo
      order by nombre ";
      //$sql = "CALL `SP_GETCLIENTS`($this->co, $this->intTipo)";  
    //echo $sql;
		$request = $this->select_all($sql);
		return $request;
	}	
  public function countClprpames(int $tipo)  {
    $this->intTipo = $tipo;
    $idco= $_SESSION['idcompany'];
    $sql = "SELECT COUNT(clientid) as cantCli
      FROM ms_clients C
      WHERE C.companyid = $idco
      AND C.cltype = $this->intTipo
      AND C.clstatus =1";
    return $this->select_all($sql);
  } 
    public function selectClprname(int $id){
      $this->intId = $id;
      $sql = "SELECT * FROM ms_users WHERE userid = $this->intId";
      $request = $this->select($sql);
      return $request;
    }
    public function selSuty(int $id){
      $this->intId = $id; $idCo = $_SESSION['idcompany'];
      $sql = "SELECT clName($this->intId)";
              //and companyid = $idCo";
      $request = $this->select($sql);
      return $request;
    }
    public function ins_updClprpame(int $id, string $nombre , string $apellido, string $fono, string $ci, string $direccion, string $email, string $notas, int $stt, int $clType, int $iva){
        $this->intId = $id;               $this->strNombre = $nombre;
        $this->strApellido = $apellido;   $this->strFono = $fono;
        $this->strCi = $ci;               $this->strDireccion = $direccion;
        $this->strEmail = $email;         $this->strNotas = $notas;
        $this->intStatus = $stt;          $this->intType   = $clType; 
        $this->intIva = $iva;             $app = $_SESSION['app'];
        $this->Company= $_SESSION["idcompany"];
        $this->User= $_SESSION["userid"];
        if ($id==0)   { //new
          $query_insert ="INSERT INTO ms_clients (clientname, clientlastname, clientphone, clientci, clientaddress, clientemail, obs, ms_clients.clstatus, ms_clients.cltype, companyid, user, iva) 
            VALUES(?,?,?, ?,?,?, ?,?,?, ?,?, ?)";
          $arrData = array($this->strNombre, $this->strApellido, $this->strFono, $this->strCi, $this->strDireccion, $this->strEmail, $this->strNotas, $this->intStatus, $this->intType, $this->Company, $this->User, $this->intIva);
          $return = $this->insert($query_insert, $arrData);
          if ($this->intType==3||$this->intType==8) {// si es paciente o estudiante, registrar legajos            
            $query_insert ="INSERT INTO k_patient (clientid) VALUES(?)";
            $arrData = array($return); $request = $this->insert($query_insert, $arrData);
            $query_insert ="INSERT INTO k_kinesio (patientid) VALUES(?)";
            $arrData = array($return); $request = $this->insert($query_insert, $arrData);
            if ($this->intType==8) {
              $query_insert ="INSERT INTO ms_users (suar,companyuser,lastprojid,status) VALUES(?,?,?, ?)";
              $arrData = array($return,$this->Company,$app,$stt); $request = $this->insert($query_insert, $arrData);
            }
          }elseif ($this->intType==4||$this->intType==9) {//(dr/profe)?reg legajos
            $query_insert ="INSERT INTO k_doctor (clientid) VALUES(?)";
            $arrData = array($return); $request = $this->insert($query_insert, $arrData);
            //suar
            $query_insert ="INSERT INTO ms_users (suar,companyuser,lastprojid,status) VALUES(?,?,?, ?)";
            $arrData = array($return,$this->Company,$app,$stt); $request = $this->insert($query_insert, $arrData);
          }
        }else{//updt
          $sql = "UPDATE ms_clients SET clientname=?, clientlastname=?, clientphone=?, clientci=?, clientaddress=?, clientemail=?, obs=?, clstatus = ?, iva=?
          WHERE clientid = $this->intId";
          $arrData = array($this->strNombre, $this->strApellido, $this->strFono, $this->strCi, $this->strDireccion, $this->strEmail, $this->strNotas, $this->intStatus, $this->intIva);
          $return = $this->update($sql, $arrData);
        }
        return $return;
    }
public function delCl(int $id, int  $type, bool $logical){
      $this->intId = $id;  
      #primero saber si existe en ms_sales
      //$sql ="SELECT  ms_clients WHERE dad = $this->intId and companyid=$this->co";
      //$this->delete($sql);
      if (!$logical) {
      	$sql ="DELETE FROM ms_clients 
      	WHERE clientid = $this->intId and companyid=$this->co";
    	 $return = $this->delete($sql);
		}else{
			 $sql = "UPDATE ms_clients SET clstatus = ?
          		WHERE clientid = $this->intId. and companyid=$this->co";
          $arrData = array(0);
          $return = $this->update($sql, $arrData);
		}
 //echo $sql;
      return $return;
 }
 
 
      public function deleteClprpame(int $id){
      	$this->intId = $id;
        $this->intState = 0;
      		$sql = "pepe UPDATE ms_products SET prodstatus = ? WHERE prodctid = $this->intId";
      		$arrData = array($this->intState);
      		$request = $this->update($sql,$arrData);
      	return $request;
      }
//************************ */
  public function crudCl(array $fields ){ 
      $this->intId = $fields['id'];
      if ($this->intId ===0){//nuevo
        $sql =  "INSERT INTO ms_clients (clientname, clientlastname, clientemail, clientci, 
                clstatus, cltype, companyid, clientphone, clientaddress, iva)  
                VALUES(?,?,?,  ?,?,?,   ?,?,?,  ?)";
        $arrData = array($fields['nombre'], $fields['apellido'], $fields['email'], $fields['dni'], 
                  $fields['estado'], $fields['datatype'], $this->co, $fields['wsp'], $fields['adress'],
                  $fields['iva']  );
        $request = $this->insert($sql, $arrData);
      }else{
		    $sql = "UPDATE ms_clients SET clientname=?, clientlastname=?, clientemail=?, 
			          clientci=?, clstatus=?, clientphone=?, clientaddress=?, iva=?	
      				  WHERE clientid = $this->intId
      				  AND companyid = $this->co";
      	$arrData = array($fields['nombre'], $fields['apellido'], $fields['email'], $fields['dni'], 
                    $fields['estado'], $fields['wsp'], $fields['adress'], $fields['iva']       );
        $request = $this->update($sql, $arrData);
      } 
      return $request;
  }

public function deleteOrDeactivateClients(array $clientIds): array {
        if (empty($clientIds)) { return ['deleted' => 0, 'updated' => 0];}
        try {            // Iniciamos una transacción para asegurar la integridad de los datos
            $this->db->beginTransaction();
            // 1. Identificar cuáles de los IDs enviados tienen registros en la tabla 'Sales'
            // Usamos placeholders (?,?,?) según la cantidad de IDs recibidos
            $placeholders = implode(',', array_fill(0, count($clientIds), '?'));
            
            $sqlCheck = "SELECT DISTINCT client_id FROM Sales WHERE client_id IN ($placeholders)";
            $stmtCheck = $this->db->prepare($sqlCheck);
            $stmtCheck->execute($clientIds);
            
            // Guardamos los IDs que Tienen Ventas
            $idsWithSales = $stmtCheck->fetchAll(PDO::FETCH_COLUMN, 0);
            
            // Los que No Tienen Ventas se calculan comparando los arrays
            $idsWithoutSales = array_diff($clientIds, $idsWithSales);

            $updatedCount = 0;
            $deletedCount = 0;

            // 2. Ejecutar UPDATE (clstatus = 0) para los que tienen ventas
            if (!empty($idsWithSales)) {
                $placeholdersUpdate = implode(',', array_fill(0, count($idsWithSales), '?'));
                $sqlUpdate = "UPDATE Clients SET clstatus = 0 WHERE id IN ($placeholdersUpdate)";
                $stmtUpdate = $this->db->prepare($sqlUpdate);
                $stmtUpdate->execute($idsWithSales);
                $updatedCount = $stmtUpdate->rowCount();
            }

            // 3. Ejecutar DELETE para los que NO tienen ventas
            if (!empty($idsWithoutSales)) {
                $placeholdersDelete = implode(',', array_fill(0, count($idsWithoutSales), '?'));
                $sqlDelete = "DELETE FROM Clients WHERE id IN ($placeholdersDelete)";
                $stmtDelete = $this->db->prepare($sqlDelete);
                $stmtDelete->execute(array_values($idsWithoutSales)); // array_values para resetear índices
                $deletedCount = $stmtDelete->rowCount();
            }

            // Confirmamos los cambios si todo salió bien
            $this->db->commit();

            return [
                'success' => true,
                'deleted' => $deletedCount,
                'updated' => $updatedCount
            ];

        } catch (Exception $e) {
            // Si algo falla, revertimos cualquier cambio en la base de datos
            $this->db->rollBack();
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }

//******************** */
}?>